import { TestBed } from '@angular/core/testing';
import { StatTileComponent } from './stat-tile';

describe('StatTileComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StatTileComponent] }).compileComponents();
  });

  it('renders the label and value', () => {
    const fixture = TestBed.createComponent(StatTileComponent);
    fixture.componentRef.setInput('label', 'Total Records');
    fixture.componentRef.setInput('value', 42);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Total Records');
    expect(fixture.nativeElement.textContent).toContain('42');
  });

  it('defaults the value colour and honours a custom valueClass', () => {
    const fixture = TestBed.createComponent(StatTileComponent);
    fixture.componentRef.setInput('label', 'Declined');
    fixture.componentRef.setInput('value', 3);
    fixture.detectChanges();
    let valueEl: HTMLParagraphElement = fixture.nativeElement.querySelectorAll('p')[1];
    expect(valueEl.className).toContain('text-primary-ink');

    fixture.componentRef.setInput('valueClass', 'text-brand-red');
    fixture.detectChanges();
    valueEl = fixture.nativeElement.querySelectorAll('p')[1];
    expect(valueEl.className).toContain('text-brand-red');
  });
});
