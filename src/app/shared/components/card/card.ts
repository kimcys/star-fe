import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  host: { class: 'block' },
  templateUrl: './card.html',
})
export class CardComponent {
  padded = input(true);

  classes(): string {
    const padding = this.padded() ? ' p-7' : '';
    return `rounded-3xl bg-paper${padding}`;
  }
}
