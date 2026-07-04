import { Component, computed, inject, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { PageHeader } from '../../../shared';
import { NAVIGATION_ITEMS } from '../../../core/navigation/config/navigation-items.config';
import { PermissionFlags as PF } from '../../../core/authorization/constants/permission-flags.constants';
import { MasterDetailLayoutComponent } from '../../../shared/ui/layouts/master-detail-layout/master-detail-layout';
import { EntityWorkspace } from '../../../shared/ui/entity-workspace/entity-workspace';
import { EntityNavigator } from '../../../shared/ui/entity-navigator/entity-navigator';
import { ModalComponent } from '../../../shared/ui/components/modal/modal';
import { ConfirmationModal, ConfirmationTone } from '../../../shared/ui/components/confirmation-modal/confirmation-modal';
import { RecordActionsMenu } from '../../../shared/ui/components/record-actions-menu/record-actions-menu';
import { RecordActionItem } from '../../../shared/ui/components/record-actions-menu/record-action-item.model';
import { NavigatorPanelService } from '../../../core/layout/navigator-panel.service';
import { APP_ICONS } from '../../../shared/icons/font-awesome.icons';
import { AppModuleDemo, ModuleRoleGrant } from './app-module.model';
import { MODULE_NAVIGATOR_TEMPLATE } from './config/module-navigator-template';
import { MODULE_WORKSPACE_TEMPLATE } from './config/module-workspace-template';

interface ConfirmConfig {
  title: string;
  message: string;
  confirmLabel: string;
  tone: ConfirmationTone;
  icon?: IconDefinition;
}

const SUPER_ADMIN: ModuleRoleGrant = { roleName: 'Super Admin', roleType: 'System', accessRights: PF.View | PF.Create | PF.Update | PF.Delete | PF.Export };
const ADMIN: ModuleRoleGrant = { roleName: 'Admin', roleType: 'System', accessRights: PF.View | PF.Create | PF.Update };
const SECURITY_ANALYST: ModuleRoleGrant = { roleName: 'Security Analyst', roleType: 'Custom', accessRights: PF.View | PF.Update };
const AUDITOR: ModuleRoleGrant = { roleName: 'Auditor', roleType: 'Custom', accessRights: PF.View | PF.Export };
const STANDARD_USER: ModuleRoleGrant = { roleName: 'Standard User', roleType: 'System', accessRights: PF.View };

@Component({
  selector: 'app-modules',
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
  templateUrl: './modules.html',
  styleUrl: './modules.scss',
})
export class Modules {
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
      label: 'Modules',
      route: NAVIGATION_ITEMS[1].children?.[2].route,
      icon: NAVIGATION_ITEMS[1].children?.[2].icon,
    },
  ];

  readonly navigatorTemplate = MODULE_NAVIGATOR_TEMPLATE;
  readonly workspaceTemplate = MODULE_WORKSPACE_TEMPLATE;

  readonly modules = signal<AppModuleDemo[]>([
    // ── Administration ──
    {
      id: '1',
      name: 'User Management',
      category: 'Administration',
      description: 'Create, edit and manage platform user accounts',
      routePath: '/admin/users',
      status: 'Active',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View | PF.Create | PF.Update | PF.Delete | PF.Export,
      rolesGranted: [SUPER_ADMIN, ADMIN],
      auditEvents: ['Default rights updated', 'Module created'],
    },
    {
      id: '2',
      name: 'Role Management',
      category: 'Administration',
      description: 'Define roles and their access rights across modules',
      routePath: '/admin/roles',
      status: 'Active',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View | PF.Create | PF.Update | PF.Delete,
      rolesGranted: [SUPER_ADMIN, ADMIN],
      auditEvents: ['Role assignment reviewed', 'Module created'],
    },
    {
      id: '3',
      name: 'Module Management',
      category: 'Administration',
      description: 'Maintain the catalog of application modules',
      routePath: '/admin/modules',
      status: 'Active',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View | PF.Create | PF.Update | PF.Delete,
      rolesGranted: [SUPER_ADMIN, ADMIN],
      auditEvents: ['Module created'],
    },
    {
      id: '4',
      name: 'Permission Management',
      category: 'Administration',
      description: 'Assign and revoke fine-grained permissions',
      routePath: '/admin/permissions',
      status: 'Active',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View | PF.Update,
      rolesGranted: [SUPER_ADMIN, ADMIN],
      auditEvents: ['Permissions reviewed', 'Module created'],
    },

    // ── Security ──
    {
      id: '5',
      name: 'Session Management',
      category: 'Security',
      description: 'Monitor and revoke active user sessions',
      routePath: '/security/sessions',
      status: 'Active',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View | PF.Delete,
      rolesGranted: [SUPER_ADMIN, ADMIN, SECURITY_ANALYST],
      auditEvents: ['Session policy updated', 'Module created'],
    },
    {
      id: '6',
      name: 'Access Policies',
      category: 'Security',
      description: 'Configure conditional access and security policies',
      routePath: '/security/access-policies',
      status: 'Active',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View | PF.Create | PF.Update | PF.Delete,
      rolesGranted: [SUPER_ADMIN, ADMIN, SECURITY_ANALYST],
      auditEvents: ['Policy updated', 'Module created'],
    },
    {
      id: '7',
      name: 'Token Activity',
      category: 'Security',
      description: 'Review and revoke issued authentication tokens',
      routePath: '/security/token-activity',
      status: 'Active',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View | PF.Delete | PF.Export,
      rolesGranted: [SUPER_ADMIN, ADMIN, SECURITY_ANALYST],
      auditEvents: ['Module created'],
    },
    {
      id: '8',
      name: 'Device Activity',
      category: 'Security',
      description: 'Track devices used to access the platform',
      routePath: '/security/device-activity',
      status: 'Active',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View | PF.Delete | PF.Export,
      rolesGranted: [SUPER_ADMIN, ADMIN, SECURITY_ANALYST],
      auditEvents: ['Module created'],
    },

    // ── Reports ──
    {
      id: '9',
      name: 'Audit Logs',
      category: 'Reports',
      description: 'Full audit trail of administrative actions',
      routePath: '/reports/audit-logs',
      status: 'Active',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View | PF.Export,
      rolesGranted: [SUPER_ADMIN, SECURITY_ANALYST, AUDITOR],
      auditEvents: ['Export enabled', 'Module created'],
    },
    {
      id: '10',
      name: 'Login Activity',
      category: 'Reports',
      description: 'Login attempts, successes and failures over time',
      routePath: '/reports/login-activity',
      status: 'Active',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View | PF.Export,
      rolesGranted: [SUPER_ADMIN, SECURITY_ANALYST, AUDITOR],
      auditEvents: ['Module created'],
    },
    {
      id: '11',
      name: 'Access Reports',
      category: 'Reports',
      description: 'Summaries of module and resource access patterns',
      routePath: '/reports/access-reports',
      status: 'Active',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View | PF.Export,
      rolesGranted: [SUPER_ADMIN, SECURITY_ANALYST, AUDITOR],
      auditEvents: ['Module created'],
    },
    {
      id: '12',
      name: 'Security Reports',
      category: 'Reports',
      description: 'Aggregated security posture and risk reporting',
      routePath: '/reports/security-reports',
      status: 'Active',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View | PF.Export,
      rolesGranted: [SUPER_ADMIN, SECURITY_ANALYST, AUDITOR],
      auditEvents: ['Module created'],
    },

    // ── Settings ──
    {
      id: '13',
      name: 'Profile Settings',
      category: 'Settings',
      description: 'Personal profile information and preferences',
      routePath: '/settings/profile',
      status: 'Active',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View | PF.Update,
      rolesGranted: [SUPER_ADMIN, STANDARD_USER],
      auditEvents: ['Module created'],
    },
    {
      id: '14',
      name: 'Security Settings',
      category: 'Settings',
      description: 'Password policy and multi-factor authentication options',
      routePath: '/settings/security',
      status: 'Active',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View | PF.Update,
      rolesGranted: [SUPER_ADMIN],
      auditEvents: ['Module created'],
    },
    {
      id: '15',
      name: 'Application Settings',
      category: 'Settings',
      description: 'Global platform configuration and branding',
      routePath: '/settings/application',
      status: 'Inactive',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View | PF.Update,
      rolesGranted: [SUPER_ADMIN],
      auditEvents: ['Module deactivated', 'Module created'],
    },

    // ── Core ──
    {
      id: '16',
      name: 'Dashboard',
      category: 'Core',
      description: 'Executive overview and quick-access widgets',
      routePath: '/dashboard',
      status: 'Active',
      defaultAccessRights: PF.View,
      availableAccessRights: PF.View,
      rolesGranted: [SUPER_ADMIN, STANDARD_USER],
      auditEvents: ['Module created'],
    },
  ]);

  readonly selectedModule = signal<AppModuleDemo | null>(this.modules()[0]);
  readonly modalOpen = signal(false);
  readonly modalTitle = computed(() => this.selectedModule()?.name ?? '');
  readonly modalSubtitle = computed(() => this.selectedModule()?.description ?? '');

  readonly selectedModuleActions = computed<RecordActionItem[]>(() =>
    this.buildActions(this.selectedModule()),
  );

  readonly confirmConfig = signal<ConfirmConfig | null>(null);
  readonly confirmOpen = computed(() => this.confirmConfig() !== null);
  private confirmRun: (() => void) | null = null;

  protected onModuleSelected(module: AppModuleDemo): void {
    this.selectedModule.set(module);
  }

  protected onDetailOpened(module: AppModuleDemo): void {
    this.selectedModule.set(module);
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

  private buildActions(module: AppModuleDemo | null): RecordActionItem[] {
    if (!module) {
      return [];
    }

    const active = module.status === 'Active';

    return [
      { label: 'Edit', icon: this.icons.edit, action: () => this.editModule(module) },
      {
        label: active ? 'Deactivate' : 'Activate',
        icon: this.icons.security,
        action: () => this.toggleStatus(module),
      },
      { label: 'Delete', icon: this.icons.delete, danger: true, action: () => this.deleteModule(module) },
    ];
  }

  private editModule(module: AppModuleDemo): void {
    this.toastr.info(`Edit ${module.name} — form coming soon`);
  }

  private toggleStatus(module: AppModuleDemo): void {
    const active = module.status === 'Active';

    this.openConfirm(
      {
        title: active ? 'Deactivate module?' : 'Activate module?',
        message: active
          ? `${module.name} will be hidden and no longer accessible to any role.`
          : `${module.name} will become accessible again to roles granted access.`,
        confirmLabel: active ? 'Deactivate' : 'Activate',
        tone: active ? 'warning' : 'primary',
        icon: this.icons.security,
      },
      () => {
        this.patchModule(module.id, { status: active ? 'Inactive' : 'Active' });
        this.toastr.success(active ? `${module.name} deactivated` : `${module.name} activated`);
      },
    );
  }

  private deleteModule(module: AppModuleDemo): void {
    this.openConfirm(
      {
        title: 'Delete module?',
        message: `${module.name} will be permanently removed from the catalog. This action cannot be undone.`,
        confirmLabel: 'Delete',
        tone: 'danger',
        icon: this.icons.delete,
      },
      () => {
        this.modules.update((list) => list.filter((m) => m.id !== module.id));
        if (this.selectedModule()?.id === module.id) {
          this.selectedModule.set(this.modules()[0] ?? null);
        }
        this.modalOpen.set(false);
        this.toastr.success(`${module.name} deleted`);
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

  private patchModule(id: string, patch: Partial<AppModuleDemo>): void {
    this.modules.update((list) => list.map((m) => (m.id === id ? { ...m, ...patch } : m)));
    if (this.selectedModule()?.id === id) {
      this.selectedModule.set(this.modules().find((m) => m.id === id) ?? null);
    }
  }
}
