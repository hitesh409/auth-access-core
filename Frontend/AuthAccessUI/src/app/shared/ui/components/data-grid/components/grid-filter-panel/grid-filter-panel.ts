import { Component, OnChanges, SimpleChanges, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { APP_ICONS } from '../../../../../icons/font-awesome.icons';
import { ButtonComponent } from '../../../button/button';
import { GridColumn } from '../../models/grid-column.model';
import {
  FilterConditionNode,
  FilterCombinator,
  FilterGroupNode,
  FilterNode,
  FilterOperator,
  FilterValueEditor,
  OPERATOR_LABELS,
  cloneFilter,
  countConditions,
  newCondition,
  newGroup,
  operatorNeedsValue,
  operatorsForColumn,
  valueEditorFor,
} from '../../models/grid-filter.model';

@Component({
  selector: 'app-grid-filter-panel',
  standalone: true,
  imports: [NgTemplateOutlet, FontAwesomeModule, ButtonComponent],
  templateUrl: './grid-filter-panel.html',
  styleUrl: './grid-filter-panel.scss',
})
export class GridFilterPanelComponent implements OnChanges {
  readonly filter = input<FilterGroupNode | null>(null);
  readonly columns = input<GridColumn[]>([]);
  /** Distinct values per column key, used to populate badge/enum value pickers. */
  readonly distinctValues = input<Record<string, string[]>>({});

  readonly applyFilter = output<FilterGroupNode | null>();
  readonly close = output<void>();

  protected readonly icons = APP_ICONS;

  /** Working copy — mutated freely, committed to the grid only on Apply. */
  protected draft: FilterGroupNode = newGroup();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      const applied = this.filter();
      this.draft = applied ? cloneFilter(applied) : newGroup('and', []);
    }
  }

  // =========================================
  //  COLUMN / OPERATOR / VALUE LOOKUPS (template helpers)
  // =========================================

  protected filterableColumns(): GridColumn[] {
    return this.columns().filter((c) => c.type !== 'actions');
  }

  protected columnFor(cond: FilterConditionNode): GridColumn | undefined {
    return this.columns().find((c) => c.key.toString() === cond.column);
  }

  protected operatorsFor(cond: FilterConditionNode): FilterOperator[] {
    return operatorsForColumn(this.columnFor(cond));
  }

  protected operatorLabel(op: FilterOperator): string {
    return OPERATOR_LABELS[op];
  }

  protected editorFor(cond: FilterConditionNode): FilterValueEditor {
    return valueEditorFor(this.columnFor(cond), cond.operator);
  }

  protected optionsFor(cond: FilterConditionNode): string[] {
    return this.distinctValues()[cond.column] ?? [];
  }

  // =========================================
  //  MUTATIONS (all operate on the draft in place)
  // =========================================

  protected setCombinator(group: FilterGroupNode, combinator: FilterCombinator): void {
    group.combinator = combinator;
  }

  protected addCondition(group: FilterGroupNode): void {
    const firstColumn = this.filterableColumns()[0]?.key.toString() ?? '';
    group.rules = [...group.rules, newCondition(firstColumn)];
  }

  protected addGroup(group: FilterGroupNode): void {
    const firstColumn = this.filterableColumns()[0]?.key.toString() ?? '';
    group.rules = [...group.rules, newGroup('and', [newCondition(firstColumn)])];
  }

  protected removeNode(parent: FilterGroupNode, node: FilterNode): void {
    parent.rules = parent.rules.filter((rule) => rule.id !== node.id);
  }

  protected changeColumn(cond: FilterConditionNode, columnKey: string): void {
    cond.column = columnKey;
    const ops = operatorsForColumn(this.columnFor(cond));
    if (!ops.includes(cond.operator)) {
      cond.operator = ops[0];
    }
    cond.value = '';
  }

  protected changeOperator(cond: FilterConditionNode, operator: FilterOperator): void {
    cond.operator = operator;
    if (!operatorNeedsValue(operator)) {
      cond.value = '';
    }
  }

  protected changeValue(cond: FilterConditionNode, value: string): void {
    cond.value = value;
  }

  // =========================================
  //  COMMIT
  // =========================================

  protected get draftCount(): number {
    return countConditions(this.draft);
  }

  protected apply(): void {
    this.applyFilter.emit(this.draftCount > 0 ? cloneFilter(this.draft) : null);
    this.close.emit();
  }

  protected clearAll(): void {
    this.draft = newGroup('and', []);
    this.applyFilter.emit(null);
  }
}
