import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-hero',
  templateUrl: './page-hero.html',
})
export class PageHeroComponent {
  title = input.required<string>();
  subtitle = input<string>('');
}
