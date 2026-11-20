import type { ReactNode } from 'react';
import type { ModuleAvailability } from '@taiyou/contracts';

export interface MediaHubCardProps {
  title: string;
  description: string;
  status: ModuleAvailability;
  href?: string;
  icon?: ReactNode;
  artworkSrc?: string;
  actionLabel?: string;
  /** Render art above the visible title, without badges or action buttons. */
  imageOnly?: boolean;
}

/** Stateless presentation with an accessible link for available libraries only. */
export function MediaHubCard({
  title, description, status, href, icon, artworkSrc, actionLabel, imageOnly = false,
}: MediaHubCardProps) {
  let safeHref: string | undefined;
  if (status === 'available' && href) {
    try {
      const url = new URL(href);
      if (url.protocol === 'https:' && !url.username && !url.password &&
        !url.search && !url.hash && !url.port &&
        url.hostname.includes('.') && !/^\d+\.\d+\.\d+\.\d+$/.test(url.hostname)) {
        safeHref = url.toString();
      }
    } catch {
      // Invalid and missing URLs always render non-interactive cards.
    }
  }

  const available = Boolean(safeHref);
  const body = imageOnly && artworkSrc ? <>
    <span className="hub-card-artwork" aria-hidden="true">
      <img className="hub-card-image hub-card-image-illustration" src={artworkSrc}
        width="1086" height="1448" alt="" decoding="async" loading="eager" />
    </span>
    <h3 className="hub-card-title hub-card-label">{title}</h3>
    {!available ? <span className="hub-sr-only">In preparation. Coming soon.</span> : null}
  </> : <>
    {artworkSrc ? <div className="hub-card-art" aria-hidden="true">
      <img className="hub-card-image" src={artworkSrc} alt="" width="480" height="316" loading="lazy" decoding="async" />
    </div> : null}
    <div className="hub-card-content">
      <div className="hub-card-top">
        {icon ? <span className="hub-card-icon" aria-hidden="true">{icon}</span> : null}
        <span className="hub-card-state">{available ? '✓ Available' : '◷ In preparation'}</span>
      </div>
      <div className="hub-card-copy">
        <h3 className="hub-card-title">{title}</h3>
        <p className="hub-card-description">{description}</p>
      </div>
      <span className="hub-card-status">
        {available ? (actionLabel ?? 'Enter library') : 'Coming Soon'}
        {available ? <span aria-hidden="true"> →</span> : null}
      </span>
    </div>
  </>;

  const className = 'hub-card ' + (available ? 'hub-card-available' : 'hub-card-planned') + (imageOnly && artworkSrc ? ' hub-card-image-only' : '');
  return available
    ? <a className={className} href={safeHref}
        rel="noopener noreferrer" referrerPolicy="no-referrer">{body}</a>
    : <article className={className}>{body}</article>;
}
