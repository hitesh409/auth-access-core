import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { AccordionItem } from './accordion-item.model';
import { APP_ICONS } from '../../../icons/font-awesome.icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from "../button/button";

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [FontAwesomeModule, ButtonComponent],
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Accordion {
  readonly items = input.required<AccordionItem[]>();
  readonly activeId = input<string | null>(null);
  readonly activeIdChange = output<string>();
  readonly icons = APP_ICONS;

  protected toggle(id: string): void {
    if (this.activeId() === id) {
      return;
    }
    this.activeIdChange.emit(id);
  }
}
