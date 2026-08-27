import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer';
import { NAV_LINKS } from '../../nav-links';

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders a link for each entry in NAV_LINKS and the current year', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const labels = Array.from(fixture.nativeElement.querySelectorAll('a')).map((a: any) =>
      a.textContent?.trim(),
    );
    for (const link of NAV_LINKS) {
      expect(labels).toContain(link.label);
    }
    expect(fixture.nativeElement.textContent).toContain(String(fixture.componentInstance.year));
  });
});
