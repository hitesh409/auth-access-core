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
import { DeviceDemo } from './device-demo.model';
import { DEVICE_GRID_COLUMNS } from './config/device-grid-columns';
import { DEVICE_WORKSPACE_TEMPLATE } from './config/device-workspace-template';

interface ConfirmConfig {
  title: string;
  message: string;
  confirmLabel: string;
  tone: ConfirmationTone;
  icon?: IconDefinition;
}

@Component({
  selector: 'app-device-activity',
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
  templateUrl: './device-activity.html',
  styleUrl: './device-activity.scss',
})
export class DeviceActivity {
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
      label: 'Device Activity',
      route: NAVIGATION_ITEMS[2].children?.[3].route,
      icon: NAVIGATION_ITEMS[2].children?.[3].icon,
    },
  ];

  readonly columns = DEVICE_GRID_COLUMNS;
  readonly workspaceTemplate = DEVICE_WORKSPACE_TEMPLATE;

  readonly bulkActions: GridBulkAction[] = [
    {
      label: 'Block Selected',
      variant: 'danger',
      action: (ids) => this.blockMany(ids),
    },
  ];

  readonly devices = signal<DeviceDemo[]>([
    {
      id: 'DVC-1041',
      deviceName: "Sarah's MacBook Pro",
      owner: 'Sarah Johnson',
      ownerEmail: 'sarah.johnson@authaccesscore.com',
      type: 'Desktop',
      os: 'macOS 14.5',
      browser: 'Chrome 126',
      ipAddress: '203.0.113.14',
      location: 'Mumbai, India',
      status: 'Trusted',
      riskLevel: 'Low',
      activeSessions: 2,
      firstSeenAt: '2026-01-10T09:12:00',
      lastSeenAt: '2026-06-13T09:14:00',
      auditEvents: ['New sign-in from Mumbai', 'Marked as trusted', 'Device registered'],
    },
    {
      id: 'DVC-1042',
      deviceName: "Sarah's iPhone 15",
      owner: 'Sarah Johnson',
      ownerEmail: 'sarah.johnson@authaccesscore.com',
      type: 'Mobile',
      os: 'iOS 17.5',
      browser: 'Safari 17',
      ipAddress: '198.51.100.22',
      location: 'Mumbai, India',
      status: 'Trusted',
      riskLevel: 'Low',
      activeSessions: 1,
      firstSeenAt: '2026-02-02T18:40:00',
      lastSeenAt: '2026-06-13T07:55:00',
      auditEvents: ['MFA enrolled', 'Marked as trusted', 'Device registered'],
    },
    {
      id: 'DVC-1043',
      deviceName: 'Mike-Win-Desktop',
      owner: 'Michael Brown',
      ownerEmail: 'michael.brown@authaccesscore.com',
      type: 'Desktop',
      os: 'Windows 11',
      browser: 'Edge 126',
      ipAddress: '192.0.2.55',
      location: 'Pune, India',
      status: 'Blocked',
      riskLevel: 'High',
      activeSessions: 0,
      firstSeenAt: '2026-03-15T21:50:00',
      lastSeenAt: '2026-05-28T22:11:00',
      auditEvents: ['Blocked by admin', 'Multiple failed logins detected', 'Device registered'],
    },
    {
      id: 'DVC-1044',
      deviceName: "Olivia's MacBook Air",
      owner: 'Olivia Taylor',
      ownerEmail: 'olivia.taylor@authaccesscore.com',
      type: 'Desktop',
      os: 'macOS 14.4',
      browser: 'Chrome 126',
      ipAddress: '203.0.113.71',
      location: 'Bengaluru, India',
      status: 'Trusted',
      riskLevel: 'Low',
      activeSessions: 1,
      firstSeenAt: '2026-01-20T08:05:00',
      lastSeenAt: '2026-06-13T08:23:00',
      auditEvents: ['New sign-in from Bengaluru', 'Marked as trusted', 'Device registered'],
    },
    {
      id: 'DVC-1045',
      deviceName: 'Dave Ubuntu Box',
      owner: 'David Wilson',
      ownerEmail: 'david.wilson@authaccesscore.com',
      type: 'Desktop',
      os: 'Ubuntu 24.04',
      browser: 'Firefox 127',
      ipAddress: '198.51.100.90',
      location: 'Hyderabad, India',
      status: 'Pending',
      riskLevel: 'Medium',
      activeSessions: 0,
      firstSeenAt: '2026-06-10T05:58:00',
      lastSeenAt: '2026-06-11T06:45:00',
      auditEvents: ['Awaiting owner verification', 'Device registered'],
    },
    {
      id: 'DVC-1046',
      deviceName: 'Galaxy S24',
      owner: 'James Anderson',
      ownerEmail: 'james.anderson@authaccesscore.com',
      type: 'Mobile',
      os: 'Android 14',
      browser: 'Chrome 126',
      ipAddress: '192.0.2.118',
      location: 'Delhi, India',
      status: 'Blocked',
      riskLevel: 'High',
      activeSessions: 0,
      firstSeenAt: '2026-02-28T10:55:00',
      lastSeenAt: '2026-03-01T11:08:00',
      auditEvents: ['Blocked by admin', 'Suspicious location change', 'Device registered'],
    },
    {
      id: 'DVC-1047',
      deviceName: 'Sophia Surface',
      owner: 'Sophia Martinez',
      ownerEmail: 'sophia.martinez@authaccesscore.com',
      type: 'Tablet',
      os: 'Windows 11',
      browser: 'Edge 126',
      ipAddress: '203.0.113.132',
      location: 'Chennai, India',
      status: 'Trusted',
      riskLevel: 'Low',
      activeSessions: 1,
      firstSeenAt: '2026-04-05T17:15:00',
      lastSeenAt: '2026-06-12T17:42:00',
      auditEvents: ['New sign-in from Chennai', 'Marked as trusted', 'Device registered'],
    },
    {
      id: 'DVC-1048',
      deviceName: 'Noah iPad Pro',
      owner: 'Noah Harris',
      ownerEmail: 'noah.harris@authaccesscore.com',
      type: 'Tablet',
      os: 'iPadOS 17.5',
      browser: 'Safari 17',
      ipAddress: '198.51.100.201',
      location: 'Kolkata, India',
      status: 'Pending',
      riskLevel: 'Medium',
      activeSessions: 1,
      firstSeenAt: '2026-06-08T14:50:00',
      lastSeenAt: '2026-06-12T15:18:00',
      auditEvents: ['MFA enrolled', 'Awaiting owner verification', 'Device registered'],
    },
  ]);

  readonly selectedDevice = signal<DeviceDemo | null>(null);
  readonly modalOpen = signal(false);
  readonly modalTitle = computed(() => this.selectedDevice()?.deviceName ?? '');
  readonly modalSubtitle = computed(() => this.selectedDevice()?.owner ?? '');

  readonly selectedDeviceActions = computed<RecordActionItem[]>(() =>
    this.buildActions(this.selectedDevice()),
  );

  readonly confirmConfig = signal<ConfirmConfig | null>(null);
  readonly confirmOpen = computed(() => this.confirmConfig() !== null);
  private confirmRun: (() => void) | null = null;

  protected onGridRefresh(): void {
    this.toastr.info('Devices refreshed');
  }

  protected onRowSelected(device: DeviceDemo): void {
    this.selectedDevice.set(device);
    if (!this.panelService.isDesktop()) {
      this.modalOpen.set(true);
    }
  }

  protected onDetailOpened(device: DeviceDemo): void {
    this.selectedDevice.set(device);
    this.modalOpen.set(true);
  }

  protected closeModal(): void {
    this.modalOpen.set(false);
  }

  // =========================================
  //  ACTIONS
  // =========================================

  private buildActions(device: DeviceDemo | null): RecordActionItem[] {
    if (!device || device.status === 'Blocked') {
      return [];
    }

    return [
      {
        label: 'Block Device',
        icon: this.icons.lock,
        danger: true,
        action: () => this.blockOne(device),
      },
    ];
  }

  private blockOne(device: DeviceDemo): void {
    this.openConfirm(
      {
        title: 'Block device?',
        message: `${device.deviceName} (${device.owner}) will be blocked and its active sessions signed out immediately.`,
        confirmLabel: 'Block',
        tone: 'danger',
        icon: this.icons.lock,
      },
      () => {
        this.patchDevice(device.id, { status: 'Blocked', riskLevel: 'High', activeSessions: 0 });
        this.modalOpen.set(false);
        this.toastr.success(`${device.deviceName} blocked`);
      },
    );
  }

  private blockMany(ids: string[]): void {
    const blockableIds = ids.filter(
      (id) => this.devices().find((d) => d.id === id)?.status !== 'Blocked',
    );

    if (blockableIds.length === 0) {
      this.toastr.info('No unblocked devices in the current selection');
      return;
    }

    this.openConfirm(
      {
        title: 'Block selected devices?',
        message: `${blockableIds.length} device${blockableIds.length === 1 ? '' : 's'} will be blocked immediately.`,
        confirmLabel: 'Block All',
        tone: 'danger',
        icon: this.icons.lock,
      },
      () => {
        this.devices.update((list) =>
          list.map((d) =>
            blockableIds.includes(d.id) ? { ...d, status: 'Blocked', activeSessions: 0 } : d,
          ),
        );
        this.toastr.success(`${blockableIds.length} device${blockableIds.length === 1 ? '' : 's'} blocked`);
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

  private patchDevice(id: string, patch: Partial<DeviceDemo>): void {
    this.devices.update((list) => list.map((d) => (d.id === id ? { ...d, ...patch } : d)));
    if (this.selectedDevice()?.id === id) {
      this.selectedDevice.set(this.devices().find((d) => d.id === id) ?? null);
    }
  }
}
