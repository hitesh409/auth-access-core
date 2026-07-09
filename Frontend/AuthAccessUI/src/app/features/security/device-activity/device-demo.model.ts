export type DeviceType = 'Desktop' | 'Mobile' | 'Tablet';
export type DeviceStatus = 'Trusted' | 'Pending' | 'Blocked';
export type DeviceRisk = 'Low' | 'Medium' | 'High';

export interface DeviceDemo {
  id: string;
  deviceName: string;
  owner: string;
  ownerEmail: string;
  type: DeviceType;
  os: string;
  browser: string;
  ipAddress: string;
  location: string;
  status: DeviceStatus;
  riskLevel: DeviceRisk;
  activeSessions: number;
  firstSeenAt: string;
  lastSeenAt: string;
  auditEvents: string[];
}
