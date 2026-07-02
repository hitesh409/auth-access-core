import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DetailField } from './detail.field.model';

@Component({
  selector: 'app-detail-field-list',
  standalone: true,
  imports: [],
  templateUrl: './detail-field-list.html',
  styleUrl: './detail-field-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailFieldList {
  readonly fields = input<DetailField[]>([]);
}
