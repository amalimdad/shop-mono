import { Component, Input, Output, EventEmitter, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '@shopmono/shared-mocks' ;
import { CatalogService } from './catalog.service';
import { LibAppCardComponent, PriceComponent, StarRatingComponent, LibPillComponent } from '@shopmono/shared-ui';
@Component({
  selector: 'lib-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    LibAppCardComponent,
    PriceComponent,
    StarRatingComponent,
    LibPillComponent
  ],
  template: `
    <div class="product-detail-container">
      <!-- Loading -->
      <div class="loading" *ngIf="loading()">
        <mat-spinner></mat-spinner>
      </div>

      <!-- Product Detail -->
      <div class="product-detail" *ngIf="!loading() && product()">
        <div class="product-image-section">
          <img [src]="product()!.imageUrl" [alt]="product()!.name" class="product-image">
        </div>

        <div class="product-info-section">
          <lib-app-card [title]="product()!.name" [subtitle]="product()!.sku">
            <div class="product-details">
              <p class="product-description">{{ product()!.description }}</p>

              <div class="product-meta">
                <lib-price [price]="product()!.price" cssClass="product-price"></lib-price>
                <lib-star-rating [rating]="4.5" [showText]="true"></lib-star-rating>
              </div>

              <div class="product-categories">
                <h4>Categories:</h4>
                <lib-pill *ngFor="let category of product()!.categories" color="accent">
                  {{ category }}
                </lib-pill>
              </div>

              <div class="inventory-section">
                <div class="inventory" [class.low-stock]="product()!.inventory < 10">
                  <mat-icon>inventory</mat-icon>
                  Stock: {{ product()!.inventory }} units
                </div>
                <div class="sku">
                  <mat-icon>qr_code</mat-icon>
                  SKU: {{ product()!.sku }}
                </div>
              </div>

              <div class="quantity-selector" *ngIf="product()!.inventory > 0">
                <mat-form-field appearance="outline">
                  <mat-label>Quantity</mat-label>
                  <mat-select [value]="selectedQuantity()" (selectionChange)="onQuantityChange($event)">
                    <mat-option *ngFor="let qty of availableQuantities" [value]="qty">
                      {{ qty }}
                    </mat-option>
                  </mat-select>
                </mat-form-field>
              </div>

              <div class="product-actions">
                <button
                  mat-raised-button
                  color="primary"
                  (click)="onAddToCart()"
                  [disabled]="product()!.inventory === 0">
                  <mat-icon>add_shopping_cart</mat-icon>
                  Add to Cart ({{ selectedQuantity() }})
                </button>

                <button
                  mat-button
                  color="warn"
                  (click)="onBack()">
                  <mat-icon>arrow_back</mat-icon>
                  Back to Products
                </button>
              </div>

              <div class="out-of-stock" *ngIf="product()!.inventory === 0">
                <mat-icon color="warn">warning</mat-icon>
                <span>This product is currently out of stock.</span>
              </div>
            </div>
          </lib-app-card>
        </div>
      </div>

      <!-- Not Found -->
      <div class="not-found" *ngIf="!loading() && !product()">
        <mat-icon class="not-found-icon">error_outline</mat-icon>
        <h3>Product not found</h3>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <button mat-raised-button color="primary" (click)="onBack()">
          <mat-icon>arrow_back</mat-icon>
          Back to Products
        </button>
      </div>
    </div>
  `,
  styles: [`
    .product-detail-container {
      padding: 16px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .loading {
      display: flex;
      justify-content: center;
      padding: 48px;
    }

    .product-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      align-items: start;
    }

    .product-image-section {
      position: sticky;
      top: 16px;
    }

    .product-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .product-details {
      padding: 16px;
    }

    .product-description {
      font-size: 16px;
      line-height: 1.6;
      color: #333;
      margin-bottom: 24px;
    }

    .product-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #eee;
    }

    .product-price {
      font-size: 24px;
      font-weight: bold;
      color: #1976d2;
    }

    .product-categories {
      margin-bottom: 24px;
    }

    .product-categories h4 {
      margin-bottom: 8px;
      color: #333;
    }

    .product-categories lib-pill {
      margin-right: 8px;
      margin-bottom: 8px;
    }

    .inventory-section {
      display: flex;
      gap: 24px;
      margin-bottom: 24px;
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }

    .inventory, .sku {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
    }

    .inventory.low-stock {
      color: #f44336;
      font-weight: bold;
    }

    .quantity-selector {
      margin-bottom: 24px;
    }

    .product-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
    }

    .out-of-stock {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
      background-color: #ffebee;
      border-radius: 8px;
      color: #c62828;
    }

    .not-found {
      text-align: center;
      padding: 48px;
      color: #666;
    }

    .not-found-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
    }

    @media (max-width: 768px) {
      .product-detail {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .product-image-section {
        position: static;
      }

      .product-image {
        height: 300px;
      }

      .product-actions {
        flex-direction: column;
      }

      .inventory-section {
        flex-direction: column;
        gap: 12px;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  @Input() productId!: string;
  @Output() addToCart = new EventEmitter<{ product: Product; quantity: number }>();
  @Output() back = new EventEmitter<void>();

  product = signal<Product | null>(null);
  loading = signal(false);
  selectedQuantity = signal(1);

  catalogService = inject(CatalogService);

  status = 0;
  ngOnInit(): void {
    if (this.productId) {
      this.loadProduct();
      // this.status = Status.Empty
    }
  }

  get availableQuantities(): number[] {
    const maxQty = Math.min(this.product()?.inventory || 0, 10);
    return Array.from({ length: maxQty }, (_, i) => i + 1);
  }

  onQuantityChange(event: any): void {
    this.selectedQuantity.set(event.value);
  }

  onAddToCart(): void {
    if (this.product()) {
      this.addToCart.emit({
        product: this.product()!,
        quantity: this.selectedQuantity()
      });
    }
  }

  onBack(): void {
    this.back.emit();
  }

  private loadProduct(): void {
    this.loading.set(true);
    this.catalogService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.product.set(product || null);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
