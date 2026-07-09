import { PermissionFlags } from '../../../../core/authorization/constants/permission-flags.constants';
import { PermissionSubject, PermissionValue } from '../permission.model';
import { ALL_FLAGS } from './permission-flags.config';

const V = PermissionFlags.View;
const C = PermissionFlags.Create;
const U = PermissionFlags.Update;
const D = PermissionFlags.Delete;
const E = PermissionFlags.Export;

export const PERMISSION_SUBJECTS: PermissionSubject[] = [
  { id: 'U-1', name: 'Sarah Johnson', email: 'sarah.johnson@authaccesscore.com', role: 'Administrator', accessMode: 'Role Based', initials: 'SJ' },
  { id: 'U-2', name: 'Michael Brown', email: 'michael.brown@authaccesscore.com', role: 'Security Analyst', accessMode: 'Custom', initials: 'MB' },
  { id: 'U-3', name: 'Olivia Taylor', email: 'olivia.taylor@authaccesscore.com', role: 'Auditor', accessMode: 'Role Based', initials: 'OT' },
  { id: 'U-4', name: 'David Wilson', email: 'david.wilson@authaccesscore.com', role: 'Support Agent', accessMode: 'Custom', initials: 'DW' },
  { id: 'U-5', name: 'Sophia Martinez', email: 'sophia.martinez@authaccesscore.com', role: 'Role Manager', accessMode: 'Custom', initials: 'SM' },
  { id: 'U-6', name: 'James Anderson', email: 'james.anderson@authaccesscore.com', role: 'New User', accessMode: 'Custom', initials: 'JA' },
];

/** Per-user starting grants (moduleKey -> bitmask). Absent module = no access. */
export const PERMISSION_SEED: Record<string, PermissionValue> = {
  // Administrator — full access everywhere
  'U-1': {
    'User Management': ALL_FLAGS,
    'Role Management': ALL_FLAGS,
    'Module Management': ALL_FLAGS,
    'Permission Management': ALL_FLAGS,
    'Session Management': ALL_FLAGS,
    'Access Policies': ALL_FLAGS,
    'Token Activity': ALL_FLAGS,
    'Device Activity': ALL_FLAGS,
    'Audit Logs': ALL_FLAGS,
    'Login Activity': ALL_FLAGS,
    'Security Settings': ALL_FLAGS,
  },
  // Security Analyst — full on Security, read on the rest
  'U-2': {
    'User Management': V,
    'Role Management': V,
    'Session Management': V | C | U | D,
    'Access Policies': V | C | U | D,
    'Token Activity': V | U | D,
    'Device Activity': V | U | D,
    'Audit Logs': V | E,
    'Login Activity': V | E,
    'Security Settings': V | U,
  },
  // Auditor — read-only, can export reports
  'U-3': {
    'User Management': V,
    'Role Management': V,
    'Session Management': V,
    'Access Policies': V,
    'Token Activity': V,
    'Device Activity': V,
    'Audit Logs': V | E,
    'Login Activity': V | E,
  },
  // Support Agent — narrow user/session help-desk rights
  'U-4': {
    'User Management': V | U,
    'Session Management': V | D,
    'Device Activity': V,
  },
  // Role Manager — owns roles/modules/permissions, reads the rest
  'U-5': {
    'User Management': V,
    'Role Management': ALL_FLAGS,
    'Module Management': V | C | U,
    'Permission Management': V | C | U,
    'Session Management': V,
    'Audit Logs': V,
  },
  // New User — no access yet
  'U-6': {},
};
