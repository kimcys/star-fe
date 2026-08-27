import { TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle';
import { ThemeService } from '../../../core/services/theme.service';

describe('ThemeToggleComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ThemeToggleComponent] }).compileComponents();
  });

  it('shows a moon icon and calls ThemeService.toggle() on click, in light mode', () => {
    const fixture = TestBed.createComponent(ThemeToggleComponent);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('Switch to dark mode');

    const theme = TestBed.inject(ThemeService);
    const toggleSpy = vi.spyOn(theme, 'toggle');
    button.click();
    expect(toggleSpy).toHaveBeenCalled();
  });

  it('shows a sun icon and the opposite label once switched to dark mode', () => {
    const fixture = TestBed.createComponent(ThemeToggleComponent);
    fixture.detectChanges();
    fixture.componentInstance.theme.toggle();
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('Switch to light mode');
  });
});
