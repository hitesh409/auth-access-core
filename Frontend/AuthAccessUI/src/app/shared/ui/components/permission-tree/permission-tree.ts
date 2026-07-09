import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { APP_ICONS } from '../../../icons/font-awesome.icons';
import { PermissionTreeFlag, PermissionTreeModule } from './permission-tree.model';
import { PERMISSION_TREE_FLAGS } from './permission-tree.config';

type ModuleState = 'none' | 'partial' | 'all';

interface TreeCategory {
  name: string;
  modules: PermissionTreeModule[];
}

@Component({
  selector: 'app-permission-tree',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './permission-tree.html',
  styleUrl: './permission-tree.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionTree {
  readonly modules = input<PermissionTreeModule[]>([]);
  readonly flags = input<PermissionTreeFlag[]>(PERMISSION_TREE_FLAGS);
  readonly value = input<Record<string, number>>({});
  /** Original grants, used to flag modules changed since load. */
  readonly baseline = input<Record<string, number> | null>(null);
  readonly disabled = input(false);
  /** Pin the search + expand/collapse toolbar to the top while scrolling. */
  readonly stickyToolbar = input(false);

  readonly valueChange = output<Record<string, number>>();

  readonly icons = APP_ICONS;

  /** Which bulk action is currently applied — drives the segmented toggle. */
  protected readonly treeMode = signal<'expanded' | 'collapsed'>('collapsed');
  protected readonly search = signal('');
  private readonly expanded = signal<Record<string, boolean>>({});
  /** Category collapse state; categories default to open (undefined = open). */
  private readonly collapsedCats = signal<Record<string, boolean>>({});

  private readonly allBits = computed(() => this.flags().reduce((acc, f) => acc | f.bit, 0));

  /** Modules matching the current search (name/description/category/flag). */
  protected readonly filteredModules = computed(() => {
    const term = this.search().trim().toLowerCase();
    if (!term) return this.modules();
    const flagLabels = this.flags()
      .map((f) => f.label.toLowerCase())
      .join(' ');
    return this.modules().filter((m) => {
      const hay = `${m.name} ${m.description} ${m.category}`.toLowerCase();
      return hay.includes(term) || (flagLabels.includes(term) ? true : false);
    });
  });

  /** Filtered modules grouped into categories, preserving catalog order. */
  protected readonly categories = computed<TreeCategory[]>(() => {
    const out: TreeCategory[] = [];
    const index = new Map<string, TreeCategory>();
    for (const module of this.filteredModules()) {
      let cat = index.get(module.category);
      if (!cat) {
        cat = { name: module.category, modules: [] };
        index.set(module.category, cat);
        out.push(cat);
      }
      cat.modules.push(module);
    }
    return out;
  });

  protected readonly grantedModuleCount = computed(
    () => this.modules().filter((m) => (this.value()[m.key] ?? 0) > 0).length,
  );

  // =========================================
  //  EXPAND / COLLAPSE
  // =========================================

  protected isCategoryOpen(category: string): boolean {
    if (this.search().trim()) return true;
    return !(this.collapsedCats()[category] ?? false);
  }

  protected toggleCategory(category: string): void {
    this.collapsedCats.update((state) => ({ ...state, [category]: !(state[category] ?? false) }));
  }

  protected isExpanded(moduleKey: string): boolean {
    // While searching, matched modules open automatically so hits are visible.
    if (this.search().trim()) return true;
    return this.expanded()[moduleKey] ?? false;
  }

  protected toggleModule(moduleKey: string): void {
    this.expanded.update((state) => ({ ...state, [moduleKey]: !(state[moduleKey] ?? false) }));
  }

  protected expandAll(): void {
    const next: Record<string, boolean> = {};
    for (const m of this.modules()) next[m.key] = true;
    this.expanded.set(next);
    this.collapsedCats.set({});
    this.treeMode.set('expanded');
  }

  protected collapseAll(): void {
    this.expanded.set({});
    this.treeMode.set('collapsed');
  }

  /** Modules in a category that have any access — drives the category count. */
  protected categoryGranted(modules: PermissionTreeModule[]): number {
    return modules.filter((m) => (this.value()[m.key] ?? 0) > 0).length;
  }

  // =========================================
  //  FLAG / MODULE STATE
  // =========================================

  protected hasFlag(moduleKey: string, bit: number): boolean {
    return ((this.value()[moduleKey] ?? 0) & bit) === bit;
  }

  protected grantedCount(moduleKey: string): number {
    const mask = this.value()[moduleKey] ?? 0;
    return this.flags().filter((f) => (mask & f.bit) === f.bit).length;
  }

  protected moduleState(moduleKey: string): ModuleState {
    const count = this.grantedCount(moduleKey);
    if (count === 0) return 'none';
    return count === this.flags().length ? 'all' : 'partial';
  }

  protected isDirty(moduleKey: string): boolean {
    const base = this.baseline();
    if (!base) return false;
    return (this.value()[moduleKey] ?? 0) !== (base[moduleKey] ?? 0);
  }

  // =========================================
  //  MUTATIONS
  // =========================================

  protected toggleFlag(moduleKey: string, bit: number): void {
    if (this.disabled()) return;
    const current = this.value()[moduleKey] ?? 0;
    const next = (current & bit) === bit ? current & ~bit : current | bit;
    this.valueChange.emit({ ...this.value(), [moduleKey]: next });
  }

  protected toggleModuleAll(moduleKey: string, event: Event): void {
    event.stopPropagation();
    if (this.disabled()) return;
    const grantAll = this.moduleState(moduleKey) !== 'all';
    this.valueChange.emit({ ...this.value(), [moduleKey]: grantAll ? this.allBits() : 0 });
  }
}
