export type SessionStatus = 'Active' | 'Expired' | 'Revoked';

export interface SessionDemo {
  id: string;
  userName: string;
  userEmail: string;
  device: string;
  ipAddress: string;
  location: string;
  status: SessionStatus;
  startedAt: string;
  lastActivityAt: string;
  expiresAt: string;
  auditEvents: string[];
}
