import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-hero',
  template: `
    <section class="bg-slate-900 px-4 py-16 sm:py-20">
      <div class="mx-auto max-w-5xl text-center">
        <h1 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {{ title() }}
        </h1>
        @if (subtitle()) {
          <p class="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
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
