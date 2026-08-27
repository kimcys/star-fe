import { TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner';

describe('SpinnerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SpinnerComponent] }).compileComponents();
  });

  it('renders with the default size', () => {
    const fixture = TestBed.createComponent(SpinnerComponent);
    fixture.detectChanges();
    const span: HTMLSpanElement = fixture.nativeElement.querySelector('span[role="status"]');
    expect(span).toBeTruthy();
    expect(span.style.width).toBe('32px');
    expect(span.style.height).toBe('32px');
  });

  it('applies a custom size input', () => {
    const fixture = TestBed.createComponent(SpinnerComponent);
    fixture.componentRef.setInput('size', 64);
    fixture.detectChanges();
    const span: HTMLSpanElement = fixture.nativeElement.querySelector('span[role="status"]');
    expect(span.style.width).toBe('64px');
    expect(span.style.height).toBe('64px');
  });
});
