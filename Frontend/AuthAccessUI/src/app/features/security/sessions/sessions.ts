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
import { SessionDemo } from './session-demo.model';
import { SESSION_GRID_COLUMNS } from './config/session-grid-columns';
import { SESSION_WORKSPACE_TEMPLATE } from './config/session-workspace-template';

interface ConfirmConfig {
  title: string;
  message: string;
  confirmLabel: string;
  tone: ConfirmationTone;
  icon?: IconDefinition;
}

@Component({
  selector: 'app-sessions',
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
  templateUrl: './sessions.html',
  styleUrl: './sessions.scss',
})
export class Sessions {
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
      label: 'Sessions',
      route: NAVIGATION_ITEMS[2].children?.[0].route,
      icon: NAVIGATION_ITEMS[2].children?.[0].icon,
    },
  ];

  readonly columns = SESSION_GRID_COLUMNS;
  readonly workspaceTemplate = SESSION_WORKSPACE_TEMPLATE;

  readonly bulkActions: GridBulkAction[] = [
    {
      label: 'Revoke Selected',
      variant: 'danger',
      action: (ids) => this.revokeMany(ids),
    },
  ];

  readonly sessions = signal<SessionDemo[]>([
    {
      id: '1',
      userName: 'Sarah Johnson',
      userEmail: 'sarah.johnson@authaccesscore.com',
      device: 'Chrome on Windows 11',
      ipAddress: '203.0.113.14',
      location: 'Mumbai, India',
      status: 'Active',
      startedAt: '2026-06-13T08:02:00',
      lastActivityAt: '2026-06-13T09:14:00',
      expiresAt: '2026-06-13T20:02:00',
      auditEvents: ['Session started', 'MFA verified', 'Last request processed'],
    },
    {
      id: '2',
      userName: 'Sarah Johnson',
      userEmail: 'sarah.johnson@authaccesscore.com',
      device: 'Safari on iPhone 15',
      ipAddress: '198.51.100.22',
      location: 'Mumbai, India',
      status: 'Active',
      startedAt: '2026-06-12T19:40:00',
      lastActivityAt: '2026-06-13T07:55:00',
      expiresAt: '2026-06-13T07:40:00',
      auditEvents: ['Session started', 'MFA verified'],
    },
    {
      id: '3',
      userName: 'Michael Brown',
      userEmail: 'michael.brown@authaccesscore.com',
      device: 'Edge on Windows 10',
      ipAddress: '192.0.2.55',
      location: 'Pune, India',
      status: 'Revoked',
      startedAt: '2026-05-28T21:58:00',
      lastActivityAt: '2026-05-28T22:11:00',
      expiresAt: '2026-05-29T09:58:00',
      auditEvents: ['Session started', 'Multiple login failures detected', 'Session revoked by admin'],
    },
    {
      id: '4',
      userName: 'Olivia Taylor',
      userEmail: 'olivia.taylor@authaccesscore.com',
      device: 'Chrome on macOS',
      ipAddress: '203.0.113.71',
      location: 'Bengaluru, India',
      status: 'Active',
      startedAt: '2026-06-13T08:10:00',
      lastActivityAt: '2026-06-13T08:23:00',
      expiresAt: '2026-06-13T20:10:00',
      auditEvents: ['Session started', 'MFA verified'],
    },
    {
      id: '5',
      userName: 'David Wilson',
      userEmail: 'david.wilson@authaccesscore.com',
      device: 'Firefox on Ubuntu',
      ipAddress: '198.51.100.90',
      location: 'Hyderabad, India',
      status: 'Expired',
      startedAt: '2026-06-11T06:00:00',
      lastActivityAt: '2026-06-11T06:45:00',
      expiresAt: '2026-06-11T18:00:00',
      auditEvents: ['Session started', 'Session expired'],
    },
    {
      id: '6',
      userName: 'James Anderson',
      userEmail: 'james.anderson@authaccesscore.com',
      device: 'Chrome on Android',
      ipAddress: '192.0.2.118',
      location: 'Delhi, India',
      status: 'Revoked',
      startedAt: '2026-03-01T11:00:00',
      lastActivityAt: '2026-03-01T11:08:00',
      expiresAt: '2026-03-01T23:00:00',
      auditEvents: ['Session started', 'Login attempt blocked', 'Session revoked by admin'],
    },
    {
      id: '7',
      userName: 'Sophia Martinez',
      userEmail: 'sophia.martinez@authaccesscore.com',
      device: 'Chrome on Windows 11',
      ipAddress: '203.0.113.132',
      location: 'Chennai, India',
      status: 'Active',
      startedAt: '2026-06-12T17:20:00',
      lastActivityAt: '2026-06-12T17:42:00',
      expiresAt: '2026-06-13T05:20:00',
      auditEvents: ['Session started', 'MFA verified'],
    },
    {
      id: '8',
      userName: 'Noah Harris',
      userEmail: 'noah.harris@authaccesscore.com',
      device: 'Safari on iPad',
      ipAddress: '198.51.100.201',
      location: 'Kolkata, India',
      status: 'Active',
      startedAt: '2026-06-12T14:55:00',
      lastActivityAt: '2026-06-12T15:18:00',
      expiresAt: '2026-06-13T02:55:00',
      auditEvents: ['Session started', 'MFA verified', 'Last request processed'],
    },
  ]);

  readonly selectedSession = signal<SessionDemo | null>(null);
  readonly modalOpen = signal(false);
  readonly modalTitle = computed(() => this.selectedSession()?.userName ?? '');
  readonly modalSubtitle = computed(() => this.selectedSession()?.device ?? '');

  readonly selectedSessionActions = computed<RecordActionItem[]>(() =>
    this.buildActions(this.selectedSession()),
  );

  readonly confirmConfig = signal<ConfirmConfig | null>(null);
  readonly confirmOpen = computed(() => this.confirmConfig() !== null);
  private confirmRun: (() => void) | null = null;

  protected onGridRefresh(): void {
    // No backend yet — the mock signal is already current, so just confirm to the user.
    this.toastr.info('Sessions refreshed');
  }

  protected onRowSelected(session: SessionDemo): void {
    this.selectedSession.set(session);
    if (!this.panelService.isDesktop()) {
      this.modalOpen.set(true);
    }
  }

  /** Explicit "open detail" from the per-row redirect icon (touch). */
  protected onDetailOpened(session: SessionDemo): void {
    this.selectedSession.set(session);
    this.modalOpen.set(true);
  }

  protected closeModal(): void {
    this.modalOpen.set(false);
  }

  // =========================================
  //  ACTIONS
  // =========================================

  private buildActions(session: SessionDemo | null): RecordActionItem[] {
    if (!session || session.status !== 'Active') {
      return [];
    }

    return [
      {
        label: 'Revoke Session',
        icon: this.icons.lock,
        danger: true,
        action: () => this.revokeOne(session),
      },
    ];
  }

  private revokeOne(session: SessionDemo): void {
    this.openConfirm(
      {
        title: 'Revoke session?',
        message: `${session.userName} will be signed out of this device (${session.device}) immediately.`,
        confirmLabel: 'Revoke',
        tone: 'danger',
        icon: this.icons.lock,
      },
      () => {
        this.patchSession(session.id, { status: 'Revoked' });
        this.modalOpen.set(false);
        this.toastr.success(`Session revoked for ${session.userName}`);
      },
    );
  }

  private revokeMany(ids: string[]): void {
    const activeIds = ids.filter((id) => this.sessions().find((s) => s.id === id)?.status === 'Active');

    if (activeIds.length === 0) {
      this.toastr.info('No active sessions in the current selection');
      return;
    }

    this.openConfirm(
      {
        title: 'Revoke selected sessions?',
        message: `${activeIds.length} active session${activeIds.length === 1 ? '' : 's'} will be signed out immediately.`,
        confirmLabel: 'Revoke All',
        tone: 'danger',
        icon: this.icons.lock,
      },
      () => {
        this.sessions.update((list) =>
          list.map((s) => (activeIds.includes(s.id) ? { ...s, status: 'Revoked' } : s)),
        );
        this.toastr.success(`${activeIds.length} session${activeIds.length === 1 ? '' : 's'} revoked`);
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

  private patchSession(id: string, patch: Partial<SessionDemo>): void {
    this.sessions.update((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)));
    if (this.selectedSession()?.id === id) {
      this.selectedSession.set(this.sessions().find((s) => s.id === id) ?? null);
    }
  }
}
