import { TestBed } from '@angular/core/testing';
import { PrivacyPolicyComponent } from './privacy-policy';

describe('PrivacyPolicyComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PrivacyPolicyComponent] }).compileComponents();
  });

  it('renders the hero title and every legal section', () => {
    const fixture = TestBed.createComponent(PrivacyPolicyComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Privacy Policy');
    expect(fixture.nativeElement.querySelectorAll('h2').length).toBe(
      fixture.componentInstance.sections.length,
    );
  });

  it('includes the shared office contact details in the Contact Us section', () => {
    const fixture = TestBed.createComponent(PrivacyPolicyComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('customerservice@thestar.com.my');
  });
});
