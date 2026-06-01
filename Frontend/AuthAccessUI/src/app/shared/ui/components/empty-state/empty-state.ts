import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  icon = input.required<IconDefinition>();
  title = input.required<string>();
  description = input.required<string>();
}
