import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../button/button';
import { faDownload, faGear, faGears, faMagnifyingGlass, faRotateRight, faSearch, faSliders, faTableColumns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { APP_ICONS } from '../../../../../icons/font-awesome.icons';
import { TooltipDirective } from '../../../../../directives/tooltip';

@Component({
  selector: 'app-grid-toolbar',
  standalone: true,
  imports: [FormsModule, ButtonComponent, FontAwesomeModule,TooltipDirective],
  templateUrl: './grid-toolbar.html',
  styleUrl: './grid-toolbar.scss',
})
export class GridToolbarComponent {
  search = input('');
  selectedCount = input(0);
  searchChanged = output<string>();
  refresh = output<void>();
  export = output<void>();
  columnVisibility = output<void>();
  protected readonly icons = APP_ICONS;
}
