import { Component, input } from '@angular/core';

export interface LegalSection {
  title: string;
  body: string[];
}

@Component({
  selector: 'app-legal-sections',
  template: `
    <section class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      @if (lastUpdated()) {
        <p class="mb-8 text-caption text-mid-gray">Last updated: {{ lastUpdated() }}</p>
      }
      <div class="space-y-10">
        @for (section of sections(); track section.title) {
          <div>
            <h2 class="text-body-lg font-semibold text-primary-ink">{{ section.title }}</h2>
            @for (paragraph of section.body; track paragraph) {
              <p class="mt-3 text-body-sm leading-relaxed text-mid-gray">{{ paragraph }}</p>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class LegalSectionsComponent {
  sections = input.required<LegalSection[]>();
  lastUpdated = input<string>('');
}
