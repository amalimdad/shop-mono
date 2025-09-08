import {
  PriceFormatter,
  DateFormatter,
  Validators,
  StringUtils,
  ArrayUtils,
  NumberUtils,
} from './shared-utils';

describe('Shared Utils', () => {
  describe('PriceFormatter', () => {
    it('should format price correctly', () => {
      const result = PriceFormatter.format(29.99);
      expect(result).toBe('$29.99');
    });

    it('should format price with decimals', () => {
      const result = PriceFormatter.formatWithDecimals(29);
      expect(result).toBe('$29.00');
    });
  });

  describe('DateFormatter', () => {
    it('should format date correctly', () => {
      const date = new Date('2023-01-15');
      const result = DateFormatter.format(date);
      expect(result).toContain('Jan');
      expect(result).toContain('15');
      expect(result).toContain('2023');
    });
  });

  describe('Validators', () => {
    it('should validate email correctly', () => {
      expect(Validators.email('test@example.com')).toBe(true);
      expect(Validators.email('invalid-email')).toBe(false);
    });

    it('should validate required values', () => {
      expect(Validators.required('test')).toBe(true);
      expect(Validators.required('')).toBe(false);
      expect(Validators.required('   ')).toBe(false);
    });
  });

  describe('StringUtils', () => {
    it('should capitalize strings', () => {
      expect(StringUtils.capitalize('hello')).toBe('Hello');
    });

    it('should slugify strings', () => {
      expect(StringUtils.slugify('Hello World!')).toBe('hello-world');
    });
  });

  describe('ArrayUtils', () => {
    it('should remove duplicates', () => {
      const result = ArrayUtils.unique([1, 2, 2, 3, 3]);
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('NumberUtils', () => {
    it('should clamp numbers', () => {
      expect(NumberUtils.clamp(15, 10, 20)).toBe(15);
      expect(NumberUtils.clamp(5, 10, 20)).toBe(10);
      expect(NumberUtils.clamp(25, 10, 20)).toBe(20);
    });
  });
});
