'use client';

import { MailIcon } from '@/components/icons';
import { CopyStatus, useCopy } from '@/components/ui/copy';

export function CopyEmail({ email }: { email: string }) {
  const { copied, copy } = useCopy();

  return (
    <button
      type="button"
      onClick={async () => {
        if (!(await copy(email))) window.location.href = `mailto:${email}`;
      }}
      className="group text-fg press inline-flex items-center gap-2.5"
      aria-label={`Copy email address ${email}`}
    >
      <MailIcon className="text-muted" />
      <span className="link">{email}</span>
      <CopyStatus copied={copied} className="text-faint group-hover:text-fg" />
      <span aria-live="polite" className="sr-only">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </button>
  );
}
