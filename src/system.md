# Project Structure Documentation

This document provides a comprehensive overview of the React Admin Dashboard project structure, including the purpose and organization of each directory and key files.

## 📁 Complete Folder Structure

```
admin/
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 tsconfig.json
├── 📄 tsconfig.app.json
├── 📄 tsconfig.node.json
├── 📄 vite.config.ts
├── 📄 eslint.config.js
├── 📄 .prettierrc
├── 📄 .prettierignore
├── 📄 .editorconfig
├── 📄 .gitignore
├── 📄 .env
├── 📄 components.json
├── 📄 index.html
├── 📄 README.md
├── 📁 node_modules/
├── 📁 .git/
├── 📁 public/
│   └── 📄 vite.svg
└── 📁 src/
    ├── 📄 main.tsx
    ├── 📄 App.tsx
    ├── 📄 App.css
    ├── 📄 index.css
    ├── 📄 vite-env.d.ts
    ├── 📄 routes.tsx
    ├── 📄 system.md
    ├── 📁 assets/
    │   └── 📄 react.svg
    ├── 📁 components/
    │   ├── 📄 private-router.tsx
    │   ├── 📄 public-router.tsx
    │   └── 📁 ui/
    │       └── 📄 button.tsx
    ├── 📁 configs/
    │   └── 📄 instances.tsx
    ├── 📁 contexts/
    │   └── 📄 auth-context.tsx
    ├── 📁 lib/
    │   └── 📄 utils.ts
    ├── 📁 pages/
    │   ├── 📁 dashboard/
    │   │   └── 📄 page.tsx
    │   ├── 📁 login/
    │   │   └── 📄 page.tsx
    │   └── 📁 role/
    │       └── 📄 page.tsx
    ├── 📁 services/
    │   ├── 📄 auth.service.ts
    │   └── 📄 role.service.ts
    ├── 📁 store/
    │   └── 📄 index.ts
    ├── 📁 types/
    │   ├── 📄 auth.type.ts
    │   ├── 📄 common.type.ts
    │   └── 📄 role.type.ts
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
- `.prettierrc` - Prettier code formatting configuration
- `.prettierignore` - Files to ignore in Prettier formatting
- `.editorconfig` - Editor configuration
- `.gitignore` - Git ignore rules
- `.env` - Environment variables
- `components.json` - Shadcn/UI components configuration

### Build and Entry Files
- `index.html` - Main HTML entry point
- `README.md` - Project documentation

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

### Layout Components
- `layout.tsx` - Main application layout with content area

### Router Components
- `private-router.tsx` - Protected route wrapper for authenticated users
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
- `role/` - Role management pages
  - `page.tsx` - Role management page with table view and search functionality

## src/services/

**Purpose**: Contains service layer files that handle API calls, external integrations, and business logic.

- `auth.service.ts` - Authentication service for API calls
- `role.service.ts` - Role management service with Redux Toolkit Query

## src/store/

**Purpose**: Contains Redux store configuration and state management setup.

- `index.ts` - Redux store configuration and setup

## src/types/

**Purpose**: Contains TypeScript type definitions and interfaces used throughout the application, including reusable generic types and entity-specific definitions.

- `auth.type.ts` - Authentication-related type definitions
- `common.type.ts` - Reusable generic types for pagination and API responses
- `role.type.ts` - Role and permission type definitions

## src/utils/

**Purpose**: Contains utility functions and helpers specific to certain features or domains.

- `auth-storage.ts` - Authentication storage utilities

## public/

**Purpose**: Contains static files that are served directly by the web server and don't require processing.

- `vite.svg` - Vite logo SVG file

## node_modules/

**Purpose**: Contains all installed npm packages and dependencies (auto-generated, not version controlled).

## .git/

**Purpose**: Git version control system directory containing repository metadata and history.

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

1. **Components**: Reusable UI elements
2. **Pages**: Route-level components
3. **Services**: API and business logic
4. **Contexts**: Global state management
5. **Types**: TypeScript definitions
6. **Utils**: Helper functions
7. **Configs**: External service configurations

The structure promotes maintainability, scalability, and code reusability while following React and TypeScript best practices.
