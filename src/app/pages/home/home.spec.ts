import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the hero heading and a card per feature', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain(
      'Welcome to Star Media Group',
    );
    expect(fixture.nativeElement.querySelectorAll('app-card').length).toBe(
      fixture.componentInstance.features.length,
    );
  });

  it('lists every brand', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const items = Array.from(fixture.nativeElement.querySelectorAll('li')).map((li: any) =>
      li.textContent?.trim(),
    );
    for (const brand of fixture.componentInstance.brands) {
      expect(items).toContain(brand);
    }
  });
});
