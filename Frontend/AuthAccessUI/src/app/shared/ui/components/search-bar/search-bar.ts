import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { APP_ICONS } from '../../../icons/font-awesome.icons';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar {
  readonly placeholder = input('Search...');
  readonly value = input('');
  readonly valueChange = output<string>();
  protected readonly icon = APP_ICONS;
}
