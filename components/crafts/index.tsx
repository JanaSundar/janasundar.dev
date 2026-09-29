import type { ComponentType } from 'react';
import { HoldToConfirm } from './hold-to-confirm';
import { MagneticDock } from './magnetic-dock';
import { SegmentedControl } from './segmented-control';
import { ToastStack } from './toast-stack';

export type Craft = {
  slug: string;
  title: string;
  description: string;
  Demo: ComponentType;
};

export const crafts: Craft[] = [
  {
    slug: 'hold-to-confirm',
    title: 'Hold to Confirm',
    description:
      'A destructive action that asks for intent instead of a dialog. Press and hold to fill; let go early and it springs back.',
    Demo: HoldToConfirm,
  },
  {
    slug: 'toast-stack',
    title: 'Stacked Notifications',
    description: 'Toasts collapse into a compact deck and fan out on hover or focus, with spring-driven layout.',
    Demo: ToastStack,
  },
  {
    slug: 'magnetic-dock',
    title: 'Magnetic Dock',
    description: 'Icons scale with cursor proximity using a spring on a derived distance value — no re-renders.',
    Demo: MagneticDock,
  },
  {
    slug: 'segmented-control',
    title: 'Segmented Control',
    description: 'A shared-layout pill that slides between options while the price rolls over with a blur.',
    Demo: SegmentedControl,
  },
];

export function CraftCard({ title, description, Demo }: Craft) {
  return (
    <article>
      <div className="card bg-subtle relative grid h-64 place-items-center overflow-hidden">
        <Demo />
      </div>
      <h3 className="text-fg mt-4 px-1 font-semibold">{title}</h3>
      <p className="footnote mt-1 px-1">{description}</p>
    </article>
  );
}
