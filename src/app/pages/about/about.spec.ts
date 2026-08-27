import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AboutComponent } from './about';

describe('AboutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders a contact detail for each entry', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(fixture.componentInstance.contactDetails.length);
  });

  it('builds an OpenStreetMap embed URL with a marker for the office location', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const iframe: HTMLIFrameElement = fixture.nativeElement.querySelector('iframe');
    expect(iframe.src).toContain('https://www.openstreetmap.org/export/embed.html');
    expect(iframe.src).toContain('marker=');
  });

  it('renders a card for every brand group plus the contact card', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-card').length).toBe(
      fixture.componentInstance.brandGroups.length + 1,
    );
  });
});
