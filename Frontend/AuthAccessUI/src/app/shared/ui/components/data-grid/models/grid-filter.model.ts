import { GridColumn, GridColumnType } from './grid-column.model';

/**
 * Advanced filter model — a recursive tree of AND/OR groups whose leaves are
 * single Column·Operator·Value conditions. The root is always a group, so an
 * arbitrarily nested boolean expression like `(A AND B) OR C` is representable.
 */

export type FilterCombinator = 'and' | 'or';

export type FilterOperator =
  | 'contains'
  | 'notContains'
  | 'equals'
  | 'notEquals'
  | 'startsWith'
  | 'endsWith'
  | 'isEmpty'
  | 'isNotEmpty'
  | 'before'
  | 'after'
  | 'onOrBefore'
  | 'onOrAfter'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte';

export interface FilterConditionNode {
  id: string;
  kind: 'condition';
  column: string;
  operator: FilterOperator;
  value: string;
}

export interface FilterGroupNode {
  id: string;
  kind: 'group';
  combinator: FilterCombinator;
  rules: FilterNode[];
}

export type FilterNode = FilterConditionNode | FilterGroupNode;

// =========================================
//  OPERATOR CATALOG
// =========================================

export const OPERATOR_LABELS: Record<FilterOperator, string> = {
  contains: 'contains',
  notContains: 'does not contain',
  equals: 'is',
  notEquals: 'is not',
  startsWith: 'starts with',
  endsWith: 'ends with',
  isEmpty: 'is empty',
  isNotEmpty: 'is not empty',
  before: 'is before',
  after: 'is after',
  onOrBefore: 'is on or before',
  onOrAfter: 'is on or after',
  gt: 'greater than',
  gte: 'greater than or equal',
  lt: 'less than',
  lte: 'less than or equal',
};

/** Operators that stand alone — no value editor is shown for them. */
const VALUELESS_OPERATORS: ReadonlySet<FilterOperator> = new Set(['isEmpty', 'isNotEmpty']);

const TEXT_OPERATORS: FilterOperator[] = [
  'contains',
  'notContains',
  'equals',
  'notEquals',
  'startsWith',
  'endsWith',
  'isEmpty',
  'isNotEmpty',
];

const ENUM_OPERATORS: FilterOperator[] = ['equals', 'notEquals', 'isEmpty', 'isNotEmpty'];

const DATE_OPERATORS: FilterOperator[] = [
  'equals',
  'before',
  'after',
  'onOrBefore',
  'onOrAfter',
  'isEmpty',
  'isNotEmpty',
];

export type FilterValueEditor = 'text' | 'date' | 'select' | 'none';

/** Which operators a column offers, driven by its declared `type`. */
export function operatorsForColumn(column: GridColumn | undefined): FilterOperator[] {
  switch (column?.type as GridColumnType | undefined) {
    case 'badge':
      return ENUM_OPERATORS;
    case 'date':
      return DATE_OPERATORS;
    default:
      return TEXT_OPERATORS;
  }
}

export function operatorNeedsValue(operator: FilterOperator): boolean {
  return !VALUELESS_OPERATORS.has(operator);
}

/** Which value editor to render for a given column+operator combination. */
export function valueEditorFor(
  column: GridColumn | undefined,
  operator: FilterOperator,
): FilterValueEditor {
  if (!operatorNeedsValue(operator)) return 'none';
  if (column?.type === 'date') return 'date';
  if (column?.type === 'badge') return 'select';
  return 'text';
}

// =========================================
//  FACTORIES
// =========================================

let idCounter = 0;
function uid(): string {
  return `f${Date.now().toString(36)}${(idCounter++).toString(36)}`;
}

export function newCondition(column: string, operator: FilterOperator = 'contains'): FilterConditionNode {
  return { id: uid(), kind: 'condition', column, operator, value: '' };
}

export function newGroup(
  combinator: FilterCombinator = 'and',
  rules: FilterNode[] = [],
): FilterGroupNode {
  return { id: uid(), kind: 'group', combinator, rules };
}

/** Deep, id-preserving clone so a panel can edit a draft without mutating state. */
export function cloneFilter(node: FilterGroupNode): FilterGroupNode {
  return JSON.parse(JSON.stringify(node)) as FilterGroupNode;
}

// =========================================
//  INSPECTION
// =========================================

/** Number of leaf conditions anywhere in the tree — drives the "N active" badge. */
export function countConditions(node: FilterNode | null | undefined): number {
  if (!node) return 0;
  if (node.kind === 'condition') return 1;
  return node.rules.reduce((sum, rule) => sum + countConditions(rule), 0);
}

// =========================================
//  EVALUATION
// =========================================

/** True when `row` satisfies the filter tree. An empty/absent tree matches all. */
export function evaluateFilter(
  row: any,
  group: FilterGroupNode | null | undefined,
  columns: GridColumn[],
): boolean {
  if (!group || group.rules.length === 0) return true;

  const results = group.rules.map((rule) =>
    rule.kind === 'group'
      ? evaluateFilter(row, rule, columns)
      : evaluateCondition(row, rule, columns),
  );

  return group.combinator === 'and' ? results.every(Boolean) : results.some(Boolean);
}

function evaluateCondition(row: any, cond: FilterConditionNode, columns: GridColumn[]): boolean {
  const column = columns.find((c) => c.key.toString() === cond.column);
  const raw = row?.[cond.column];
  const op = cond.operator;

  const empty = raw === null || raw === undefined || String(raw).trim() === '';
  if (op === 'isEmpty') return empty;
  if (op === 'isNotEmpty') return !empty;

  // A condition with no value yet is treated as "not constraining" so a
  // half-typed row never blanks the whole grid while the user is building it.
  if (cond.value.trim() === '') return true;

  if (column?.type === 'date') return evaluateDate(raw, op, cond.value);

  const hay = String(raw ?? '').toLowerCase();
  const needle = cond.value.toLowerCase();

  switch (op) {
    case 'contains':
      return hay.includes(needle);
    case 'notContains':
      return !hay.includes(needle);
    case 'equals':
      return hay === needle;
    case 'notEquals':
      return hay !== needle;
    case 'startsWith':
      return hay.startsWith(needle);
    case 'endsWith':
      return hay.endsWith(needle);
    case 'gt':
      return Number(raw) > Number(cond.value);
    case 'gte':
      return Number(raw) >= Number(cond.value);
    case 'lt':
      return Number(raw) < Number(cond.value);
    case 'lte':
      return Number(raw) <= Number(cond.value);
    default:
      return true;
  }
}

/** Day-granularity date compare. `value` comes from a native date input (YYYY-MM-DD). */
function evaluateDate(raw: any, op: FilterOperator, value: string): boolean {
  const rawDay = toDay(raw);
  if (!rawDay) return false;
  const valDay = value.slice(0, 10);

  switch (op) {
    case 'equals':
      return rawDay === valDay;
    case 'before':
      return rawDay < valDay;
    case 'after':
      return rawDay > valDay;
    case 'onOrBefore':
      return rawDay <= valDay;
    case 'onOrAfter':
      return rawDay >= valDay;
    default:
      return true;
  }
}

/** Normalize a raw cell value to a YYYY-MM-DD string for chronological compare. */
function toDay(raw: any): string {
  if (typeof raw === 'string' && /^\d{4}-\d{2}-\d{2}/.test(raw)) {
    return raw.slice(0, 10);
  }
  const d = new Date(raw);
  return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}
