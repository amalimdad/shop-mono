import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { LibAppCardComponent, PriceComponent } from '@shopmono/shared-ui';
import { PRODUCTS, ORDERS } from '@shopmono/shared-mocks';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    LibAppCardComponent,
    PriceComponent
  ],
  template: `
    <div class="dashboard-container">
      <h1>Admin Dashboard</h1>

      <mat-grid-list cols="4" rowHeight="200" gutterSize="16">
        <mat-grid-tile>
          <lib-app-card title="Total Products" subtitle="Inventory">
            <div class="kpi-content">
              <mat-icon class="kpi-icon">inventory</mat-icon>
              <div class="kpi-value">{{ totalProducts }}</div>
            </div>
          </lib-app-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <lib-app-card title="Total Orders" subtitle="All Time">
            <div class="kpi-content">
              <mat-icon class="kpi-icon">shopping_bag</mat-icon>
              <div class="kpi-value">{{ totalOrders }}</div>
            </div>
          </lib-app-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <lib-app-card title="Revenue" subtitle="This Month">
            <div class="kpi-content">
              <mat-icon class="kpi-icon">attach_money</mat-icon>
              <div class="kpi-value">
                <lib-price [price]="totalRevenue"></lib-price>
              </div>
            </div>
          </lib-app-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <lib-app-card title="Low Stock" subtitle="Items < 10">
            <div class="kpi-content">
              <mat-icon class="kpi-icon warning">warning</mat-icon>
              <div class="kpi-value">{{ lowStockItems }}</div>
            </div>
          </lib-app-card>
        </mat-grid-tile>
      </mat-grid-list>

      <div class="recent-orders">
        <h2>Recent Orders</h2>
        <div class="orders-list">
          <lib-app-card *ngFor="let order of recentOrders" [title]="'Order #' + order.id">
            <div class="order-details">
              <p><strong>Status:</strong> {{ order.status | titlecase }}</p>
              <p><strong>Items:</strong> {{ order.items.length }}</p>
              <p><strong>Total:</strong> <lib-price [price]="order.total"></lib-price></p>
            </div>
          </lib-app-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 16px;
    }

    .dashboard-container h1 {
      margin-bottom: 24px;
      color: #333;
    }

    .kpi-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
    }

    .kpi-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
      color: #1976d2;
    }

    .kpi-icon.warning {
      color: #f44336;
    }

    .kpi-value {
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }

    .recent-orders {
      margin-top: 32px;
    }

    .recent-orders h2 {
      margin-bottom: 16px;
      color: #333;
    }

    .orders-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }

    .order-details p {
      margin: 8px 0;
    }
  `]
})
export class DashboardComponent {
  totalProducts = PRODUCTS.length;
  totalOrders = ORDERS.length;
  totalRevenue = ORDERS.reduce((sum, order) => sum + order.total, 0);
  lowStockItems = PRODUCTS.filter(p => p.inventory < 10).length;
  recentOrders = ORDERS.slice(0, 3);
}
