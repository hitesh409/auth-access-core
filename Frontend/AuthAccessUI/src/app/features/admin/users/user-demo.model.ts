export interface UserDemo {
  id: string
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  roleName: string;
  accessMode: 'Role Based' | 'Custom';
  status: 'Active' | 'Inactive' | 'Locked' | 'Pending';
  riskLevel: 'Low' | 'Medium' | 'High';
  failedLoginAttempts: number;
  accessibleModules: number;
  passwordChangedAt: string;
  lastLogin: string;
  roleUpdatedAt: string;
  updatedAt: string;
  profileImgUrl?: string;
  auditEvents: string[];
}
