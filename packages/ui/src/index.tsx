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
  /** Legacy display: a portrait image with a heading beneath it. */
  imageOnly?: boolean;
  /** Editorial homepage display: native HTML content over the original portrait. */
  immersive?: boolean;
}

/** Stateless presentation. Only owner-verified available destinations become links. */
export function MediaHubCard({
  title, description, status, href, icon, artworkSrc, actionLabel,
  imageOnly = false, immersive = false,
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
      // Invalid destinations always render as non-interactive cards.
    }
  }

  const available = Boolean(safeHref);
  const showcase = Boolean(immersive && artworkSrc);
  const portrait = Boolean(imageOnly && artworkSrc && !showcase);
  const body = showcase ? <>
    <span className="hub-card-artwork" aria-hidden="true">
      <img className="hub-card-image hub-card-image-illustration" src={artworkSrc}
        width="1086" height="1448" alt="" decoding="async" loading="eager" />
    </span>
    <div className="hub-card-editorial">
      <div className="hub-card-title-row">
        {icon ? <span className="hub-card-icon" aria-hidden="true">{icon}</span> : null}
        <h3 className="hub-card-title hub-card-label">{title}</h3>
      </div>
      <p className="hub-card-description">{description}</p>
      <span className="hub-card-state">
        <span aria-hidden="true">{available ? '✓' : '◷'}</span>
        {available ? 'Available' : 'In preparation'}
      </span>
      {available
        ? <span className="hub-card-cta">{actionLabel ?? 'Explore library'} <span aria-hidden="true">→</span></span>
        : <span className="hub-card-cta hub-card-cta-planned">Coming soon</span>}
    </div>
  </> : portrait ? <>
    <span className="hub-card-artwork" aria-hidden="true">
      <img className="hub-card-image hub-card-image-illustration" src={artworkSrc}
        width="1086" height="1448" alt="" decoding="async" loading="eager" />
    </span>
    <h3 className="hub-card-title hub-card-label">{title}</h3>
    {!available ? <span className="hub-sr-only">In preparation. Coming soon.</span> : null}
  </> : <>
    {artworkSrc ? <div className="hub-card-art" aria-hidden="true">
      <img className="hub-card-image" src={artworkSrc} alt="" width="480" height="316"
        loading="lazy" decoding="async" />
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
      <span className="hub-card-status">{available ? (actionLabel ?? 'Enter library') : 'Coming Soon'}</span>
    </div>
  </>;

  const variant = showcase ? ' hub-card-immersive'
    : portrait ? ' hub-card-image-only' : '';
  const className = 'hub-card ' + (available ? 'hub-card-available' : 'hub-card-planned') + variant;
  return available
    ? <a className={className} href={safeHref}
        rel="noopener noreferrer" referrerPolicy="no-referrer">{body}</a>
    : <article className={className}>{body}</article>;
}
