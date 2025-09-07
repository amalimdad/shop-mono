import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { CartStore } from './cart.store';

@Component({
  selector: 'lib-cart-icon',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatBadgeModule, MatButtonModule],
  template: `
    <button mat-icon-button [matBadge]="cartStore.itemCount()"
            matBadgeColor="warn"
            matBadgeSize="small"
            [matBadgeHidden]="cartStore.isEmpty()"
            (click)="onCartClick()">
      <mat-icon>shopping_cart</mat-icon>
    </button>
  `,
  styles: [`
    button {
      color: white;
    }
  `]
})
export class CartIconComponent {
  public cartStore = inject(CartStore)

  onCartClick(): void {
    // This will be handled by the parent component
    // Emit event or use a service to open cart drawer
  }
}
