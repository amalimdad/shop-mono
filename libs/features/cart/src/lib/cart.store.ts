import { Injectable, signal, computed } from '@angular/core';
import { Product } from '@shopmono/shared-mocks';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartStore {
  private readonly _cartState = signal<CartState>({
    items: [],
    total: 0,
    itemCount: 0
  });

  readonly cartState = this._cartState.asReadonly();
  readonly items = computed(() => this._cartState().items);
  readonly total = computed(() => this._cartState().total);
  readonly itemCount = computed(() => this._cartState().itemCount);
  readonly isEmpty = computed(() => this._cartState().items.length === 0);

  constructor() {
    this.loadFromStorage();
  }

  addItem(product: Product, quantity = 1): void {
    const currentItems = this._cartState().items;
    const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);

    let newItems: CartItem[];

    if (existingItemIndex >= 0) {
      // Update existing item
      newItems = currentItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Add new item
      newItems = [...currentItems, { product, quantity }];
    }

    this.updateCart(newItems);
  }

  removeItem(productId: string): void {
    const newItems = this._cartState().items.filter(item => item.product.id !== productId);
    this.updateCart(newItems);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const newItems = this._cartState().items.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );

    this.updateCart(newItems);
  }

  clear(): void {
    this.updateCart([]);
  }

  getItemQuantity(productId: string): number {
    const item = this._cartState().items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }

  isInCart(productId: string): boolean {
    return this._cartState().items.some(item => item.product.id === productId);
  }

  private updateCart(items: CartItem[]): void {
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    this._cartState.set({
      items,
      total,
      itemCount
    });

    this.saveToStorage();
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('cart', JSON.stringify(this._cartState().items));
    } catch (error) {
      console.warn('Failed to save cart to localStorage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        const items: CartItem[] = JSON.parse(stored);
        this.updateCart(items);
      }
    } catch (error) {
      console.warn('Failed to load cart from localStorage:', error);
    }
  }
}
