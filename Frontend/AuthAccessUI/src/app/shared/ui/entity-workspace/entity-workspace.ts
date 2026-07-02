import { ChangeDetectionStrategy, Component, computed, effect, input, signal, untracked } from '@angular/core';

import { ButtonComponent } from '../components/button/button';

import { DetailHeader } from '../components/details/detail-header/detail-header';
import { DetailPanel } from '../components/details/detail-panel/detail-panel';
import { DetailFieldList } from '../components/details/detail-field-list/detail-field-list';
import { ActivityTimeline } from '../components/details/activity-timeline/activity-timeline';
import { DetailStatGrid } from '../components/details/detail-stat-grid/detail-stat-grid';
import { DetailOverview } from '../components/details/detail-overview/detail-overview';

import { EntityWorkspaceTemplate } from './models/entity-workspace-template.model';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { APP_ICONS } from '../../icons/font-awesome.icons';

@Component({
  selector: 'app-entity-workspace',
  standalone: true,
  imports: [
    DetailPanel,
    DetailHeader,
    DetailFieldList,
    ButtonComponent,
    ActivityTimeline,
    DetailStatGrid,
    DetailOverview,
    FontAwesomeModule
],
  templateUrl: './entity-workspace.html',
  styleUrl: './entity-workspace.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityWorkspace<T> {
  readonly icons = APP_ICONS
  readonly entity = input<T | null>(null);

  readonly template = input.required<EntityWorkspaceTemplate<T>>();

  readonly expandedSections = signal<Record<string, boolean>>({});

  readonly pinnedSections = computed(() => this.template().sections.filter((s) => s.pinned));
  readonly scrollableSections = computed(() => this.template().sections.filter((s) => !s.pinned));

  constructor() {
    effect(() => {
      this.entity();
      untracked(() => this.expandedSections.set({}));
    });
  }

  protected toggle(sectionId: string): void {
    this.expandedSections.update((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }));
  }

  protected isExpanded(sectionId: string, defaultExpanded = false): boolean {
    const state = this.expandedSections();

    if (sectionId in state) {
      return state[sectionId];
    }

    return defaultExpanded;
  }
}
