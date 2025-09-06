import { Component, Input, Output, EventEmitter, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { Product, Category, ProductFilters } from '@shopmono/shared-mocks';
import { CatalogService } from './catalog.service';
import { LibAppCardComponent, PriceComponent, StarRatingComponent, LibPillComponent } from '@shopmono/shared-ui';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'lib-product-list',
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
    MatGridListModule,
    LibAppCardComponent,
    PriceComponent,
    StarRatingComponent,
    LibPillComponent
  ],
  template: `
    <div class="product-list-container">
      <!-- Filters -->
      <div class="filters" *ngIf="showFilters">
        <mat-form-field appearance="outline">
          <mat-label>Search</mat-label>
          <input matInput
                 [value]="searchTerm()"
                 (input)="onSearchChange($event)"
                 placeholder="Search products...">
        </mat-form-field>

        <mat-form-field appearance="outline" *ngIf="categories().length > 0">
          <mat-label>Category</mat-label>
          <mat-select [value]="selectedCategory()" (selectionChange)="onCategoryChange($event)">
            <mat-option value="">All Categories</mat-option>
            <mat-option *ngFor="let category of categories()" [value]="category.slug">
              {{ category.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <!-- Loading -->
      <div class="loading" *ngIf="loading()">
        <mat-spinner></mat-spinner>
      </div>

      <!-- Products Grid -->
      <mat-grid-list cols="3" rowHeight="400" gutterSize="16" *ngIf="!loading()">
        <mat-grid-tile *ngFor="let product of products()">
          <lib-app-card
            [title]="product.name"
            [subtitle]="product.sku"
            [showActions]="true">

            <div class="product-content">
              <img [src]="product.imageUrl" [alt]="product.name" class="product-image">
              <p class="product-description">{{ product.description }}</p>

              <div class="product-meta">
                <lib-price [price]="product.price" cssClass="product-price"></lib-price>
                <lib-star-rating [rating]="4.5" [showText]="true"></lib-star-rating>
              </div>

              <div class="product-categories">
                <lib-pill *ngFor="let category of product.categories" color="accent">
                  {{ category }}
                </lib-pill>
              </div>

              <div class="inventory" [class.low-stock]="product.inventory < 10">
                Stock: {{ product.inventory }}
              </div>
            </div>

            <div slot="actions" class="product-actions">
              <button mat-raised-button color="primary" (click)="onAddToCart(product)">
                <mat-icon>add_shopping_cart</mat-icon>
                Add to Cart
              </button>
              <button mat-button (click)="onViewDetails(product)">
                <mat-icon>visibility</mat-icon>
                View Details
              </button>
            </div>
          </lib-app-card>
        </mat-grid-tile>
      </mat-grid-list>

      <!-- Empty State -->
      <div class="empty-state" *ngIf="!loading() && products().length === 0">
        <mat-icon class="empty-icon">inventory_2</mat-icon>
        <h3>No products found</h3>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    </div>
  `,
  styles: [`
    .product-list-container {
      padding: 16px;
    }

    .filters {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .filters mat-form-field {
      min-width: 200px;
    }

    .loading {
      display: flex;
      justify-content: center;
      padding: 48px;
    }

    .product-content {
      text-align: center;
    }

    .product-image {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 12px;
    }

    .product-description {
      font-size: 14px;
      color: #666;
      margin-bottom: 12px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .product-price {
      font-size: 18px;
      font-weight: bold;
      color: #1976d2;
    }

    .product-categories {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 12px;
    }

    .inventory {
      font-size: 12px;
      color: #666;
      margin-bottom: 12px;
    }

    .inventory.low-stock {
      color: #f44336;
      font-weight: bold;
    }

    .product-actions {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    .empty-state {
      text-align: center;
      padding: 48px;
      color: #666;
    }

    .empty-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
    }

    @media (max-width: 768px) {
      mat-grid-list {
        --mat-grid-list-cols: 1;
      }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      mat-grid-list {
        --mat-grid-list-cols: 2;
      }
    }
  `]
})
export class ProductListComponent implements OnInit {
  @Input() showFilters = true;
  @Input() initialFilters?: ProductFilters;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() viewDetails = new EventEmitter<Product>();

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  loading = signal(false);
  searchTerm = signal('');
  selectedCategory = signal('');

  private searchSubject = new Subject<string>();

  constructor(private catalogService: CatalogService) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchTerm.set(searchTerm);
      this.loadProducts();
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target.value);
  }

  onCategoryChange(event: any): void {
    this.selectedCategory.set(event.value);
    this.loadProducts();
  }

  onAddToCart(product: Product): void {
    this.addToCart.emit(product);
  }

  onViewDetails(product: Product): void {
    this.viewDetails.emit(product);
  }

  private loadProducts(): void {
    this.loading.set(true);

    const filters: ProductFilters = {
      ...this.initialFilters,
      search: this.searchTerm() || undefined,
      category: this.selectedCategory() || undefined
    };

    this.catalogService.getProducts(filters).subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  private loadCategories(): void {
    this.catalogService.getCategories().subscribe(categories => {
      this.categories.set(categories);
    });
  }
}
