import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DetailStat } from './detail-stat.model';

@Component({
  selector: 'app-detail-stat-grid',
  standalone: true,
  templateUrl: './detail-stat-grid.html',
  styleUrl: './detail-stat-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailStatGrid {
  readonly items = input<DetailStat[]>([]);
}
