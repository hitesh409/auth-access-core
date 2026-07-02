import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-detail-section',
  standalone: true,
  templateUrl: './detail-section.html',
  styleUrl: './detail-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailSection {
  readonly title = input.required<string>();
  readonly description = input<string>();
}
