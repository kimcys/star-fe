import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar';
import { NAV_LINKS } from '../../nav-links';

describe('NavbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders a link for each entry in NAV_LINKS', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const labels = new Set(
      Array.from(fixture.nativeElement.querySelectorAll('ul a')).map((a: any) => a.textContent?.trim()),
    );
    for (const link of NAV_LINKS) {
      expect(labels.has(link.label)).toBe(true);
    }
  });

  it('starts with the mobile menu closed and toggles it open/closed', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.mobileOpen()).toBe(false);

    fixture.componentInstance.toggleMobile();
    expect(fixture.componentInstance.mobileOpen()).toBe(true);

    fixture.componentInstance.closeMobile();
    expect(fixture.componentInstance.mobileOpen()).toBe(false);
  });
});
