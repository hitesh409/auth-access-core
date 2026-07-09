import { Component, computed, inject, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { PageHeader } from '../../../shared';
import { NAVIGATION_ITEMS } from '../../../core/navigation/config/navigation-items.config';
import { MasterDetailLayoutComponent } from '../../../shared/ui/layouts/master-detail-layout/master-detail-layout';
import { EntityWorkspace } from '../../../shared/ui/entity-workspace/entity-workspace';
import { DataGrid } from '../../../shared/ui/components/data-grid/data-grid';
import { GridBulkAction } from '../../../shared/ui/components/data-grid/models/grid-bulk-action.model';
import { ModalComponent } from '../../../shared/ui/components/modal/modal';
import { ConfirmationModal, ConfirmationTone } from '../../../shared/ui/components/confirmation-modal/confirmation-modal';
import { RecordActionsMenu } from '../../../shared/ui/components/record-actions-menu/record-actions-menu';
import { RecordActionItem } from '../../../shared/ui/components/record-actions-menu/record-action-item.model';
import { NavigatorPanelService } from '../../../core/layout/navigator-panel.service';
import { APP_ICONS } from '../../../shared/icons/font-awesome.icons';
import { TokenDemo } from './token-demo.model';
import { TOKEN_GRID_COLUMNS } from './config/token-grid-columns';
import { TOKEN_WORKSPACE_TEMPLATE } from './config/token-workspace-template';

interface ConfirmConfig {
  title: string;
  message: string;
  confirmLabel: string;
  tone: ConfirmationTone;
  icon?: IconDefinition;
}

@Component({
  selector: 'app-token-activity',
  standalone: true,
  imports: [
    PageHeader,
    MasterDetailLayoutComponent,
    DataGrid,
    EntityWorkspace,
    ModalComponent,
    ConfirmationModal,
    RecordActionsMenu,
  ],
  templateUrl: './token-activity.html',
  styleUrl: './token-activity.scss',
})
export class TokenActivity {
  protected readonly panelService = inject(NavigatorPanelService);
  private readonly toastr = inject(ToastrService);
  readonly icons = APP_ICONS;

  readonly breadcrumbs = [
    {
      label: 'Security',
      route: NAVIGATION_ITEMS[2].route,
      icon: NAVIGATION_ITEMS[2].icon,
    },
    {
      label: 'Token Activity',
      route: NAVIGATION_ITEMS[2].children?.[2].route,
      icon: NAVIGATION_ITEMS[2].children?.[2].icon,
    },
  ];

  readonly columns = TOKEN_GRID_COLUMNS;
  readonly workspaceTemplate = TOKEN_WORKSPACE_TEMPLATE;

  readonly bulkActions: GridBulkAction[] = [
    {
      label: 'Revoke Selected',
      variant: 'danger',
      action: (ids) => this.revokeMany(ids),
    },
  ];

  readonly tokens = signal<TokenDemo[]>([
    {
      id: 'TKN-8801',
      name: 'Web Session Token',
      type: 'Access',
      owner: 'Sarah Johnson',
      ownerEmail: 'sarah.johnson@authaccesscore.com',
      client: 'Chrome on Windows',
      scopes: ['read:profile', 'read:sessions'],
      status: 'Active',
      ipAddress: '203.0.113.14',
      issuedAt: '2026-06-13T08:02:00',
      expiresAt: '2026-06-13T20:02:00',
      lastUsedAt: '2026-06-13T09:14:00',
      usageCount: 42,
      auditEvents: ['Used from Mumbai', 'MFA verified', 'Token issued'],
    },
    {
      id: 'TKN-8802',
      name: 'CI/CD Pipeline',
      type: 'API Key',
      owner: 'Michael Brown',
      ownerEmail: 'michael.brown@authaccesscore.com',
      client: 'GitHub Actions',
      scopes: ['read:modules', 'write:sessions', 'read:users'],
      status: 'Active',
      ipAddress: '192.0.2.55',
      issuedAt: '2026-05-01T10:00:00',
      expiresAt: '2026-12-01T10:00:00',
      lastUsedAt: '2026-06-13T05:30:00',
      usageCount: 1284,
      auditEvents: ['Used from CI runner', 'Scope granted: write:sessions', 'Token issued'],
    },
    {
      id: 'TKN-8803',
      name: 'Mobile App Token',
      type: 'Refresh',
      owner: 'Olivia Taylor',
      ownerEmail: 'olivia.taylor@authaccesscore.com',
      client: 'iOS App',
      scopes: ['read:profile'],
      status: 'Active',
      ipAddress: '203.0.113.71',
      issuedAt: '2026-06-01T08:00:00',
      expiresAt: '2026-09-01T08:00:00',
      lastUsedAt: '2026-06-13T08:23:00',
      usageCount: 210,
      auditEvents: ['Refreshed', 'Used from Bengaluru', 'Token issued'],
    },
    {
      id: 'TKN-8804',
      name: 'Postman Testing',
      type: 'Personal Access',
      owner: 'David Wilson',
      ownerEmail: 'david.wilson@authaccesscore.com',
      client: 'Postman',
      scopes: ['read:users', 'read:roles'],
      status: 'Expired',
      ipAddress: '198.51.100.90',
      issuedAt: '2026-03-01T06:00:00',
      expiresAt: '2026-06-01T06:00:00',
      lastUsedAt: '2026-05-30T14:12:00',
      usageCount: 88,
      auditEvents: ['Token expired', 'Used from Hyderabad', 'Token issued'],
    },
    {
      id: 'TKN-8805',
      name: 'Legacy Integration',
      type: 'API Key',
      owner: 'James Anderson',
      ownerEmail: 'james.anderson@authaccesscore.com',
      client: 'Internal Service',
      scopes: ['read:audit'],
      status: 'Revoked',
      ipAddress: '192.0.2.118',
      issuedAt: '2026-01-15T11:00:00',
      expiresAt: '2026-07-15T11:00:00',
      lastUsedAt: '2026-03-01T11:08:00',
      usageCount: 530,
      auditEvents: ['Revoked by admin', 'Suspicious usage detected', 'Token issued'],
    },
    {
      id: 'TKN-8806',
      name: 'Desktop Session',
      type: 'Access',
      owner: 'Sophia Martinez',
      ownerEmail: 'sophia.martinez@authaccesscore.com',
      client: 'Edge on Windows',
      scopes: ['read:profile', 'read:sessions'],
      status: 'Active',
      ipAddress: '203.0.113.132',
      issuedAt: '2026-06-12T17:20:00',
      expiresAt: '2026-06-13T05:20:00',
      lastUsedAt: '2026-06-12T17:42:00',
      usageCount: 15,
      auditEvents: ['Used from Chennai', 'Token issued'],
    },
    {
      id: 'TKN-8807',
      name: 'iPad App Token',
      type: 'Refresh',
      owner: 'Noah Harris',
      ownerEmail: 'noah.harris@authaccesscore.com',
      client: 'iPadOS App',
      scopes: ['read:profile'],
      status: 'Active',
      ipAddress: '198.51.100.201',
      issuedAt: '2026-06-10T14:50:00',
      expiresAt: '2026-09-10T14:50:00',
      lastUsedAt: '2026-06-12T15:18:00',
      usageCount: 63,
      auditEvents: ['MFA verified', 'Refreshed', 'Token issued'],
    },
    {
      id: 'TKN-8808',
      name: 'Analytics Export',
      type: 'Personal Access',
      owner: 'Sarah Johnson',
      ownerEmail: 'sarah.johnson@authaccesscore.com',
      client: 'Python Script',
      scopes: ['read:reports', 'read:audit'],
      status: 'Expired',
      ipAddress: '203.0.113.14',
      issuedAt: '2026-02-10T09:00:00',
      expiresAt: '2026-05-10T09:00:00',
      lastUsedAt: '2026-05-08T19:30:00',
      usageCount: 320,
      auditEvents: ['Token expired', 'Used from Mumbai', 'Token issued'],
    },
  ]);

  readonly selectedToken = signal<TokenDemo | null>(null);
  readonly modalOpen = signal(false);
  readonly modalTitle = computed(() => this.selectedToken()?.name ?? '');
  readonly modalSubtitle = computed(() => this.selectedToken()?.owner ?? '');

  readonly selectedTokenActions = computed<RecordActionItem[]>(() =>
    this.buildActions(this.selectedToken()),
  );

  readonly confirmConfig = signal<ConfirmConfig | null>(null);
  readonly confirmOpen = computed(() => this.confirmConfig() !== null);
  private confirmRun: (() => void) | null = null;

  protected onGridRefresh(): void {
    this.toastr.info('Tokens refreshed');
  }

  protected onRowSelected(token: TokenDemo): void {
    this.selectedToken.set(token);
    if (!this.panelService.isDesktop()) {
      this.modalOpen.set(true);
    }
  }

  protected onDetailOpened(token: TokenDemo): void {
    this.selectedToken.set(token);
    this.modalOpen.set(true);
  }

  protected closeModal(): void {
    this.modalOpen.set(false);
  }

  // =========================================
  //  ACTIONS
  // =========================================

  private buildActions(token: TokenDemo | null): RecordActionItem[] {
    if (!token || token.status !== 'Active') {
      return [];
    }

    return [
      {
        label: 'Revoke Token',
        icon: this.icons.lock,
        danger: true,
        action: () => this.revokeOne(token),
      },
    ];
  }

  private revokeOne(token: TokenDemo): void {
    this.openConfirm(
      {
        title: 'Revoke token?',
        message: `"${token.name}" (${token.owner}) will stop working immediately and any client using it will be signed out.`,
        confirmLabel: 'Revoke',
        tone: 'danger',
        icon: this.icons.lock,
      },
      () => {
        this.patchToken(token.id, { status: 'Revoked' });
        this.modalOpen.set(false);
        this.toastr.success(`"${token.name}" revoked`);
      },
    );
  }

  private revokeMany(ids: string[]): void {
    const activeIds = ids.filter((id) => this.tokens().find((t) => t.id === id)?.status === 'Active');

    if (activeIds.length === 0) {
      this.toastr.info('No active tokens in the current selection');
      return;
    }

    this.openConfirm(
      {
        title: 'Revoke selected tokens?',
        message: `${activeIds.length} active token${activeIds.length === 1 ? '' : 's'} will stop working immediately.`,
        confirmLabel: 'Revoke All',
        tone: 'danger',
        icon: this.icons.lock,
      },
      () => {
        this.tokens.update((list) =>
          list.map((t) => (activeIds.includes(t.id) ? { ...t, status: 'Revoked' } : t)),
        );
        this.toastr.success(`${activeIds.length} token${activeIds.length === 1 ? '' : 's'} revoked`);
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

  private patchToken(id: string, patch: Partial<TokenDemo>): void {
    this.tokens.update((list) => list.map((t) => (t.id === id ? { ...t, ...patch } : t)));
    if (this.selectedToken()?.id === id) {
      this.selectedToken.set(this.tokens().find((t) => t.id === id) ?? null);
    }
  }
}
