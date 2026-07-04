import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonComponent } from '../button/button';
import { APP_ICONS } from '../../../icons/font-awesome.icons';
import { PermissionFlags } from '../../../../core/authorization/constants/permission-flags.constants';
import { PermissionGroup } from './permission-tree.model';

interface FlagColumn {
  label: string;
  short: string;
  flag: number;
}

@Component({
  selector: 'app-permission-tree',
  standalone: true,
  imports: [FontAwesomeModule, ButtonComponent],
  templateUrl: './permission-tree.html',
  styleUrl: './permission-tree.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionTree {
  readonly groups = input<PermissionGroup[]>([]);
  readonly value = input<Record<string, number>>({});
  readonly disabled = input(false);
  readonly valueChange = output<Record<string, number>>();

  readonly icons = APP_ICONS;
  readonly columns: FlagColumn[] = [
    { label: 'View', short: 'V', flag: PermissionFlags.View },
    { label: 'Create', short: 'C', flag: PermissionFlags.Create },
    { label: 'Update', short: 'U', flag: PermissionFlags.Update },
    { label: 'Delete', short: 'D', flag: PermissionFlags.Delete },
    { label: 'Export', short: 'E', flag: PermissionFlags.Export },
  ];

  private readonly collapsed = signal<Record<string, boolean>>({});

  protected isCollapsed(group: string): boolean {
    return this.collapsed()[group] ?? false;
  }

  protected toggleGroup(group: string): void {
    this.collapsed.update((state) => ({ ...state, [group]: !this.isCollapsed(group) }));
  }

  protected hasFlag(module: string, flag: number): boolean {
    return ((this.value()[module] ?? 0) & flag) === flag;
  }

  protected grantedCount(group: PermissionGroup): number {
    return group.modules.reduce((n, module) => n + ((this.value()[module] ?? 0) ? 1 : 0), 0);
  }

  protected moduleActive(module: string): boolean {
    return (this.value()[module] ?? 0) > 0;
  }

  protected groupAllGranted(group: PermissionGroup): boolean {
    const full = this.fullFlags();
    return group.modules.every((module) => (this.value()[module] ?? 0) === full);
  }

  protected toggle(module: string, flag: number): void {
    if (this.disabled()) {
      return;
    }
    const current = this.value()[module] ?? 0;
    const next = (current & flag) === flag ? current & ~flag : current | flag;
    this.valueChange.emit({ ...this.value(), [module]: next });
  }

  protected toggleGroupAll(group: PermissionGroup): void {
    if (this.disabled()) {
      return;
    }
    const grantAll = !this.groupAllGranted(group);
    const full = this.fullFlags();
    const next = { ...this.value() };
    for (const module of group.modules) {
      next[module] = grantAll ? full : 0;
    }
    this.valueChange.emit(next);
  }

  private fullFlags(): number {
    return this.columns.reduce((acc, col) => acc | col.flag, 0);
  }
}
