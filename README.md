# Shop Mono - E-commerce Platform

A comprehensive Nx-managed Angular monorepo for an e-commerce platform with storefront and admin applications.

## 🏗️ Architecture

### Apps

- **storefront** - Public shopping interface
- **admin** - Backoffice for catalog and order management

### Libraries

- **shared/ui** - Reusable UI components with Angular Material
- **shared/auth/data-access** - Authentication state, guards, and interceptors
- **shared/utils** - Pure TypeScript utilities (formatters, validators)
- **shared/mocks** - Demo data and types
- **features/cart** - Shopping cart state and components
- **features/catalog** - Product management features

## 🚀 Quick Start

### Prerequisites

- Node.js 20.19.0+ (recommended: 22.12.0+)
- npm 6.11.0+ (recommended: 8.0.0+)

### Installation

```bash
npm install
```

### Development

```bash
# Serve storefront (http://localhost:4200)
npm run serve:storefront

# Serve admin (http://localhost:4201)
npm run serve:admin

# View dependency graph
npm run graph
```

## 🎯 Demo Flow

### Storefront Experience

1. **Browse Products** - View product grid with filtering
2. **Product Details** - Click any product for detailed view
3. **Add to Cart** - Add items with quantity selection
4. **Cart Management** - View cart drawer, update quantities
5. **Checkout** - Simulate order placement (toast notification)

### Admin Experience

1. **Login** - Use `admin@example.com` / `admin`
2. **Dashboard** - View KPIs and overview
3. **Product Management** - CRUD operations on products
4. **Order Management** - View and manage orders

## 🔐 Demo Credentials

| Role     | Email                | Password |
| -------- | -------------------- | -------- |
| Admin    | admin@example.com    | admin    |
| Customer | customer@example.com | customer |

## 🧪 Testing

```bash
# Unit tests
npm run test:storefront
npm run test:admin

# E2E tests
npm run e2e:storefront
npm run e2e:admin

# Affected tests (only changed projects)
npm run affected:test
```

## 📦 Build

```bash
# Build all projects
npm run build:storefront
npm run build:admin

# Build only affected projects
npm run affected:build
```

## 🔍 Linting

```bash
# Lint specific apps
npm run lint:storefront
npm run lint:admin

# Lint affected projects
npm run affected:lint
```

## 🏛️ Dependency Boundaries

The project enforces strict dependency boundaries via ESLint rules:

- **type:utils** → Only depends on other utils
- **type:ui** → Can depend on ui and utils
- **type:data-access** → Can depend on data-access and utils
- **type:feature** → Can depend on features, data-access, ui, and utils

## 🎨 Tech Stack

- **Framework**: Angular 17+ with Standalone APIs
- **Build Tool**: Nx with esbuild
- **Styling**: SCSS + Angular Material + Tailwind CSS
- **Testing**: Jest (unit) + Cypress (e2e)
- **State Management**: Angular Signals
- **HTTP**: Angular HttpClient with interceptors

## 📁 Project Structure

```
shop-mono/
├── apps/
│   ├── storefront/          # Public shopping app
│   └── admin/               # Admin backoffice
├── libs/
│   ├── shared/
│   │   ├── ui/              # Reusable UI components
│   │   ├── auth/data-access/ # Auth state & services
│   │   ├── utils/           # Pure utilities
│   │   └── mocks/           # Demo data
│   └── features/
│       ├── cart/            # Shopping cart
│       └── catalog/         # Product management
└── tools/                   # Build tools & configs
```

## 🔧 Key Features

### Storefront

- Product browsing with search and filters
- Shopping cart with persistent storage
- Product detail views
- Responsive design
- Toast notifications

### Admin

- Protected routes with role-based access
- Product CRUD operations
- Order management
- Dashboard with KPIs
- Material Design interface

### Shared Libraries

- Reusable UI components
- Authentication system
- Utility functions
- Type-safe data models

## 🚦 Available Scripts

| Script             | Description                     |
| ------------------ | ------------------------------- |
| `serve:storefront` | Start storefront dev server     |
| `serve:admin`      | Start admin dev server          |
| `build:storefront` | Build storefront for production |
| `build:admin`      | Build admin for production      |
| `test:storefront`  | Run storefront unit tests       |
| `test:admin`       | Run admin unit tests            |
| `e2e:storefront`   | Run storefront e2e tests        |
| `e2e:admin`        | Run admin e2e tests             |
| `affected:build`   | Build only affected projects    |
| `affected:test`    | Test only affected projects     |
| `affected:lint`    | Lint only affected projects     |
| `graph`            | Open dependency graph           |

## 🎯 Demo Data

The application includes seeded data:

- 12 products across 4 categories
- 3 sample orders
- 2 user accounts (admin/customer)

All data is stored in memory and persists during the session.

## 🔒 Security

- Route guards for admin access
- HTTP interceptors for authentication
- Role-based access control
- Input validation and sanitization

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 768px, 1024px
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🚀 Performance

- Lazy-loaded routes
- OnPush change detection
- Optimized bundle sizes
- Efficient state management with signals

## 🤝 Contributing

1. Follow the established dependency boundaries
2. Write tests for new features
3. Use the provided ESLint configuration
4. Follow Angular style guide
5. Update documentation as needed

## 📄 License

MIT License - see LICENSE file for details.
