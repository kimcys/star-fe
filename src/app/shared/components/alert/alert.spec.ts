import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AlertComponent, AlertTone } from './alert';

@Component({
  template: `<app-alert [tone]="tone">Something happened</app-alert>`,
  imports: [AlertComponent],
})
class HostComponent {
  tone: AlertTone = 'info';
}

describe('AlertComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
  });

  it('defaults to the info tone and renders projected content', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const div: HTMLDivElement = fixture.nativeElement.querySelector('[role="alert"]');
    expect(div.className).toContain('bg-canvas');
    expect(div.textContent).toContain('Something happened');
  });

  it('applies error tone classes', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.tone = 'error';
    fixture.detectChanges();
    const div: HTMLDivElement = fixture.nativeElement.querySelector('[role="alert"]');
    expect(div.className).toContain('bg-red-50');
  });
});
