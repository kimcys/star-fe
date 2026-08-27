import { Component, input } from '@angular/core';

export interface TableColumn<T> {
  key: string;
  header: string;
  cell: (row: T) => string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
})
export class TableComponent<T> {
  columns = input.required<TableColumn<T>[]>();
  rows = input.required<T[]>();
  emptyMessage = input('No data available.');
}
