import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DetailFieldList } from '../detail-field-list/detail-field-list';
import { DetailField } from '../detail-field-list/detail.field.model';

@Component({
  selector: 'app-detail-overview',
  standalone: true,
  imports: [DetailFieldList],
  templateUrl: './detail-overview.html',
  styleUrl: './detail-overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailOverview {
  readonly fields = input<DetailField[]>([]);
}
