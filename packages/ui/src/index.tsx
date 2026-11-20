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
  /** Render the owner-approved complete card image as the full clickable surface. */
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
    <img className="hub-card-image hub-card-image-complete" src={artworkSrc}
      width="1086" height="1448" alt="" aria-hidden="true" decoding="async" loading="eager" />
    <div className="hub-sr-only">
      <h3 className="hub-card-title">{title}</h3>
      <p>{description}</p>
      <span>{available ? 'Available. Open library.' : 'In preparation. Coming soon.'}</span>
    </div>
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
