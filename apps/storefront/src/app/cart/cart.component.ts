import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartDrawerComponent } from '@shopmono/features-cart';
import { ToastService } from '@shopmono/shared-ui';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartDrawerComponent],
  template: `
    <div class="cart-page">
      <h1>Shopping Cart</h1>
      <lib-cart-drawer
        [opened]="true"
        (checkout)="onCheckout()">
      </lib-cart-drawer>
    </div>
  `,
  styles: [`
    .cart-page {
      padding: 16px;
    }

    .cart-page h1 {
      margin-bottom: 24px;
      color: #333;
    }
  `]
})
export class CartComponent {
  private router = inject(Router);
  private toastService = inject(ToastService);

  onCheckout(): void {
    this.toastService.success('Order placed successfully!');
    this.router.navigate(['/']);
  }
}
