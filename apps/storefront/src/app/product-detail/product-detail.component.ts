import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@shopmono/shared-mocks';
import { ProductDetailComponent as LibProductDetailComponent } from '@shopmono/features-catalog';
import { CartStore } from '@shopmono/features-cart';
import { ToastService } from '@shopmono/shared-ui';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, LibProductDetailComponent],
  template: `
    <lib-product-detail
      [productId]="productId()"
      (addToCart)="onAddToCart($event)"
      (back)="onBack()">
    </lib-product-detail>
  `
})
export class ProductDetailComponent implements OnInit {
  productId = signal('');

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cartStore = inject(CartStore);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId.set(params['id']);
    });
  }

  onAddToCart(event: { product: Product; quantity: number }): void {
    this.cartStore.addItem(event.product, event.quantity);
    this.toastService.success(`${event.product.name} added to cart!`);
  }

  onBack(): void {
    this.router.navigate(['/']);
  }

}
export enum StatusEnum {
  PENDING = 1,
  EMPTY = 0,
  SHIPPED = 2
}
