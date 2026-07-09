import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../button/button';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { APP_ICONS } from '../../../../../icons/font-awesome.icons';
import { TooltipDirective } from '../../../../../directives/tooltip';
import { GridColumn } from '../../models/grid-column.model';
import { GridColumnPickerComponent } from '../grid-column-picker/grid-column-picker';
import { GridFilterPanelComponent } from '../grid-filter-panel/grid-filter-panel';
import { FilterGroupNode } from '../../models/grid-filter.model';
import { GridDensityService } from '../../../../../../core/layout/grid-density.service';

@Component({
  selector: 'app-grid-toolbar',
  standalone: true,
  imports: [FormsModule, ButtonComponent, FontAwesomeModule, TooltipDirective, GridColumnPickerComponent, GridFilterPanelComponent],
  templateUrl: './grid-toolbar.html',
  styleUrl: './grid-toolbar.scss',
})
export class GridToolbarComponent {
  search = input('');
  selectedCount = input(0);
  searchPlaceholder = input('Search...');
  columns = input<GridColumn[]>([]);
  selectedColumns = input<string[]>([]);
  showColumnPicker = input(false);
  filterable = input(true);
  filterModel = input<FilterGroupNode | null>(null);
  distinctValues = input<Record<string, string[]>>({});
  activeFilterCount = input(0);
  showFilter = input(false);
  searchChanged = output<string>();
  refresh = output<void>();
  export = output<void>();
  columnVisibility = output<void>();
  columnSelectionChanged = output<string[]>();
  filterVisibility = output<void>();
  filterChanged = output<FilterGroupNode | null>();
  protected readonly icons = APP_ICONS;

  private readonly densityService = inject(GridDensityService);
  protected readonly density = this.densityService.density;

  /** Small/medium screens collapse the action icons into this menu. */
  protected readonly toolbarMenuOpen = signal(false);

  protected toggleDensity(): void {
    this.densityService.toggle();
  }

  protected toggleToolbarMenu(): void {
    this.toolbarMenuOpen.update((open) => !open);
  }

  protected onMenuExport(): void {
    this.toolbarMenuOpen.set(false);
    this.export.emit();
  }

  protected onMenuRefresh(): void {
    this.toolbarMenuOpen.set(false);
    this.refresh.emit();
  }
}
