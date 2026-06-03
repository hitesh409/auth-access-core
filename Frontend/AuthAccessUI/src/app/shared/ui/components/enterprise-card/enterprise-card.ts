import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CardVariant } from '../../models/card.model';

@Component({
  selector: 'app-enterprise-card',
  standalone: true,
  templateUrl: './enterprise-card.html',
  styleUrl: './enterprise-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterpriseCardComponent {
  variant = input<CardVariant>('default');

  protected readonly classes = computed(() =>
    ['enterprise-card', `enterprise-card--${this.variant()}`].join(' '),
  );
}
