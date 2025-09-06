export type Product = {
  id: string;
  sku: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  inventory: number;
  categories: string[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type OrderItem = { productId: string; qty: number; price: number };

export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
};

export const CATEGORIES: Category[] = [
  { id: 'c1', name: 'Electronics', slug: 'electronics' },
  { id: 'c2', name: 'Home', slug: 'home' },
  { id: 'c3', name: 'Fashion', slug: 'fashion' },
  { id: 'c4', name: 'Sports', slug: 'sports' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    sku: 'ELEC-001',
    name: 'Wireless Headphones',
    description: 'Noise-cancelling over-ear wireless headphones.',
    imageUrl: 'https://picsum.photos/seed/1/600/400',
    price: 129.99,
    inventory: 20,
    categories: ['electronics'],
  },
  {
    id: 'p2',
    sku: 'ELEC-002',
    name: 'Smart Watch',
    description: 'Fitness tracking with heart-rate monitor.',
    imageUrl: 'https://picsum.photos/seed/2/600/400',
    price: 199.0,
    inventory: 35,
    categories: ['electronics', 'sports'],
  },
  {
    id: 'p3',
    sku: 'HOME-001',
    name: 'Ceramic Vase',
    description: 'Minimalist decor vase.',
    imageUrl: 'https://picsum.photos/seed/3/600/400',
    price: 39.5,
    inventory: 50,
    categories: ['home'],
  },
  {
    id: 'p4',
    sku: 'HOME-002',
    name: 'LED Desk Lamp',
    description: 'Adjustable brightness desk lamp.',
    imageUrl: 'https://picsum.photos/seed/4/600/400',
    price: 24.99,
    inventory: 60,
    categories: ['home', 'electronics'],
  },
  {
    id: 'p5',
    sku: 'FASH-001',
    name: 'Classic T-Shirt',
    description: '100% cotton, unisex.',
    imageUrl: 'https://picsum.photos/seed/5/600/400',
    price: 19.99,
    inventory: 120,
    categories: ['fashion'],
  },
  {
    id: 'p6',
    sku: 'FASH-002',
    name: 'Running Shoes',
    description: 'Lightweight breathable mesh.',
    imageUrl: 'https://picsum.photos/seed/6/600/400',
    price: 89.0,
    inventory: 40,
    categories: ['fashion', 'sports'],
  },
  {
    id: 'p7',
    sku: 'SPORT-001',
    name: 'Yoga Mat',
    description: 'Non-slip surface, 6mm thickness.',
    imageUrl: 'https://picsum.photos/seed/7/600/400',
    price: 25.0,
    inventory: 80,
    categories: ['sports'],
  },
  {
    id: 'p8',
    sku: 'SPORT-002',
    name: 'Dumbbell Set',
    description: 'Adjustable weight dumbbells.',
    imageUrl: 'https://picsum.photos/seed/8/600/400',
    price: 150.0,
    inventory: 15,
    categories: ['sports'],
  },
  {
    id: 'p9',
    sku: 'ELEC-003',
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof speaker.',
    imageUrl: 'https://picsum.photos/seed/9/600/400',
    price: 59.99,
    inventory: 70,
    categories: ['electronics'],
  },
  {
    id: 'p10',
    sku: 'HOME-003',
    name: 'Aroma Diffuser',
    description: 'Essential oil diffuser with timer.',
    imageUrl: 'https://picsum.photos/seed/10/600/400',
    price: 34.99,
    inventory: 45,
    categories: ['home'],
  },
  {
    id: 'p11',
    sku: 'FASH-003',
    name: 'Denim Jacket',
    description: 'Classic fit denim jacket.',
    imageUrl: 'https://picsum.photos/seed/11/600/400',
    price: 79.99,
    inventory: 25,
    categories: ['fashion'],
  },
  {
    id: 'p12',
    sku: 'ELEC-004',
    name: '4K Action Camera',
    description: 'Ultra HD with waterproof case.',
    imageUrl: 'https://picsum.photos/seed/12/600/400',
    price: 249.0,
    inventory: 18,
    categories: ['electronics', 'sports'],
  },
];

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const ORDERS: Order[] = [
  {
    id: 'o1',
    items: [
      { productId: 'p1', qty: 1, price: 129.99 },
      { productId: 'p3', qty: 2, price: 39.5 },
    ],
    total: 129.99 + 2 * 39.5,
    status: 'paid',
  },
  {
    id: 'o2',
    items: [
      { productId: 'p6', qty: 1, price: 89.0 },
      { productId: 'p7', qty: 1, price: 25.0 },
    ],
    total: 114.0,
    status: 'shipped',
  },
  {
    id: 'o3',
    items: [{ productId: 'p9', qty: 3, price: 59.99 }],
    total: 3 * 59.99,
    status: 'pending',
  },
];
