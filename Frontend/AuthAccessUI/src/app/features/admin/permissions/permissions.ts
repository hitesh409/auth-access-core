import { Component, computed, inject, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PageHeader } from '../../../shared';
import { NAVIGATION_ITEMS } from '../../../core/navigation/config/navigation-items.config';
import { ButtonComponent } from '../../../shared/ui/components/button/button';
import { SearchBar } from '../../../shared/ui/components/search-bar/search-bar';
import { ConfirmationModal } from '../../../shared/ui/components/confirmation-modal/confirmation-modal';
import { PermissionTree } from '../../../shared/ui/components/permission-tree/permission-tree';
import { APP_ICONS } from '../../../shared/icons/font-awesome.icons';
import { PermissionSubject, PermissionValue } from './permission.model';
import { PERMISSION_CATALOG } from './config/permission-catalog';
import { PERMISSION_FLAGS } from './config/permission-flags.config';
import { PERMISSION_SUBJECTS, PERMISSION_SEED } from './config/permission-demo';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [PageHeader, ButtonComponent, SearchBar, ConfirmationModal, PermissionTree, FontAwesomeModule],
  templateUrl: './permissions.html',
  styleUrl: './permissions.scss',
})
export class Permissions {
  private readonly toastr = inject(ToastrService);
  readonly icons = APP_ICONS;

  readonly breadcrumbs = [
    {
      label: 'Administration',
      route: NAVIGATION_ITEMS[1].route,
      icon: NAVIGATION_ITEMS[1].icon,
    },
    {
      label: 'Permissions',
      route: NAVIGATION_ITEMS[1].children?.[3].route,
      icon: NAVIGATION_ITEMS[1].children?.[3].icon,
    },
  ];

  readonly catalog = PERMISSION_CATALOG;
  readonly flags = PERMISSION_FLAGS;
  readonly subjects = PERMISSION_SUBJECTS;

  /** In-memory persisted grants (moduleKey -> bitmask), per subject. */
  private readonly store = signal<Record<string, PermissionValue>>(
    structuredClone(PERMISSION_SEED),
  );

  readonly selectedId = signal<string>(PERMISSION_SUBJECTS[0].id);
  readonly selectedSubject = computed<PermissionSubject>(
    () => this.subjects.find((s) => s.id === this.selectedId()) ?? this.subjects[0],
  );

  /** Editable working copy + the persisted baseline it's compared against. */
  readonly workingValue = signal<PermissionValue>({ ...(PERMISSION_SEED[PERMISSION_SUBJECTS[0].id] ?? {}) });
  readonly baseline = signal<PermissionValue>({ ...(PERMISSION_SEED[PERMISSION_SUBJECTS[0].id] ?? {}) });

  readonly changedModules = computed(() => {
    const work = this.workingValue();
    const base = this.baseline();
    return this.catalog.filter((m) => (work[m.key] ?? 0) !== (base[m.key] ?? 0)).length;
  });
  readonly dirty = computed(() => this.changedModules() > 0);

  // ---- user picker ----
  readonly pickerOpen = signal(false);
  readonly pickerSearch = signal('');
  readonly filteredSubjects = computed(() => {
    const term = this.pickerSearch().trim().toLowerCase();
    if (!term) return this.subjects;
    return this.subjects.filter((s) =>
      `${s.name} ${s.email} ${s.role}`.toLowerCase().includes(term),
    );
  });

  // ---- switch-while-dirty confirmation ----
  readonly confirmOpen = signal(false);
  private pendingId: string | null = null;

  protected togglePicker(): void {
    this.pickerOpen.update((v) => !v);
  }

  protected onValueChange(value: PermissionValue): void {
    this.workingValue.set(value);
  }

  protected requestSelect(id: string): void {
    this.pickerOpen.set(false);
    this.pickerSearch.set('');
    if (id === this.selectedId()) return;
    if (this.dirty()) {
      this.pendingId = id;
      this.confirmOpen.set(true);
      return;
    }
    this.loadSubject(id);
  }

  private loadSubject(id: string): void {
    const grants = this.store()[id] ?? {};
    this.selectedId.set(id);
    this.baseline.set({ ...grants });
    this.workingValue.set({ ...grants });
  }

  protected save(): void {
    const snapshot = { ...this.workingValue() };
    this.store.update((all) => ({ ...all, [this.selectedId()]: snapshot }));
    this.baseline.set(snapshot);
    this.toastr.success(`Permissions updated for ${this.selectedSubject().name}`);
  }

  protected reset(): void {
    this.workingValue.set({ ...this.baseline() });
  }

  // confirmation: discard changes and switch subject
  protected onConfirmSwitch(): void {
    this.confirmOpen.set(false);
    if (this.pendingId) {
      this.loadSubject(this.pendingId);
      this.pendingId = null;
    }
  }

  protected onCancelSwitch(): void {
    this.confirmOpen.set(false);
    this.pendingId = null;
  }
}
