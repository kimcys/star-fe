import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  host: { class: 'block text-center' },
  templateUrl: './section-header.html',
})
export class SectionHeaderComponent {
  title = input.required<string>();
  subtitle = input('');
}
