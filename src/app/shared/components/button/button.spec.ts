import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from './button';

describe('ButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders a native button by default with the primary variant classes', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.className).toContain('bg-brand-red');
    expect(button.disabled).toBe(false);
  });

  it('disables the button when disabled or loading', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('renders an anchor instead of a button when a link is provided', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('link', '/about');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
  });

  it('applies the sm size classes when requested', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.className).toContain('px-3');
    expect(button.className).toContain('text-caption');
  });
});
