import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonComponent } from '../../../shared/ui/components/button/button';
import { BadgeComponent } from '../../../shared/ui/components/badge/badge';
import { RecordActionsMenu } from '../../../shared/ui/components/record-actions-menu/record-actions-menu';
import { RecordActionItem } from '../../../shared/ui/components/record-actions-menu/record-action-item.model';
import { PermissionTree } from '../../../shared/ui/components/permission-tree/permission-tree';
import { PermissionGroup } from '../../../shared/ui/components/permission-tree/permission-tree.model';
import { APP_ICONS } from '../../../shared/icons/font-awesome.icons';
import { RoleDemo, RoleStatus } from './role-demo.model';
import { mapToRights, rightsToMap } from './role.util';

@Component({
  selector: 'app-role-editor',
  standalone: true,
  imports: [
    FormsModule,
    FontAwesomeModule,
    ButtonComponent,
    BadgeComponent,
    RecordActionsMenu,
    PermissionTree,
  ],
  templateUrl: './role-editor.html',
  styleUrl: './role-editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleEditor {
  readonly role = input<RoleDemo | null>(null);
  readonly modules = input<PermissionGroup[]>([]);
  readonly isNew = input(false);

  readonly saved = output<RoleDemo>();
  readonly cancelledCreate = output<void>();
  readonly requestDuplicate = output<RoleDemo>();
  readonly requestDelete = output<RoleDemo>();

  readonly icons = APP_ICONS;

  readonly editing = signal(false);
  readonly draftName = signal('');
  readonly draftDescription = signal('');
  readonly draftStatus = signal<RoleStatus>('Active');
  readonly draftRights = signal<Record<string, number>>({});

  readonly isSystem = computed(() => this.role()?.type === 'System' && !this.isNew());
  readonly canSave = computed(() => this.draftName().trim().length > 0);
  readonly usersCount = computed(() => this.role()?.usersAssigned ?? 0);

  readonly kebabActions = computed<RecordActionItem[]>(() => {
    const role = this.role();
    if (!role || this.isNew() || this.editing()) {
      return [];
    }

    const actions: RecordActionItem[] = [
      { label: 'Duplicate', icon: this.icons.duplicate, action: () => this.requestDuplicate.emit(role) },
    ];

    if (role.type !== 'System') {
      actions.push({
        label: 'Delete',
        icon: this.icons.delete,
        danger: true,
        action: () => this.requestDelete.emit(role),
      });
    }

    return actions;
  });

  constructor() {
    // Reset the draft whenever the selected role (or create mode) changes.
    effect(() => {
      const role = this.role();
      const isNew = this.isNew();
      untracked(() => this.resetDraft(role, isNew));
    });
  }

  protected startEdit(): void {
    this.editing.set(true);
  }

  protected cancel(): void {
    if (this.isNew()) {
      this.cancelledCreate.emit();
      return;
    }
    this.resetDraft(this.role(), false);
  }

  protected save(): void {
    const base = this.role();
    const role: RoleDemo = {
      id: base?.id ?? `${Date.now()}`,
      name: this.draftName().trim() || 'Untitled Role',
      description: this.draftDescription().trim(),
      type: base?.type ?? 'Custom',
      status: this.draftStatus(),
      usersAssigned: base?.usersAssigned ?? 0,
      createdBy: base?.createdBy ?? 'You',
      createdAt: base?.createdAt ?? this.today(),
      updatedAt: this.today(),
      rights: mapToRights(this.draftRights(), base),
      assignedUsers: base?.assignedUsers ?? [],
      auditEvents: base?.auditEvents ?? ['Role created'],
    };

    this.saved.emit(role);
    this.editing.set(false);
  }

  protected onRightsChange(map: Record<string, number>): void {
    this.draftRights.set(map);
  }

  protected initials(): string {
    const name = this.isNew() ? this.draftName() : (this.role()?.name ?? '');
    return this.userInitials(name) || '?';
  }

  protected userInitials(name: string): string {
    return name
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0] ?? '')
      .join('')
      .toUpperCase();
  }

  private resetDraft(role: RoleDemo | null, isNew: boolean): void {
    this.draftName.set(role?.name ?? '');
    this.draftDescription.set(role?.description ?? '');
    this.draftStatus.set(role?.status ?? 'Active');
    this.draftRights.set(rightsToMap(role));
    this.editing.set(isNew);
  }

  private today(): string {
    return new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
