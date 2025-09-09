import {
  PRODUCTS,
  CATEGORIES,
  ORDERS,
  Product,
  Category,
  Order,
} from './shared-mocks';

describe('Shared Mocks', () => {
  describe('PRODUCTS', () => {
    it('should have correct structure', () => {
      expect(PRODUCTS).toBeDefined();
      expect(Array.isArray(PRODUCTS)).toBe(true);
      expect(PRODUCTS.length).toBeGreaterThan(0);

      const product = PRODUCTS[0];
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('sku');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('inventory');
    });

    it('should have valid product data', () => {
      PRODUCTS.forEach((product) => {
        expect(typeof product.id).toBe('string');
        expect(typeof product.name).toBe('string');
        expect(typeof product.price).toBe('number');
        expect(product.price).toBeGreaterThan(0);
        expect(typeof product.inventory).toBe('number');
        expect(product.inventory).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('CATEGORIES', () => {
    it('should have correct structure', () => {
      expect(CATEGORIES).toBeDefined();
      expect(Array.isArray(CATEGORIES)).toBe(true);
      expect(CATEGORIES.length).toBeGreaterThan(0);

      const category = CATEGORIES[0];
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('slug');
    });

    it('should have unique slugs', () => {
      const slugs = CATEGORIES.map((cat) => cat.slug);
      const uniqueSlugs = [...new Set(slugs)];
      expect(slugs.length).toBe(uniqueSlugs.length);
    });
  });

  describe('ORDERS', () => {
    it('should have correct structure', () => {
      expect(ORDERS).toBeDefined();
      expect(Array.isArray(ORDERS)).toBe(true);
      expect(ORDERS.length).toBeGreaterThan(0);

      const order = ORDERS[0];
      expect(order).toHaveProperty('id');
      expect(order).toHaveProperty('items');
      expect(order).toHaveProperty('total');
      expect(order).toHaveProperty('status');
    });

    it('should have valid order totals', () => {
      ORDERS.forEach((order) => {
        expect(typeof order.total).toBe('number');
        expect(order.total).toBeGreaterThan(0);
        expect(order.items.length).toBeGreaterThan(0);
      });
    });
  });
});
