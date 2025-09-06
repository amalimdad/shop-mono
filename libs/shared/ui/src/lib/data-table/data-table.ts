
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {PriceComponent} from '../shared-ui/shared-ui'
import {PillComponent} from '../pill/pill'

@Component({
  selector: 'lib-data-table',
  imports: [MatTableModule, MatPaginatorModule, CommonModule, PriceComponent, PillComponent],

  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTableComponent {
  @Input() dataSource: any[] = [];
  @Input() columns: { key: string; label: string; type?: 'text' | 'price' | 'status' }[] = [];
  @Input() paginated = false;
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Output() pageChange = new EventEmitter<PageEvent>();

  get displayedColumns(): string[] {
    return this.columns.map(col => col.key);
  }

  getValue(element: unknown, key: string): unknown {
    return key.split('.').reduce((obj: unknown, k) => (obj as any)?.[k], element);
  }

  getNumberValue(element: unknown, key: string): number {
    const value = this.getValue(element, key);
    return typeof value === 'number' ? value : 0;
  }

  getStringValue(element: unknown, key: string): string {
    const value = this.getValue(element, key);
    return typeof value === 'string' ? value : '';
  }

  getStatusColor(status: string): 'primary' | 'accent' | 'warn' {
    switch (status?.toLowerCase()) {
      case 'pending': return 'warn';
      case 'paid': return 'primary';
      case 'shipped': return 'accent';
      default: return 'primary';
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }
}
