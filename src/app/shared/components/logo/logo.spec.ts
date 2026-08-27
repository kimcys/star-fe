import { TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo';

describe('LogoComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LogoComponent] }).compileComponents();
  });

  it('renders the logo image with a default height class', () => {
    const fixture = TestBed.createComponent(LogoComponent);
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toContain('star-logo-mark.png');
    expect(img.className).toContain('h-9');
  });

  it('applies a custom heightClass input', () => {
    const fixture = TestBed.createComponent(LogoComponent);
    fixture.componentRef.setInput('heightClass', 'h-8');
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.className).toContain('h-8');
    expect(img.className).not.toContain('h-9');
  });
});
