'use client';

import { useId, useState } from 'react';
import { SlideOpen } from '@/components/ui/slide-open';
import { Timeline, TimelineItem, TimelineSubItem, TimelineSubList } from '@/components/ui/timeline';
import type { Experience, Highlight } from '@/content/experience';
import { formatPeriod } from '@/lib/period';

/** One point on the timeline: its lead-in in the text colour, then the sentence in the muted one. */
function Point({ lead, text }: Highlight) {
  return (
    <TimelineSubItem
      // Space between points goes below each one (not above), so its node still lines up with its first line.
      // The last point has none: the curve back to the next job is measured from its bottom edge.
      className="text-muted text-[13.5px] leading-[1.6] text-pretty not-last:pb-1.5"
    >
      <span className="text-fg font-medium">{lead}</span> {text}
    </TimelineSubItem>
  );
}

/**
 * A job: the role and company, the dates, and every point as its own node on the timeline. Clicking the title slides
 * the points open in place. There's no arrow, so the current job starts open and the list reads as a timeline first.
 */
function JobRow({ job, open, onToggle }: { job: Experience; open: boolean; onToggle: () => void }) {
  const panel = useId();

  return (
    <TimelineItem
      tone={job.end ? 'done' : 'current'}
      aside={formatPeriod(job.start, job.end)}
      title={
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panel}
          onClick={onToggle}
          className="group/job press block cursor-pointer text-left"
        >
          <span className="font-medium">{job.role}</span>
          <span className="text-muted group-hover/job:text-fg transition-colors"> · {job.company}</span>
        </button>
      }
    >
      {/*
        The box that grows clips what's inside it, but the timeline's curves reach outside the points: left to the
        parent's line, up to just under the parent's dot, and down into the gap before the next job. Padding extends
        the box over those areas and matching negative margins take the space back, so nothing is clipped and the
        layout doesn't change. It's inert, so the strip over the title doesn't get in the way of clicking it.
      */}
      <SlideOpen
        open={open}
        id={panel}
        contentClassName=""
        className="pointer-events-none -mt-2 -mb-[calc(var(--tl-gap)+0.55rem)] -ml-7 pt-2 pb-[calc(var(--tl-gap)+0.55rem)] pl-7"
      >
        <TimelineSubList>
          {job.highlights.map((point) => (
            <Point key={point.lead} {...point} />
          ))}
        </TimelineSubList>
      </SlideOpen>
    </TimelineItem>
  );
}

export function ExperienceList({ jobs }: { jobs: Experience[] }) {
  // Only one job is open at a time; the most recent starts open.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Timeline>
      {jobs.map((job, index) => (
        <JobRow
          key={job.company}
          job={job}
          open={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </Timeline>
  );
}
