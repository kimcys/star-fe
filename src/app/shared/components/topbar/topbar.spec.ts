import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar';

@Component({
  template: `
    <app-topbar>
      <span class="row-content">Row</span>
      <ng-container ngProjectAs="[below]">
        <span class="below-content">Below</span>
      </ng-container>
    </app-topbar>
  `,
  imports: [TopbarComponent],
})
class HostComponent {}

describe('TopbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
  });

  it('renders a sticky header wrapping the default-slot content', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const header: HTMLElement = fixture.nativeElement.querySelector('header');
    expect(header.className).toContain('sticky');
    expect(header.querySelector('.row-content')).toBeTruthy();
  });

  it('projects [below] content inside the header', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const header: HTMLElement = fixture.nativeElement.querySelector('header');
    expect(header.querySelector('.below-content')).toBeTruthy();
  });
});
