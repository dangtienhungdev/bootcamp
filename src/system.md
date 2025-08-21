# Project Structure Documentation

This document provides a comprehensive overview of the React Admin Dashboard project structure, including the purpose and organization of each directory and key files.

## 📁 Complete Folder Structure

```
bootcamp/
├── 📄 .editorconfig
├── 📄 .env
├── 📄 .gitignore
├── 📄 .prettierignore
├── 📄 .prettierrc
├── 📄 components.json
├── 📄 eslint.config.js
├── 📄 hoc.md
├── 📄 index.html
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 README.md
├── 📄 status-code.md
├── 📄 tsconfig.app.json
├── 📄 tsconfig.json
├── 📄 tsconfig.node.json
├── 📄 vite.config.ts
├── 📁 node_modules/
├── 📁 public/
│   └── 📄 vite.svg
└── 📁 src/
    ├── 📄 App.css
    ├── 📄 App.tsx
    ├── 📄 index.css
    ├── 📄 main.tsx
    ├── 📄 routes.tsx
    ├── 📄 system.md
    ├── 📄 vite-env.d.ts
    ├── 📁 assets/
    │   └── 📄 react.svg
    ├── 📁 components/
    │   ├── 📄 private-router.tsx
    │   ├── 📄 protected-router.tsx
    │   ├── 📄 public-router.tsx
    │   └── 📁 ui/
    │       └── 📄 button.tsx
    ├── 📁 configs/
    │   └── 📄 instances.tsx
    ├── 📁 contexts/
    │   └── 📄 auth-context.tsx
    ├── 📁 features/
    │   └── 📄 PostsList.tsx
    ├── 📁 guard/
    │   ├── 📄 permission-guard.tsx
    │   ├── 📄 permissions-guard.ts
    │   ├── 📄 use-current-user-permissions.ts
    │   ├── 📄 with-permission.tsx
    │   └── 📁 demo/
    │       └── 📄 withTimestamp.tsx
    ├── 📁 layout/
    │   ├── 📄 index.ts
    │   ├── 📄 main-layout.tsx
    │   └── 📁 components/
    │       ├── 📄 content.tsx
    │       ├── 📄 header.tsx
    │       └── 📁 sidebar/
    │           ├── 📄 sidebar.css
    │           └── 📄 sidebar.tsx
    ├── 📁 lib/
    │   └── 📄 utils.ts
    ├── 📁 pages/
    │   ├── 📁 categories/
    │   │   ├── 📄 page.tsx
    │   │   └── 📁 components/
    │   │       ├── 📄 CategoryFormDrawer.tsx
    │   │       └── 📄 index.ts
    │   ├── 📁 customers/
    │   │   ├── 📄 page.tsx
    │   │   └── 📁 components/
    │   │       ├── 📄 CustomerDetailDrawer.tsx
    │   │       ├── 📄 CustomerFormDrawer.tsx
    │   │       ├── 📄 index.ts
    │   │       └── 📄 WishlistDrawer.tsx
    │   ├── 📁 dashboard/
    │   │   └── 📄 page.tsx
    │   ├── 📁 demo/
    │   │   └── 📄 page.tsx
    │   ├── 📁 login/
    │   │   └── 📄 page.tsx
    │   ├── 📁 permission/
    │   │   ├── 📄 page.tsx
    │   │   └── 📁 components/
    │   │       └── 📄 create-permission.tsx
    │   ├── 📁 products/
    │   │   └── 📄 page.tsx
    │   ├── 📁 role/
    │   │   ├── 📄 page.tsx
    │   │   └── 📁 components/
    │   │       └── 📄 create-role.tsx
    │   └── 📁 staffs/
    │       └── 📄 page.tsx
    ├── 📁 services/
    │   ├── 📄 auth.service.ts
    │   ├── 📄 category.service.ts
    │   ├── 📄 customer.service.ts
    │   ├── 📄 permission.service.ts
    │   ├── 📄 role.service.ts
    │   ├── 📄 staff.service.ts
    │   └── 📄 upload.service.ts
    ├── 📁 store/
    │   └── 📄 index.ts
    ├── 📁 types/
    │   ├── 📄 auth.type.ts
    │   ├── 📄 category.type.ts
    │   ├── 📄 common.type.ts
    │   ├── 📄 customer.type.ts
    │   ├── 📄 permission.type.ts
    │   ├── 📄 role.type.ts
    │   ├── 📄 staff.type.ts
    │   └── 📄 upload.type.ts
    └── 📁 utils/
        └── 📄 auth-storage.ts
```

## Root Directory

The root directory contains configuration files, dependencies, and the main project structure.

### Configuration Files

- `package.json` - Project dependencies and scripts configuration
- `package-lock.json` - Locked dependency versions
- `tsconfig.json` - TypeScript configuration
- `tsconfig.app.json` - TypeScript configuration for application
- `tsconfig.node.json` - TypeScript configuration for Node.js
- `vite.config.ts` - Vite build tool configuration
- `eslint.config.js` - ESLint code linting configuration
- `components.json` - Shadcn/UI components configuration
- `.editorconfig` - Editor configuration for consistent coding style
- `.env` - Environment variables configuration
- `.gitignore` - Git ignore patterns
- `.prettierignore` - Prettier ignore patterns
- `.prettierrc` - Prettier code formatting configuration

### Documentation Files

- `index.html` - Main HTML entry point
- `README.md` - Project documentation
- `hoc.md` - Higher-Order Components documentation
- `status-code.md` - HTTP status codes documentation

## src/

The main source code directory containing all application logic, components, and assets.

### Core Application Files

- `main.tsx` - Application entry point and React root
- `App.tsx` - Main application component
- `App.css` - Main application styles
- `index.css` - Global CSS styles
- `vite-env.d.ts` - Vite environment type definitions
- `routes.tsx` - Application routing configuration

## src/assets/

**Purpose**: Stores static assets such as images, icons, and other media files used throughout the application.

- `react.svg` - React logo SVG file

## src/components/

**Purpose**: Contains reusable UI components and routing components that can be shared across different parts of the application.

### Router Components

- `private-router.tsx` - Protected route wrapper for authenticated users
- `protected-router.tsx` - Alternative protected route wrapper
- `public-router.tsx` - Public route wrapper for unauthenticated users

### UI Components

- `ui/` - Reusable UI component library
  - `button.tsx` - Custom button component with variants

## src/configs/

**Purpose**: Contains configuration files for external services, API endpoints, and application settings.

- `instances.tsx` - API client instances and configuration

## src/contexts/

**Purpose**: Contains React Context providers for global state management and data sharing across components.

- `auth-context.tsx` - Authentication context for user state management

## src/features/

**Purpose**: Contains feature-specific components that implement business logic and complex functionality.

- `PostsList.tsx` - Posts listing component with data fetching

## src/guard/

**Purpose**: Contains permission and authentication guard components and utilities for access control.

- `permission-guard.tsx` - Component wrapper for permission-based access control
- `permissions-guard.ts` - Permission constants and utilities
- `use-current-user-permissions.ts` - Hook for accessing current user permissions
- `with-permission.tsx` - Higher-order component for permission checking
- `demo/` - Demo guard components
  - `withTimestamp.tsx` - Demo HOC with timestamp functionality

## src/layout/

**Purpose**: Contains layout components and structure for the application UI.

- `index.ts` - Layout exports and configuration
- `main-layout.tsx` - Main application layout component
- `components/` - Layout-specific components
  - `content.tsx` - Main content area component
  - `header.tsx` - Application header component
  - `sidebar/` - Sidebar navigation components
    - `sidebar.css` - Sidebar-specific styles
    - `sidebar.tsx` - Sidebar navigation component

## src/lib/

**Purpose**: Contains utility libraries and helper functions that provide common functionality.

- `utils.ts` - General utility functions and helpers

## src/pages/

**Purpose**: Contains page-level components that represent different routes and views in the application.

### Dashboard Pages

- `dashboard/` - Dashboard-related pages
  - `page.tsx` - Main dashboard page component

### Authentication Pages

- `login/` - Authentication-related pages
  - `page.tsx` - Login page component

### Management Pages

- `categories/` - Category management pages
  - `page.tsx` - Category management page with CRUD operations and form drawer
  - `components/` - Category-specific components
    - `index.ts` - Component exports
    - `CategoryFormDrawer.tsx` - Ant Design drawer component for category CRUD operations with permission guards
- `customers/` - Customer management pages
  - `page.tsx` - Customer management page with CRUD operations and wishlist
  - `components/` - Customer-specific components
    - `index.ts` - Component exports
    - `CustomerFormDrawer.tsx` - Ant Design drawer component for customer CRUD operations with permission guards
    - `CustomerDetailDrawer.tsx` - Drawer component to display customer details with wishlist access
    - `WishlistDrawer.tsx` - Drawer component to display customer wishlist items
- `permission/` - Permission management pages
  - `page.tsx` - Permission management page with table view and search functionality
  - `components/` - Permission-specific components
    - `create-permission.tsx` - Component for creating new permissions
- `products/` - Product management pages
  - `page.tsx` - Product management page with table view and search functionality
- `role/` - Role management pages
  - `page.tsx` - Role management page with table view and search functionality
  - `components/` - Role-specific components
    - `create-role.tsx` - Component for creating new roles
- `staffs/` - Staff management pages
  - `page.tsx` - Staff management page with table view and search functionality

### Demo Pages

- `demo/` - Demo and testing pages
  - `page.tsx` - Demo page for testing components and features

## src/services/

**Purpose**: Contains service layer files that handle API calls, external integrations, and business logic.

- `auth.service.ts` - Authentication service for API calls
- `category.service.ts` - Category management service with Redux Toolkit Query and cache invalidation
- `customer.service.ts` - Customer management service with Redux Toolkit Query and CRUD operations
- `permission.service.ts` - Permission management service with Redux Toolkit Query
- `role.service.ts` - Role management service with Redux Toolkit Query
- `staff.service.ts` - Staff management service with Redux Toolkit Query
- `upload.service.ts` - Image upload service with multipart form data support

## src/store/

**Purpose**: Contains Redux store configuration and state management setup.

- `index.ts` - Redux store configuration and setup

## src/types/

**Purpose**: Contains TypeScript type definitions and interfaces used throughout the application, including reusable generic types and entity-specific definitions.

- `auth.type.ts` - Authentication-related type definitions
- `category.type.ts` - Category type definitions and CRUD operation types
- `common.type.ts` - Reusable generic types for pagination and API responses
- `customer.type.ts` - Customer type definitions and wishlist types
- `permission.type.ts` - Permission type definitions
- `role.type.ts` - Role and permission type definitions
- `staff.type.ts` - Staff type definitions
- `upload.type.ts` - Upload image response and request type definitions

## src/utils/

**Purpose**: Contains utility functions and helpers specific to certain features or domains.

- `auth-storage.ts` - Authentication storage utilities

## public/

**Purpose**: Contains static files that are served directly by the web server and don't require processing.

- `vite.svg` - Vite logo SVG file

## node_modules/

**Purpose**: Contains all installed npm packages and dependencies (auto-generated, not version controlled).

---

## Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Ant Design (antd)
- **Icons**: Lucide React
- **State Management**: Redux Toolkit + React Context
- **Routing**: React Router DOM v7
- **Styling**: CSS + Tailwind CSS
- **Code Quality**: ESLint + Prettier
- **Component Library**: Shadcn/UI

## Architecture Overview

This project follows a modular architecture with clear separation of concerns:

1. **Components**: Reusable UI elements and form components
2. **Pages**: Route-level components with CRUD operations
3. **Services**: API and business logic with RTK Query
4. **Guard**: Permission-based access control system
5. **Layout**: Application structure and navigation
6. **Features**: Business logic components
7. **Contexts**: Global state management
8. **Types**: TypeScript definitions with strong typing
9. **Utils**: Helper functions and utilities
10. **Configs**: External service configurations

The structure promotes maintainability, scalability, and code reusability while following React and TypeScript best practices. The addition of permission guards, layout components, and comprehensive CRUD operations makes this a robust admin dashboard framework.
