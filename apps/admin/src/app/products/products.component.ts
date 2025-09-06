import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Product, PRODUCTS } from '@shopmono/shared-mocks';
import { LibDataTableComponent, ToastService } from '@shopmono/shared-ui';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    LibDataTableComponent
  ],
  template: `
    <div class="products-container">
      <div class="products-header">
        <h1>Product Management</h1>
        <button mat-raised-button color="primary" (click)="createProduct()">
          <mat-icon>add</mat-icon>
          Add Product
        </button>
      </div>

      <lib-data-table
        [dataSource]="products()"
        [columns]="columns"
        [paginated]="true"
        [totalItems]="products().length"
        [pageSize]="10">
      </lib-data-table>
    </div>
  `,
  styles: [`
    .products-container {
      padding: 16px;
    }

    .products-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .products-header h1 {
      margin: 0;
      color: #333;
    }
  `]
})
export class ProductsComponent implements OnInit {
  products = signal<Product[]>([]);

  columns = [
    { key: 'name', label: 'Name', type: 'text' as const },
    { key: 'sku', label: 'SKU', type: 'text' as const },
    { key: 'price', label: 'Price', type: 'price' as const },
    { key: 'inventory', label: 'Stock', type: 'text' as const },
    { key: 'categories', label: 'Categories', type: 'text' as const }
  ];

  constructor(
    private dialog: MatDialog,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  createProduct(): void {
    // TODO: Implement product creation dialog
    this.toastService.success('Product creation dialog would open here');
  }

  private loadProducts(): void {
    // Load products directly from mock data
    this.products.set(PRODUCTS);
  }
}
