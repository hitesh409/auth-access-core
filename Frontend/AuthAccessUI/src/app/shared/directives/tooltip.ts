import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective {
  appTooltip = input.required<string>();

  @HostBinding('attr.title')
  get title(): string {
    return this.appTooltip();
  }
}
