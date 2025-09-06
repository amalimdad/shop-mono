import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Order, ORDERS } from '@shopmono/shared-mocks';
import { LibDataTableComponent } from '@shopmono/shared-ui';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    LibDataTableComponent
  ],
  template: `
    <div class="orders-container">
      <div class="orders-header">
        <h1>Order Management</h1>
      </div>

      <lib-data-table
        [dataSource]="orders()"
        [columns]="columns"
        [paginated]="true"
        [totalItems]="orders().length"
        [pageSize]="10">
      </lib-data-table>
    </div>
  `,
  styles: [`
    .orders-container {
      padding: 16px;
    }

    .orders-header {
      margin-bottom: 24px;
    }

    .orders-header h1 {
      margin: 0;
      color: #333;
    }
  `]
})
export class OrdersComponent implements OnInit {
  orders = signal<Order[]>([]);

  columns = [
    { key: 'id', label: 'Order ID', type: 'text' as const },
    { key: 'items.length', label: 'Items', type: 'text' as const },
    { key: 'total', label: 'Total', type: 'price' as const },
    { key: 'status', label: 'Status', type: 'status' as const }
  ];

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    // In a real app, this would come from a service
    this.orders.set(ORDERS);
  }
}
