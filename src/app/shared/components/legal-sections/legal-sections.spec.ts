import { TestBed } from '@angular/core/testing';
import { LegalSectionsComponent } from './legal-sections';

describe('LegalSectionsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LegalSectionsComponent] }).compileComponents();
  });

  it('renders each section title and its paragraphs', () => {
    const fixture = TestBed.createComponent(LegalSectionsComponent);
    fixture.componentRef.setInput('sections', [
      { title: '1. Overview', body: ['First paragraph.', 'Second paragraph.'] },
      { title: '2. Cookies', body: ['Cookie paragraph.'] },
    ]);
    fixture.detectChanges();

    const headings: HTMLHeadingElement[] = Array.from(fixture.nativeElement.querySelectorAll('h2'));
    expect(headings.length).toBe(2);
    expect(headings[0].textContent).toContain('1. Overview');
    expect(fixture.nativeElement.textContent).toContain('Second paragraph.');
  });

  it('shows the last-updated line only when provided', () => {
    const fixture = TestBed.createComponent(LegalSectionsComponent);
    fixture.componentRef.setInput('sections', []);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('Last updated');

    fixture.componentRef.setInput('lastUpdated', '26 August 2026');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Last updated: 26 August 2026');
  });
});
