import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '@shopmono/shared-mocks';
import { ProductListComponent } from '@shopmono/features-catalog';
import { CartDrawerComponent } from '@shopmono/features-cart';
import { ToastService } from '@shopmono/shared-ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductListComponent, CartDrawerComponent],
  template: `
    <div class="home-container">
      <lib-product-list
        (addToCart)="onAddToCart($event)"
        (viewDetails)="onViewDetails($event)">
      </lib-product-list>

      <lib-cart-drawer
        [opened]="cartDrawerOpen()"
        (openedChange)="cartDrawerOpen.set($event)"
        (checkout)="onCheckout()">
      </lib-cart-drawer>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
    }
  `]
})
export class HomeComponent {
  cartDrawerOpen = signal(false);

  private router = inject(Router);
  private toastService = inject(ToastService);

  onAddToCart(product: Product): void {
    // This will be handled by the cart store
    this.toastService.success(`${product.name} added to cart!`);
  }

  onViewDetails(product: Product): void {
    this.router.navigate(['/product', product.id]);
  }

  onCheckout(): void {
    this.toastService.success('Order placed successfully!');
    this.cartDrawerOpen.set(false);
  }
}
