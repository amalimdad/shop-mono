import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CartStore, CartItem } from './cart.store';
import { PriceComponent, LibPillComponent } from '@shopmono/shared-ui';

@Component({
  selector: 'lib-cart-drawer',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatChipsModule,
    PriceComponent,
    LibPillComponent
  ],
  template: `
    <mat-sidenav-container class="cart-drawer-container">
      <mat-sidenav #cartDrawer
                   mode="over"
                   position="end"
                   [opened]="opened"
                   (openedChange)="onOpenedChange($event)"
                   class="cart-sidenav">

        <div class="cart-header">
          <h2>Shopping Cart</h2>
          <button mat-icon-button (click)="close()">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <mat-divider></mat-divider>

        <div class="cart-content">
          <!-- Empty Cart -->
          <div class="empty-cart" *ngIf="cartStore.isEmpty()">
            <mat-icon class="empty-icon">shopping_cart</mat-icon>
            <h3>Your cart is empty</h3>
            <p>Add some products to get started!</p>
          </div>

          <!-- Cart Items -->
          <div class="cart-items" *ngIf="!cartStore.isEmpty()">
            <div class="cart-item" *ngFor="let item of cartStore.items()">
              <mat-card class="item-card">
                <div class="item-content">
                  <img [src]="item.product.imageUrl"
                       [alt]="item.product.name"
                       class="item-image">

                  <div class="item-details">
                    <h4 class="item-name">{{ item.product.name }}</h4>
                    <p class="item-sku">{{ item.product.sku }}</p>

                    <div class="item-price">
                      <lib-price [price]="item.product.price"></lib-price>
                    </div>

                    <div class="item-categories">
                      <lib-pill *ngFor="let category of item.product.categories"
                                color="accent"
                                [disabled]="true">
                        {{ category }}
                      </lib-pill>
                    </div>
                  </div>

                  <div class="item-actions">
                    <div class="quantity-controls">
                      <button mat-icon-button
                              (click)="decreaseQuantity(item.product.id)"
                              [disabled]="item.quantity <= 1">
                        <mat-icon>remove</mat-icon>
                      </button>

                      <span class="quantity">{{ item.quantity }}</span>

                      <button mat-icon-button
                              (click)="increaseQuantity(item.product.id)"
                              [disabled]="item.quantity >= item.product.inventory">
                        <mat-icon>add</mat-icon>
                      </button>
                    </div>

                    <div class="item-total">
                      <lib-price [price]="item.product.price * item.quantity"></lib-price>
                    </div>

                    <button mat-icon-button
                            color="warn"
                            (click)="removeItem(item.product.id)"
                            class="remove-button">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </div>
              </mat-card>
            </div>
          </div>
        </div>

        <!-- Cart Footer -->
        <div class="cart-footer" *ngIf="!cartStore.isEmpty()">
          <mat-divider></mat-divider>

          <div class="cart-summary">
            <div class="summary-row">
              <span>Items ({{ cartStore.itemCount() }}):</span>
              <lib-price [price]="cartStore.total()"></lib-price>
            </div>

            <div class="summary-row total">
              <span>Total:</span>
              <lib-price [price]="cartStore.total()" cssClass="total-price"></lib-price>
            </div>
          </div>

          <div class="cart-actions">
            <button mat-raised-button
                    color="primary"
                    class="checkout-button"
                    (click)="onCheckout()">
              <mat-icon>shopping_bag</mat-icon>
              Checkout
            </button>

            <button mat-button
                    (click)="clearCart()"
                    class="clear-button">
              <mat-icon>clear_all</mat-icon>
              Clear Cart
            </button>
          </div>
        </div>
      </mat-sidenav>
    </mat-sidenav-container>
  `,
  styles: [`
    .cart-drawer-container {
      position: fixed;
      top: 0;
      right: 0;
      width: 400px;
      height: 100vh;
      z-index: 1000;
    }

    .cart-sidenav {
      width: 400px;
      display: flex;
      flex-direction: column;
    }

    .cart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background-color: #f5f5f5;
    }

    .cart-header h2 {
      margin: 0;
      color: #333;
    }

    .cart-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }

    .empty-cart {
      text-align: center;
      padding: 48px 16px;
      color: #666;
    }

    .empty-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .item-card {
      margin: 0;
    }

    .item-content {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .item-image {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 8px;
    }

    .item-details {
      flex: 1;
    }

    .item-name {
      margin: 0 0 4px 0;
      font-size: 14px;
      font-weight: 500;
    }

    .item-sku {
      margin: 0 0 8px 0;
      font-size: 12px;
      color: #666;
    }

    .item-price {
      margin-bottom: 8px;
    }

    .item-categories {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }

    .item-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 4px;
    }

    .quantity {
      min-width: 24px;
      text-align: center;
      font-weight: 500;
    }

    .item-total {
      font-weight: bold;
      color: #1976d2;
    }

    .remove-button {
      color: #f44336;
    }

    .cart-footer {
      background-color: #f5f5f5;
      padding: 16px;
    }

    .cart-summary {
      margin-bottom: 16px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .summary-row.total {
      font-weight: bold;
      font-size: 18px;
      border-top: 1px solid #ddd;
      padding-top: 8px;
    }

    .total-price {
      color: #1976d2;
    }

    .cart-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .checkout-button {
      width: 100%;
    }

    .clear-button {
      width: 100%;
    }

    @media (max-width: 480px) {
      .cart-drawer-container {
        width: 100vw;
      }

      .cart-sidenav {
        width: 100vw;
      }
    }
  `]
})
export class CartDrawerComponent {
  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() checkout = new EventEmitter<void>();

  constructor(public cartStore: CartStore) {}

  close(): void {
    this.openedChange.emit(false);
  }

  onOpenedChange(opened: boolean): void {
    this.openedChange.emit(opened);
  }

  increaseQuantity(productId: string): void {
    const item = this.cartStore.items().find(i => i.product.id === productId);
    if (item) {
      this.cartStore.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: string): void {
    const item = this.cartStore.items().find(i => i.product.id === productId);
    if (item) {
      this.cartStore.updateQuantity(productId, item.quantity - 1);
    }
  }

  removeItem(productId: string): void {
    this.cartStore.removeItem(productId);
  }

  clearCart(): void {
    this.cartStore.clear();
  }

  onCheckout(): void {
    this.checkout.emit();
  }
}
