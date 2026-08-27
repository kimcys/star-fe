import { Component, input } from '@angular/core';
import { CardComponent } from '../card/card';

@Component({
  selector: 'app-stat-tile',
  imports: [CardComponent],
  template: `
    <app-card>
      <p class="text-caption text-mid-gray">{{ label() }}</p>
      <p class="mt-1 text-heading-sm font-semibold" [class]="valueClass()">{{ value() }}</p>
    </app-card>
  `,
})
export class StatTileComponent {
  label = input.required<string>();
  value = input.required<number | string>();
  valueClass = input('text-primary-ink');
}
