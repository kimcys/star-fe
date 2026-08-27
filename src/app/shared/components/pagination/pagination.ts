import { Component, computed, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-pagination',
  host: { class: 'block' },
  imports: [ButtonComponent],
  templateUrl: './pagination.html',
})
export class PaginationComponent {
  page = input.required<number>();
  totalItems = input.required<number>();
  pageSize = input.required<number>();

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.pageSize())));
  readonly rangeStart = computed(() => (this.page() - 1) * this.pageSize() + 1);
  readonly rangeEnd = computed(() => Math.min(this.page() * this.pageSize(), this.totalItems()));

  pageChange = output<number>();
}
