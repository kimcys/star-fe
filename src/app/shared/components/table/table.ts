import { Component, input } from '@angular/core';

export interface TableColumn<T> {
  key: string;
  header: string;
  cell: (row: T) => string;
}

@Component({
  selector: 'app-table',
  template: `
    <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table class="min-w-full divide-y divide-slate-200 text-sm">
        <thead class="bg-slate-50">
          <tr>
            @for (col of columns(); track col.key) {
              <th class="px-4 py-3 text-left font-semibold text-slate-600">{{ col.header }}</th>
            }
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          @for (row of rows(); track $index) {
            <tr class="hover:bg-slate-50">
              @for (col of columns(); track col.key) {
                <td class="px-4 py-3 text-slate-700">{{ col.cell(row) }}</td>
              }
            </tr>
          } @empty {
            <tr>
              <td [attr.colspan]="columns().length" class="px-4 py-8 text-center text-slate-400">
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
