import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ActivityTimelineItem } from './activity-timeline-item.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-activity-timeline',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './activity-timeline.html',
  styleUrl: './activity-timeline.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityTimeline {
  readonly items = input<ActivityTimelineItem[]>([]);
}
