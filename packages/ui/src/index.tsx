import type { ReactNode } from 'react';
import type { ModuleAvailability } from '@taiyou/contracts';

export interface MediaHubCardProps {
  title: string;
  description: string;
  status: ModuleAvailability;
  href?: string;
  icon?: ReactNode;
  /** Self-hosted artwork; title, description and status remain accessible text. */
  artworkSrc?: string;
  actionLabel?: string;
}

/** Stateless presentation. Styling is Hub-owned until another consumer requires it. */
export function MediaHubCard({ title, description, status, href, icon, artworkSrc, actionLabel }: MediaHubCardProps) {
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
      // Invalid input is a planned card, never a dead or unsafe link.
    }
  }
  const available = Boolean(safeHref);
  const body = <>
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
  return available
    ? <a className="hub-card hub-card-available" href={safeHref}
        rel="noopener noreferrer" referrerPolicy="no-referrer">{body}</a>
    : <article className="hub-card hub-card-planned">{body}</article>;
}
