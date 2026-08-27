import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormFieldComponent } from './form-field';

@Component({
  template: `<app-form-field [label]="label" [error]="error"><input /></app-form-field>`,
  imports: [FormFieldComponent],
})
class HostComponent {
  label = 'Username';
  error = '';
}

describe('FormFieldComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
  });

  it('renders the label and the projected control', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const span: HTMLSpanElement = fixture.nativeElement.querySelector('span');
    expect(span.textContent).toContain('Username');
    expect(fixture.nativeElement.querySelector('input')).toBeTruthy();
  });

  it('hides the error message when empty', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const spans: HTMLSpanElement[] = Array.from(fixture.nativeElement.querySelectorAll('span'));
    expect(spans.length).toBe(1);
  });

  it('shows the error message when provided', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.error = 'Required';
    fixture.detectChanges();
    const spans: HTMLSpanElement[] = Array.from(fixture.nativeElement.querySelectorAll('span'));
    expect(spans.some((s) => s.textContent?.includes('Required'))).toBe(true);
  });
});
