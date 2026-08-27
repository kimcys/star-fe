import { TestBed } from '@angular/core/testing';
import { InputComponent } from './input';

describe('InputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [InputComponent] }).compileComponents();
  });

  it('renders the type and value passed in', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentRef.setInput('type', 'password');
    fixture.componentRef.setInput('value', 'secret');
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe('password');
    expect(input.value).toBe('secret');
  });

  it('emits valueChange on user input', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const emitted: string[] = [];
    fixture.componentInstance.valueChange.subscribe((v) => emitted.push(v));

    input.value = 'hello';
    input.dispatchEvent(new Event('input'));

    expect(emitted).toEqual(['hello']);
  });
});
