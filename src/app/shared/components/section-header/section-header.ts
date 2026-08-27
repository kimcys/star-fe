import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  host: { class: 'block text-center' },
  template: `
    <h2 class="text-subheading font-semibold text-primary-ink">{{ title() }}</h2>
    @if (subtitle()) {
      <p class="mt-3 text-body-sm text-mid-gray">{{ subtitle() }}</p>
    }
  `,
})
export class SectionHeaderComponent {
  title = input.required<string>();
  subtitle = input('');
}
