import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Product, Category, ProductFilters, PRODUCTS, CATEGORIES } from '@shopmono/shared-mocks';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private products = [...PRODUCTS];
  private categories = [...CATEGORIES];

  getProducts(filters?: ProductFilters): Observable<Product[]> {
    let filteredProducts = [...this.products];

    if (filters) {
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p =>
          p.categories.includes(filters.category!)
        );
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.sku.toLowerCase().includes(searchTerm)
        );
      }

      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
      }
    }

    return of(filteredProducts).pipe(delay(300));
  }

  getProduct(id: string): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product).pipe(delay(300));
  }

  getCategories(): Observable<Category[]> {
    return of(this.categories).pipe(delay(300));
  }

  getCategory(slug: string): Observable<Category | undefined> {
    const category = this.categories.find(c => c.slug === slug);
    return of(category).pipe(delay(300));
  }

  searchProducts(query: string): Observable<Product[]> {
    if (!query.trim()) {
      return this.getProducts();
    }

    return this.getProducts({ search: query });
  }

  // Admin methods for CRUD operations
  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: `p${Date.now()}`
    };
    this.products.push(newProduct);
    return of(newProduct).pipe(delay(300));
  }

  updateProduct(id: string, updates: Partial<Product>): Observable<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }

    this.products[index] = { ...this.products[index], ...updates };
    return of(this.products[index]).pipe(delay(300));
  }

  deleteProduct(id: string): Observable<void> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }

    this.products.splice(index, 1);
    return of(undefined).pipe(delay(300));
  }
}
