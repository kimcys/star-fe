import { TestBed } from '@angular/core/testing';
import { PageHeroComponent } from './page-hero';

describe('PageHeroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PageHeroComponent] }).compileComponents();
  });

  it('renders the title', () => {
    const fixture = TestBed.createComponent(PageHeroComponent);
    fixture.componentRef.setInput('title', 'About Us');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('About Us');
  });

  it('omits the subtitle when not provided', () => {
    const fixture = TestBed.createComponent(PageHeroComponent);
    fixture.componentRef.setInput('title', 'About Us');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p')).toBeNull();
  });

  it('renders the subtitle when provided', () => {
    const fixture = TestBed.createComponent(PageHeroComponent);
    fixture.componentRef.setInput('title', 'About Us');
    fixture.componentRef.setInput('subtitle', 'Learn more about us.');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('Learn more about us.');
  });
});
