export type RoleType = 'System' | 'Custom';
export type RoleStatus = 'Active' | 'Inactive';

export interface RoleRight {
  module: string;
  allowedAccessRights: number;
  createdBy: string;
  createdOn: string;
  isDeleted: boolean;
  updatedBy: string;
  updatedOn: string;
}

export interface RoleAssignedUser {
  name: string;
  email: string;
}

export interface RoleDemo {
  id: string;
  name: string;
  description: string;
  type: RoleType;
  status: RoleStatus;
  usersAssigned: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  rights: RoleRight[];
  assignedUsers: RoleAssignedUser[];
  auditEvents: string[];
}
