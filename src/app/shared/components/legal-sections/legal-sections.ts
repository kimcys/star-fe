import { Component, input } from '@angular/core';

export interface LegalSection {
  title: string;
  body: string[];
}

@Component({
  selector: 'app-legal-sections',
  templateUrl: './legal-sections.html',
})
export class LegalSectionsComponent {
  sections = input.required<LegalSection[]>();
  lastUpdated = input<string>('');
}
