import { Component, computed, inject, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { PageHeader } from '../../../shared';
import { NAVIGATION_ITEMS } from '../../../core/navigation/config/navigation-items.config';
import { PermissionFlags as PF } from '../../../core/authorization/constants/permission-flags.constants';
import { MasterDetailLayoutComponent } from '../../../shared/ui/layouts/master-detail-layout/master-detail-layout';
import { EntityNavigator } from '../../../shared/ui/entity-navigator/entity-navigator';
import { ModalComponent } from '../../../shared/ui/components/modal/modal';
import { ConfirmationModal, ConfirmationTone } from '../../../shared/ui/components/confirmation-modal/confirmation-modal';
import { ButtonComponent } from '../../../shared/ui/components/button/button';
import { NavigatorPanelService } from '../../../core/layout/navigator-panel.service';
import { APP_ICONS } from '../../../shared/icons/font-awesome.icons';
import { RoleDemo, RoleRight } from './role-demo.model';
import { ROLE_NAVIGATOR_TEMPLATE } from './config/role-navigator-template';
import { MODULE_GROUPS } from './config/role-modules.config';
import { RoleEditor } from './role-editor';

interface ConfirmConfig {
  title: string;
  message: string;
  confirmLabel: string;
  tone: ConfirmationTone;
  icon?: IconDefinition;
}

const ADMIN_MODULES = [
  'User Management',
  'Role Management',
  'Module Management',
  'Permission Management',
];
const SECURITY_MODULES = [
  'Session Management',
  'Access Policies',
  'Token Activity',
  'Device Activity',
];
const REPORT_MODULES = ['Audit Logs', 'Login Activity', 'Access Reports', 'Security Reports'];
const SETTINGS_MODULES = ['Profile Settings', 'Security Settings', 'Application Settings'];
const CORE_MODULES = ['Dashboard'];
const ALL_MODULES = [
  ...ADMIN_MODULES,
  ...SECURITY_MODULES,
  ...REPORT_MODULES,
  ...SETTINGS_MODULES,
  ...CORE_MODULES,
];

const FULL = PF.View | PF.Create | PF.Update | PF.Delete | PF.Export;

function rights(modules: string[], access: number, on = '01 Jan 2026'): RoleRight[] {
  return modules.map((module) => ({
    module,
    allowedAccessRights: access,
    createdBy: 'System',
    createdOn: on,
    isDeleted: false,
    updatedBy: 'System',
    updatedOn: on,
  }));
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    PageHeader,
    MasterDetailLayoutComponent,
    EntityNavigator,
    ModalComponent,
    ConfirmationModal,
    ButtonComponent,
    RoleEditor,
  ],
  templateUrl: './roles.html',
  styleUrl: './roles.scss',
})
export class Roles {
  protected readonly panelService = inject(NavigatorPanelService);
  private readonly toastr = inject(ToastrService);
  readonly icons = APP_ICONS;

  readonly breadcrumbs = [
    {
      label: 'Administration',
      route: NAVIGATION_ITEMS[1].route,
      icon: NAVIGATION_ITEMS[1].icon,
    },
    {
      label: 'Roles',
      route: NAVIGATION_ITEMS[1].children?.[1].route,
      icon: NAVIGATION_ITEMS[1].children?.[1].icon,
    },
  ];

  readonly navigatorTemplate = ROLE_NAVIGATOR_TEMPLATE;
  readonly modules = MODULE_GROUPS;

  readonly roles = signal<RoleDemo[]>([
    {
      id: '1',
      name: 'Super Admin',
      description: 'Unrestricted access across the entire platform',
      type: 'System',
      status: 'Active',
      usersAssigned: 3,
      createdBy: 'System',
      createdAt: '01 Jan 2026',
      updatedAt: '12 Jun 2026',
      rights: rights(ALL_MODULES, FULL),
      assignedUsers: [
        { name: 'Sarah Johnson', email: 'sarah.johnson@authaccesscore.com' },
        { name: 'Liam Garcia', email: 'liam.garcia@authaccesscore.com' },
      ],
      auditEvents: ['Permissions reviewed', 'Role updated', 'User assigned'],
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Administrative access to users, roles and security',
      type: 'System',
      status: 'Active',
      usersAssigned: 8,
      createdBy: 'System',
      createdAt: '01 Jan 2026',
      updatedAt: '02 Jun 2026',
      rights: rights([...ADMIN_MODULES, ...SECURITY_MODULES], PF.View | PF.Create | PF.Update),
      assignedUsers: [
        { name: 'Olivia Taylor', email: 'olivia.taylor@authaccesscore.com' },
        { name: 'Noah Harris', email: 'noah.harris@authaccesscore.com' },
      ],
      auditEvents: ['Permissions changed', 'User assigned', 'Role created'],
    },
    {
      id: '3',
      name: 'Security Analyst',
      description: 'Monitors sessions, devices and security reports',
      type: 'Custom',
      status: 'Active',
      usersAssigned: 5,
      createdBy: 'Sarah Johnson',
      createdAt: '14 Feb 2026',
      updatedAt: '22 May 2026',
      rights: rights([...SECURITY_MODULES, ...REPORT_MODULES], PF.View | PF.Update),
      assignedUsers: [
        { name: 'Michael Brown', email: 'michael.brown@authaccesscore.com' },
        { name: 'Sophia Martinez', email: 'sophia.martinez@authaccesscore.com' },
      ],
      auditEvents: ['Permissions changed', 'Role created'],
    },
    {
      id: '4',
      name: 'Auditor',
      description: 'Read-only access to audit and activity reports',
      type: 'Custom',
      status: 'Inactive',
      usersAssigned: 2,
      createdBy: 'Sarah Johnson',
      createdAt: '20 Jan 2026',
      updatedAt: '01 May 2026',
      rights: rights(REPORT_MODULES, PF.View | PF.Export),
      assignedUsers: [{ name: 'Ava Clark', email: 'ava.clark@authaccesscore.com' }],
      auditEvents: ['Role deactivated', 'Audit report generated', 'Role created'],
    },
    {
      id: '5',
      name: 'Standard User',
      description: 'Baseline access for everyday platform users',
      type: 'System',
      status: 'Active',
      usersAssigned: 24,
      createdBy: 'System',
      createdAt: '01 Jan 2026',
      updatedAt: '30 May 2026',
      rights: rights([...CORE_MODULES, 'Profile Settings'], PF.View),
      assignedUsers: [
        { name: 'Daniel Thomas', email: 'daniel.thomas@authaccesscore.com' },
        { name: 'Emma Lee', email: 'emma.lee@authaccesscore.com' },
      ],
      auditEvents: ['User assigned', 'Role created'],
    },
  ]);

  readonly selectedRole = signal<RoleDemo | null>(this.roles()[0]);
  readonly creating = signal(false);
  readonly modalOpen = signal(false);
  readonly modalTitle = computed(() =>
    this.creating() ? 'New Role' : (this.selectedRole()?.name ?? ''),
  );
  readonly modalSubtitle = computed(() =>
    this.creating() ? 'Create a custom role' : (this.selectedRole()?.description ?? ''),
  );

  // Role shown in the editor: null (blank) while creating, otherwise the selection.
  readonly activeRole = computed(() => (this.creating() ? null : this.selectedRole()));

  readonly confirmConfig = signal<ConfirmConfig | null>(null);
  readonly confirmOpen = computed(() => this.confirmConfig() !== null);
  private confirmRun: (() => void) | null = null;

  protected onRoleSelected(role: RoleDemo): void {
    this.creating.set(false);
    this.selectedRole.set(role);
  }

  protected onDetailOpened(role: RoleDemo): void {
    this.creating.set(false);
    this.selectedRole.set(role);
    if (!this.panelService.isDesktop()) {
      this.modalOpen.set(true);
    }
  }

  protected closeModal(): void {
    this.modalOpen.set(false);
    this.creating.set(false);
  }

  // =========================================
  //  CREATE / EDIT
  // =========================================

  protected onNewRole(): void {
    this.creating.set(true);
    if (!this.panelService.isDesktop()) {
      this.modalOpen.set(true);
    }
  }

  protected onSaved(role: RoleDemo): void {
    if (this.creating()) {
      this.roles.update((list) => [role, ...list]);
      this.selectedRole.set(role);
      this.creating.set(false);
      this.toastr.success(`Role "${role.name}" created`);
    } else {
      this.roles.update((list) => list.map((r) => (r.id === role.id ? role : r)));
      this.selectedRole.set(role);
      this.toastr.success(`Role "${role.name}" updated`);
    }
  }

  protected onCancelCreate(): void {
    this.creating.set(false);
    this.modalOpen.set(false);
  }

  protected onDuplicate(role: RoleDemo): void {
    const copy: RoleDemo = {
      ...role,
      id: `${Date.now()}`,
      name: `Copy of ${role.name}`,
      type: 'Custom',
      status: 'Active',
      usersAssigned: 0,
      createdBy: 'You',
      createdAt: this.today(),
      updatedAt: this.today(),
      rights: role.rights.map((r) => ({ ...r })),
      assignedUsers: [],
      auditEvents: ['Role duplicated'],
    };

    this.creating.set(false);
    this.roles.update((list) => [copy, ...list]);
    this.selectedRole.set(copy);
    this.toastr.success(`Duplicated as "${copy.name}"`);
  }

  protected onDelete(role: RoleDemo): void {
    this.openConfirm(
      {
        title: 'Delete role?',
        message: `${role.name} will be permanently removed. This action cannot be undone.`,
        confirmLabel: 'Delete',
        tone: 'danger',
        icon: this.icons.delete,
      },
      () => {
        this.roles.update((list) => list.filter((r) => r.id !== role.id));
        if (this.selectedRole()?.id === role.id) {
          this.selectedRole.set(this.roles()[0] ?? null);
        }
        this.modalOpen.set(false);
        this.toastr.success(`${role.name} deleted`);
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

  private today(): string {
    return new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
