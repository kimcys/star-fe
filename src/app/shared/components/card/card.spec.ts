import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CardComponent } from './card';

@Component({
  template: `<app-card [padded]="padded"><p>Hello</p></app-card>`,
  imports: [CardComponent],
})
class HostComponent {
  padded = true;
}

describe('CardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
  });

  it('renders projected content with padding by default', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const div: HTMLDivElement = fixture.nativeElement.querySelector('div');
    expect(div.className).toContain('p-7');
    expect(div.textContent).toContain('Hello');
  });

  it('omits padding when padded is false', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.padded = false;
    fixture.detectChanges();
    const div: HTMLDivElement = fixture.nativeElement.querySelector('div');
    expect(div.className).not.toContain('p-7');
  });
});
