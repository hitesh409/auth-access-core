import { Component, inject, signal, computed } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { PageHeader } from '../../../shared';
import { UserDemo } from './user-demo.model';
import { NAVIGATION_ITEMS } from '../../../core/navigation/config/navigation-items.config';
import { MasterDetailLayoutComponent } from '../../../shared/ui/layouts/master-detail-layout/master-detail-layout';
import { EntityWorkspace } from '../../../shared/ui/entity-workspace/entity-workspace';
import { EntityNavigator } from '../../../shared/ui/entity-navigator/entity-navigator';
import { ModalComponent } from '../../../shared/ui/components/modal/modal';
import { ConfirmationModal, ConfirmationTone } from '../../../shared/ui/components/confirmation-modal/confirmation-modal';
import { RecordActionsMenu } from '../../../shared/ui/components/record-actions-menu/record-actions-menu';
import { RecordActionItem } from '../../../shared/ui/components/record-actions-menu/record-action-item.model';
import { NavigatorPanelService } from '../../../core/layout/navigator-panel.service';
import { APP_ICONS } from '../../../shared/icons/font-awesome.icons';
import { USER_WORKSPACE_TEMPLATE } from './config/user-workspace-template';
import { USER_NAVIGATOR_TEMPLATE } from './config/user-navigator-template';

interface ConfirmConfig {
  title: string;
  message: string;
  confirmLabel: string;
  tone: ConfirmationTone;
  icon?: IconDefinition;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    PageHeader,
    MasterDetailLayoutComponent,
    EntityNavigator,
    EntityWorkspace,
    ModalComponent,
    ConfirmationModal,
    RecordActionsMenu,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  protected readonly panelService = inject(NavigatorPanelService);
  readonly icons = APP_ICONS;
  readonly breadcrumbs = [
    {
      label: 'Administration',
      route: NAVIGATION_ITEMS[1].route,
      icon: NAVIGATION_ITEMS[1].icon,
    },
    {
      label: 'Users',
      route: NAVIGATION_ITEMS[1].children?.[0].route,
      icon: NAVIGATION_ITEMS[1].children?.[0].icon,
    },
  ];

  readonly navigatorTemplate = USER_NAVIGATOR_TEMPLATE;

  readonly workspaceTemplate = USER_WORKSPACE_TEMPLATE;

  readonly users = signal<UserDemo[]>([
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      displayName: 'Sarah Johnson',
      email: 'sarah.johnson@authaccesscore.com',
      roleName: 'Super Administrator',
      accessMode: 'Role Based',
      status: 'Active',
      riskLevel: 'Medium',
      failedLoginAttempts: 1,
      accessibleModules: 42,
      passwordChangedAt: '18 May 2026',
      lastLogin: '13 Jun 2026, 09:14 AM',
      roleUpdatedAt: '11 Apr 2026',
      updatedAt: '12 Jun 2026',
      auditEvents: [
        'User logged in successfully',
        'Role updated',
        'Password changed',
        'Profile updated',
      ],
    },

    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Brown',
      displayName: 'Michael Brown',
      email: 'michael.brown@authaccesscore.com',
      roleName: 'Security Administrator',
      accessMode: 'Role Based',
      status: 'Locked',
      riskLevel: 'High',
      failedLoginAttempts: 11,
      accessibleModules: 28,
      passwordChangedAt: '10 Dec 2025',
      lastLogin: '28 May 2026, 10:11 PM',
      roleUpdatedAt: '02 Mar 2026',
      updatedAt: '10 Jun 2026',
      auditEvents: [
        'Multiple login failures detected',
        'Account locked automatically',
        'Security review initiated',
      ],
    },

    {
      id: '3',
      firstName: 'Emily',
      lastName: 'Davis',
      displayName: 'Emily Davis',
      email: 'emily.davis@authaccesscore.com',
      roleName: 'Viewer',
      accessMode: 'Role Based',
      status: 'Pending',
      riskLevel: 'Medium',
      failedLoginAttempts: 0,
      accessibleModules: 6,
      passwordChangedAt: 'Not Set',
      lastLogin: 'Never',
      roleUpdatedAt: '10 Jun 2026',
      updatedAt: '10 Jun 2026',
      auditEvents: ['User account created', 'Activation email sent', 'Awaiting first login'],
    },

    {
      id: '4',
      firstName: 'David',
      lastName: 'Wilson',
      displayName: 'David Wilson',
      email: 'david.wilson@authaccesscore.com',
      roleName: 'Custom Access',
      accessMode: 'Custom',
      status: 'Active',
      riskLevel: 'High',
      failedLoginAttempts: 4,
      accessibleModules: 37,
      passwordChangedAt: '04 Mar 2026',
      lastLogin: '12 Jun 2026, 07:42 AM',
      roleUpdatedAt: '22 May 2026',
      updatedAt: '12 Jun 2026',
      auditEvents: [
        'Custom permissions assigned',
        'Access override approved',
        'User logged in successfully',
      ],
    },

    {
      id: '5',
      firstName: 'Olivia',
      lastName: 'Taylor',
      displayName: 'Olivia Taylor',
      email: 'olivia.taylor@authaccesscore.com',
      roleName: 'Administrator',
      accessMode: 'Role Based',
      status: 'Active',
      riskLevel: 'Low',
      failedLoginAttempts: 0,
      accessibleModules: 25,
      passwordChangedAt: '01 Jun 2026',
      lastLogin: '13 Jun 2026, 08:23 AM',
      roleUpdatedAt: '17 Feb 2026',
      updatedAt: '13 Jun 2026',
      auditEvents: ['User logged in successfully', 'Module access reviewed', 'Profile updated'],
    },

    {
      id: '6',
      firstName: 'James',
      lastName: 'Anderson',
      displayName: 'James Anderson',
      email: 'james.anderson@authaccesscore.com',
      roleName: 'Auditor',
      accessMode: 'Role Based',
      status: 'Inactive',
      riskLevel: 'Medium',
      failedLoginAttempts: 2,
      accessibleModules: 18,
      passwordChangedAt: '14 Jan 2026',
      lastLogin: '01 Mar 2026, 11:08 AM',
      roleUpdatedAt: '15 Jan 2026',
      updatedAt: '01 May 2026',
      auditEvents: ['Account deactivated', 'Last audit completed', 'Login attempt blocked'],
    },

    {
      id: '7',
      firstName: 'Sophia',
      lastName: 'Martinez',
      displayName: 'Sophia Martinez',
      email: 'sophia.martinez@authaccesscore.com',
      roleName: 'Custom Access',
      accessMode: 'Custom',
      status: 'Active',
      riskLevel: 'Medium',
      failedLoginAttempts: 3,
      accessibleModules: 22,
      passwordChangedAt: '28 Apr 2026',
      lastLogin: '12 Jun 2026, 05:42 PM',
      roleUpdatedAt: '05 May 2026',
      updatedAt: '12 Jun 2026',
      auditEvents: [
        'Permission update approved',
        'Custom access reviewed',
        'User logged in successfully',
      ],
    },

    {
      id: '8',
      firstName: 'Daniel',
      lastName: 'Thomas',
      displayName: 'Daniel Thomas',
      email: 'daniel.thomas@authaccesscore.com',
      roleName: 'Viewer',
      accessMode: 'Role Based',
      status: 'Active',
      riskLevel: 'Low',
      failedLoginAttempts: 0,
      accessibleModules: 4,
      passwordChangedAt: '30 May 2026',
      lastLogin: '13 Jun 2026, 10:21 AM',
      roleUpdatedAt: '09 Mar 2026',
      updatedAt: '13 Jun 2026',
      auditEvents: ['User logged in successfully', 'Password changed', 'Profile viewed'],
    },

    {
      id: '9',
      firstName: 'Liam',
      lastName: 'Garcia',
      displayName: 'Liam Garcia',
      email: 'liam.garcia@authaccesscore.com',
      roleName: 'Security Administrator',
      accessMode: 'Role Based',
      status: 'Active',
      riskLevel: 'Low',
      failedLoginAttempts: 0,
      accessibleModules: 31,
      passwordChangedAt: '22 May 2026',
      lastLogin: '13 Jun 2026, 11:05 AM',
      roleUpdatedAt: '14 Feb 2026',
      updatedAt: '13 Jun 2026',
      auditEvents: ['User logged in successfully', 'Security audit completed'],
    },

    {
      id: '10',
      firstName: 'Emma',
      lastName: 'Lee',
      displayName: 'Emma Lee',
      email: 'emma.lee@authaccesscore.com',
      roleName: 'Viewer',
      accessMode: 'Role Based',
      status: 'Pending',
      riskLevel: 'Low',
      failedLoginAttempts: 0,
      accessibleModules: 5,
      passwordChangedAt: 'Not Set',
      lastLogin: 'Never',
      roleUpdatedAt: '09 Jun 2026',
      updatedAt: '09 Jun 2026',
      auditEvents: ['User account created', 'Activation email sent'],
    },

    {
      id: '11',
      firstName: 'Noah',
      lastName: 'Harris',
      displayName: 'Noah Harris',
      email: 'noah.harris@authaccesscore.com',
      roleName: 'Administrator',
      accessMode: 'Role Based',
      status: 'Active',
      riskLevel: 'Medium',
      failedLoginAttempts: 2,
      accessibleModules: 24,
      passwordChangedAt: '05 Apr 2026',
      lastLogin: '12 Jun 2026, 03:18 PM',
      roleUpdatedAt: '01 Mar 2026',
      updatedAt: '12 Jun 2026',
      auditEvents: ['User logged in successfully', 'Permissions reviewed', 'Role updated'],
    },

    {
      id: '12',
      firstName: 'Ava',
      lastName: 'Clark',
      displayName: 'Ava Clark',
      email: 'ava.clark@authaccesscore.com',
      roleName: 'Auditor',
      accessMode: 'Role Based',
      status: 'Active',
      riskLevel: 'Low',
      failedLoginAttempts: 0,
      accessibleModules: 19,
      passwordChangedAt: '18 Mar 2026',
      lastLogin: '11 Jun 2026, 02:44 PM',
      roleUpdatedAt: '20 Jan 2026',
      updatedAt: '11 Jun 2026',
      auditEvents: ['Audit report generated', 'User logged in successfully'],
    },
  ]);

  private readonly toastr = inject(ToastrService);

  readonly selectedUser = signal<UserDemo | null>(this.users()[0]);
  readonly modalOpen = signal(false);
  readonly modalTitle = computed(() => this.selectedUser()?.displayName ?? '');
  readonly modalSubtitle = computed(() => this.selectedUser()?.roleName ?? '');

  // Per-record kebab actions for the currently selected user
  readonly selectedUserActions = computed<RecordActionItem[]>(() =>
    this.buildActions(this.selectedUser()),
  );

  // Confirmation dialog state
  readonly confirmConfig = signal<ConfirmConfig | null>(null);
  readonly confirmOpen = computed(() => this.confirmConfig() !== null);
  private confirmRun: (() => void) | null = null;

  protected onUserSelected(user: UserDemo): void {
    this.selectedUser.set(user);
  }

  protected onDetailOpened(user: UserDemo): void {
    this.selectedUser.set(user);
    if (!this.panelService.isDesktop()) {
      this.modalOpen.set(true);
    }
  }

  protected closeModal(): void {
    this.modalOpen.set(false);
  }

  // =========================================
  //  ACTIONS
  // =========================================

  private buildActions(user: UserDemo | null): RecordActionItem[] {
    if (!user) {
      return [];
    }

    const locked = user.status === 'Locked';

    return [
      { label: 'Edit', icon: this.icons.edit, action: () => this.editUser(user) },
      { label: 'Assign Role', icon: this.icons.roles, action: () => this.assignRole(user) },
      { label: 'Reset Password', icon: this.icons.key, action: () => this.resetPassword(user) },
      {
        label: locked ? 'Unlock Account' : 'Lock Account',
        icon: this.icons.lock,
        action: () => this.toggleLock(user),
      },
      { label: 'Delete', icon: this.icons.delete, danger: true, action: () => this.deleteUser(user) },
    ];
  }

  // --- toast-only stubs (need a form; wired later) ---

  private editUser(user: UserDemo): void {
    this.toastr.info(`Edit ${user.displayName} — form coming soon`);
  }

  private assignRole(user: UserDemo): void {
    this.toastr.info(`Assign role for ${user.displayName} — coming soon`);
  }

  // --- confirmation-backed actions (fully functional on mock data) ---

  private resetPassword(user: UserDemo): void {
    this.openConfirm(
      {
        title: 'Reset password?',
        message: `A password reset link will be sent to ${user.email}.`,
        confirmLabel: 'Send reset link',
        tone: 'primary',
        icon: this.icons.key,
      },
      () => {
        this.patchUser(user.id, { passwordChangedAt: this.today() });
        this.toastr.success(`Password reset link sent to ${user.email}`);
      },
    );
  }

  private toggleLock(user: UserDemo): void {
    const locked = user.status === 'Locked';

    this.openConfirm(
      {
        title: locked ? 'Unlock account?' : 'Lock account?',
        message: locked
          ? `${user.displayName} will regain access immediately.`
          : `${user.displayName} will be signed out and blocked from signing in.`,
        confirmLabel: locked ? 'Unlock' : 'Lock',
        tone: locked ? 'primary' : 'warning',
        icon: this.icons.lock,
      },
      () => {
        this.patchUser(user.id, { status: locked ? 'Active' : 'Locked' });
        this.toastr.success(locked ? `${user.displayName} unlocked` : `${user.displayName} locked`);
      },
    );
  }

  private deleteUser(user: UserDemo): void {
    this.openConfirm(
      {
        title: 'Delete user?',
        message: `${user.displayName} will be permanently removed. This action cannot be undone.`,
        confirmLabel: 'Delete',
        tone: 'danger',
        icon: this.icons.delete,
      },
      () => {
        this.users.update((list) => list.filter((u) => u.id !== user.id));
        if (this.selectedUser()?.id === user.id) {
          this.selectedUser.set(this.users()[0] ?? null);
        }
        this.modalOpen.set(false);
        this.toastr.success(`${user.displayName} deleted`);
      },
    );
  }

  // =========================================
  //  CONFIRMATION PLUMBING
  // =========================================

  private openConfirm(config: ConfirmConfig, run: () => void): void {
    this.confirmConfig.set(config);
    this.confirmRun = run;
  }

  protected onConfirm(): void {
    const run = this.confirmRun;
    this.confirmConfig.set(null);
    this.confirmRun = null;
    run?.();
  }

  protected onCancelConfirm(): void {
    this.confirmConfig.set(null);
    this.confirmRun = null;
  }

  // =========================================
  //  HELPERS
  // =========================================

  private patchUser(id: string, patch: Partial<UserDemo>): void {
    this.users.update((list) => list.map((u) => (u.id === id ? { ...u, ...patch } : u)));
    if (this.selectedUser()?.id === id) {
      this.selectedUser.set(this.users().find((u) => u.id === id) ?? null);
    }
  }

  private today(): string {
    return new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
