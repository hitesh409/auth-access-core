export type TokenType = 'Access' | 'Refresh' | 'API Key' | 'Personal Access';
export type TokenStatus = 'Active' | 'Expired' | 'Revoked';

export interface TokenDemo {
  id: string;
  name: string;
  type: TokenType;
  owner: string;
  ownerEmail: string;
  client: string;
  scopes: string[];
  status: TokenStatus;
  ipAddress: string;
  issuedAt: string;
  expiresAt: string;
  lastUsedAt: string;
  usageCount: number;
  auditEvents: string[];
}
