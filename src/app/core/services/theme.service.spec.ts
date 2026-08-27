import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

// The constructor's `effect()` that toggles the <html> class doesn't run
// synchronously on injection — it's flushed as part of Angular's own
// change detection, so `ApplicationRef.tick()` is needed to observe it
// deterministically outside of a component fixture.
function flushEffects(): void {
  TestBed.inject(ApplicationRef).tick();
}

describe('ThemeService', () => {
  it('defaults to light when there is no stored preference and no system dark preference', () => {
    const service = TestBed.inject(ThemeService);
    flushEffects();
    expect(service.theme()).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('uses a previously stored preference over the system default', () => {
    localStorage.setItem('star-media-theme', 'dark');
    const service = TestBed.inject(ThemeService);
    flushEffects();
    expect(service.theme()).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggle() flips the theme, persists it, and updates the <html> class', () => {
    const service = TestBed.inject(ThemeService);
    flushEffects();
    expect(service.theme()).toBe('light');

    service.toggle();
    flushEffects();
    expect(service.theme()).toBe('dark');
    expect(localStorage.getItem('star-media-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    service.toggle();
    flushEffects();
    expect(service.theme()).toBe('light');
    expect(localStorage.getItem('star-media-theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
