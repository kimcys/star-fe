import { TestBed } from '@angular/core/testing';
import { TermsConditionsComponent } from './terms-conditions';

describe('TermsConditionsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TermsConditionsComponent] }).compileComponents();
  });

  it('renders the hero title and every legal section', () => {
    const fixture = TestBed.createComponent(TermsConditionsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Terms');
    expect(fixture.nativeElement.querySelectorAll('h2').length).toBe(
      fixture.componentInstance.sections.length,
    );
  });

  it('includes the shared office contact details in the Contact Us section', () => {
    const fixture = TestBed.createComponent(TermsConditionsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('customerservice@thestar.com.my');
  });
});
