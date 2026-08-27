import { Component, input } from '@angular/core';

export interface TableColumn<T> {
  key: string;
  header: string;
  cell: (row: T) => string;
}

@Component({
  selector: 'app-table',
  template: `
    <div class="overflow-x-auto rounded-3xl bg-paper">
      <table class="min-w-full divide-y divide-hairline text-body-sm">
        <thead class="bg-canvas">
          <tr>
            @for (col of columns(); track col.key) {
              <th class="px-4 py-3 text-left font-semibold text-deep-gray">{{ col.header }}</th>
            }
          </tr>
        </thead>
        <tbody class="divide-y divide-hairline">
          @for (row of rows(); track $index) {
            <tr class="hover:bg-cool-wash">
              @for (col of columns(); track col.key) {
                <td class="px-4 py-3 text-primary-ink">{{ col.cell(row) }}</td>
              }
            </tr>
          } @empty {
            <tr>
              <td [attr.colspan]="columns().length" class="px-4 py-8 text-center text-quiet-dot">
                {{ emptyMessage() }}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class TableComponent<T> {
  columns = input.required<TableColumn<T>[]>();
  rows = input.required<T[]>();
  emptyMessage = input('No data available.');
}
