import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-hero',
  template: `
    <section class="bg-paper px-4 py-16 sm:py-20">
      <div class="mx-auto max-w-5xl text-center">
        <h1 class="text-heading-sm font-semibold tracking-tight text-primary-ink sm:text-heading">
          {{ title() }}
        </h1>
        @if (subtitle()) {
          <p class="mx-auto mt-4 max-w-2xl text-body-sm text-mid-gray sm:text-body">
            {{ subtitle() }}
          </p>
        }
      </div>
    </section>
  `,
})
export class PageHeroComponent {
  title = input.required<string>();
  subtitle = input<string>('');
}
