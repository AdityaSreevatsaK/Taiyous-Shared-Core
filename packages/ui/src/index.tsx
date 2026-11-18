import type { ReactNode } from 'react';
import type { ModuleAvailability } from '@taiyou/contracts';

export interface MediaHubCardProps {
  title: string;
  description: string;
  status: ModuleAvailability;
  href?: string;
  icon?: ReactNode;
}
/** Pure presentation. No authentication, fetching, cookies or navigation side effects.
 * Do not pass a link until its destination is actually configured. */
export function MediaHubCard({ title, description, status, href, icon }: MediaHubCardProps) {
  const body = <><span className="hub-card-icon" aria-hidden="true">{icon}</span>
    <span className="hub-card-title">{title}</span>
    <span className="hub-card-description">{description}</span>
    <span className="hub-card-status">{status === 'available' ? 'Open library' : 'Coming later'}</span></>;
  return href && status === 'available'
    ? <a className="hub-card" href={href}>{body}</a>
    : <div className="hub-card hub-card-planned" aria-disabled="true">{body}</div>;
}
