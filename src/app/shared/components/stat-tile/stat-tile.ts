import { Component, input } from '@angular/core';
import { CardComponent } from '../card/card';

@Component({
  selector: 'app-stat-tile',
  imports: [CardComponent],
  templateUrl: './stat-tile.html',
})
export class StatTileComponent {
  label = input.required<string>();
  value = input.required<number | string>();
  valueClass = input('text-primary-ink');
}
