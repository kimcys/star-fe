import { TestBed } from '@angular/core/testing';
import { TableColumn, TableComponent } from './table';

interface Row {
  name: string;
}

describe('TableComponent', () => {
  const columns: TableColumn<Row>[] = [{ key: 'name', header: 'Name', cell: (row) => row.name }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TableComponent] }).compileComponents();
  });

  it('renders a header and a row per item', () => {
    const fixture = TestBed.createComponent(TableComponent<Row>);
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('rows', [{ name: 'Alice' }, { name: 'Bob' }]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('th').textContent).toContain('Name');
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(2);
  });

  it('shows the empty message when there are no rows', () => {
    const fixture = TestBed.createComponent(TableComponent<Row>);
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('rows', []);
    fixture.componentRef.setInput('emptyMessage', 'Nothing here.');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Nothing here.');
  });
});
