import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PaginationComponent } from './pagination';

describe('PaginationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function create(page: number, totalItems: number, pageSize = 10) {
    const fixture = TestBed.createComponent(PaginationComponent);
    fixture.componentRef.setInput('page', page);
    fixture.componentRef.setInput('totalItems', totalItems);
    fixture.componentRef.setInput('pageSize', pageSize);
    fixture.detectChanges();
    return fixture;
  }

  it('renders nothing when there are no items', () => {
    const fixture = create(1, 0);
    expect(fixture.nativeElement.querySelector('div')).toBeNull();
  });

  it('disables Previous on the first page and enables Next', () => {
    const fixture = create(1, 25);
    const buttons: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('button'));
    expect(buttons[0].disabled).toBe(true);
    expect(buttons[1].disabled).toBe(false);
  });

  it('disables Next on the last page', () => {
    const fixture = create(3, 25);
    const buttons: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('button'));
    expect(buttons[0].disabled).toBe(false);
    expect(buttons[1].disabled).toBe(true);
  });

  it('emits pageChange with the next page number on click', () => {
    const fixture = create(1, 25);
    const emitted: number[] = [];
    fixture.componentInstance.pageChange.subscribe((p) => emitted.push(p));
    const buttons: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('button'));
    buttons[1].click();
    expect(emitted).toEqual([2]);
  });
});
