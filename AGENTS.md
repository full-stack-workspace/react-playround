# Project Context for AI Agents

This document provides comprehensive context about the react-playround project to enable AI agents to understand the codebase architecture, conventions, and development patterns effectively.

## Project Overview

A modern React development playground focused on testing and validating the Vibe coding workflow. The project is collaboratively maintained by AI coding tools and human developers. It demonstrates a production-ready React application with TypeScript, GraphQL/Relay, multiple styling approaches, and comprehensive testing infrastructure.

**Key Characteristics**:
- **Focus**: Vibe coding workflow validation and AI/human collaboration
- **Build System**: Rsbuild (Rspack-based) for high-performance builds
- **State/Data**: React hooks for local state, Relay for GraphQL data management
- **UI Layer**: Tailwind CSS utilities with Ant Design components
- **Testing**: Vitest + React Testing Library with 70% coverage requirement
- **Type Safety**: Strict TypeScript with generated GraphQL types

## Technology Stack

**Core**: React 19.2.1, TypeScript 5.9.3, pnpm
**Build**: Rsbuild 1.6.14, Rspack, Babel 7.26.0, Relay Compiler 19.0.0
**Data**: React Relay 19.0.0, Relay Runtime 19.0.0, GraphQL 16.9.0
**UI**: Ant Design 6.1.0, Tailwind CSS 3.4.10, SCSS 1.96.0, PostCSS 8.5.6
**Routing**: React Router DOM 6.x
**Testing**: Vitest 2.1.8, React Testing Library 16.1.0, Jest DOM 6.6.3, User Event 14.5.2, jsdom 25.0.1
**Dev Tools**: ESLint 9.0.0, @typescript-eslint 8.0.0, Husky 9.0.0, lint-staged 15.2.0

## Project Structure

```
react-playround/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Header.tsx           # Application header with navigation
│   │   ├── Header.test.tsx      # Header unit tests
│   │   ├── Footer.tsx           # Application footer
│   │   └── PostCard.tsx         # Blog post card component
│   │
│   ├── pages/                   # Route-level components
│   │   ├── Home.tsx             # Landing page with featured posts
│   │   ├── Posts.tsx            # All posts listing with pagination
│   │   ├── ShoppingCart/        # Shopping cart feature module
│   │   │   ├── index.tsx        # Main page component with state
│   │   │   ├── ProductList.tsx  # Product listing with categorization
│   │   │   ├── SearchBar.tsx    # Search and filter controls
│   │   │   ├── interface.ts     # TypeScript interfaces and enums
│   │   │   └── allShoppingCartProducts.tsx  # Mock product data
│   │   └── RelayExample.tsx     # GraphQL/Relay demonstration page
│   │
│   ├── relay/                   # GraphQL configuration
│   │   └── Environment.ts       # Relay Environment setup with mock data
│   │
│   ├── __generated__/           # Auto-generated GraphQL types (DO NOT EDIT)
│   │   └── RelayExampleQuery.graphql.ts
│   │
│   ├── test/                     # Testing infrastructure
│   │   ├── setupTests.ts        # Global test setup and mocks
│   │   └── utils.tsx            # Custom render function and utilities
│   │
│   ├── App.tsx                  # Root component with routing configuration
│   ├── index.tsx                # Application entry point
│   ├── index.css                # Global styles (Tailwind imports)
│   ├── env.d.ts                 # Environment type declarations
│   └── vitest.d.ts              # Vitest type declarations
│
├── public/                      # Static assets
├── rsbuild.config.ts            # Build configuration
├── vitest.config.ts             # Test configuration
├── tsconfig.json                # TypeScript configuration
├── relay.config.json            # Relay compiler configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── eslint.config.js             # ESLint configuration
├── package.json                 # Dependencies and scripts
└── pnpm-lock.yaml               # Locked dependency versions
```

### Directory Patterns

- **components/**: Reusable UI elements, PascalCase naming, all use `React.memo()` with `displayName`
- **pages/**: Route-level components, feature modules contain related components/data/types
- **relay/**: GraphQL configuration, Environment.ts contains network layer and mock data
- **test/**: Shared test utilities, setupTests.ts for global setup, utils.tsx for custom render

## Code Conventions and Patterns

### Component Definition Pattern

**Standard Functional Component**:
```typescript
/**
 * @file Component description
 * @description Detailed description for documentation tools
 */
import React, { memo } from 'react';

interface ComponentNameProps {
  title: string;                    // Required props first
  subtitle?: string;                // Optional props
  onClick?: () => void;            // Callback props
  items: Array<{ id: string; name: string }>;
}

/**
 * @example
 * <ComponentName title="Hello" items={[{id: '1', name: 'Item'}]} />
 */
const ComponentName: React.FC<ComponentNameProps> = memo(({
  title, subtitle, onClick, items
}) => {
  return (
    <div className="component-classes">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
});

ComponentName.displayName = 'ComponentName';
export default ComponentName;
```

**Component with State**:
```typescript
const [state, setState] = useState<StateType>(initialValue);
const handleAction = useCallback((param: ParamType) => {
  // Implementation
}, [dependencies]);
const memoizedValue = useMemo(() => expensiveComputation(), [deps]);
```

### State Management

- **Local State**: React `useState` for component-level state
- **Computed Values**: `useMemo` for expensive calculations
- **Callbacks**: `useCallback` for functions passed as props
- **No Global State**: No Redux/Zustand/Context; state is local or managed by Relay's cache

### Data Fetching with Relay

**Query Pattern**:
```typescript
import { graphql, useLazyLoadQuery } from 'react-relay';
import type { GeneratedQueryType } from '../__generated__/QueryName.graphql';

const data = useLazyLoadQuery<GeneratedQueryType>(
  graphql`
    query QueryName {
      field {
        subfield
      }
    }
  `,
  variables
);
```

**Key Points**:
- Generated types in `src/__generated__/` (pattern: `{QueryName}Query.graphql.ts`)
- NEVER manually edit generated files
- Run `pnpm relay` after query changes
- Wrap Relay components in `Suspense` for loading states
- Environment.ts: `fetchQueryWithMock` for dev, `fetchQuery` for production

### Styling Approach

- **Primary**: Tailwind CSS utility classes (`className="bg-white shadow-md p-6"`)
- **Secondary**: SCSS for complex component-specific styles
- **Components**: Ant Design for form controls and complex UI elements
- **Pattern**: Tailwind for layout/spacing/typography, Ant Design for forms, inline styles only for dynamic values

### TypeScript Patterns

- **Strict Mode**: All strict flags enabled, no implicit `any`, strict null checks
- **No Unused Variables**: `noUnusedLocals` and `noUnusedParameters` enabled (exception: underscore prefix `_unused`)
- **Interface vs Type**: Use `interface` for object shapes/props, `type` for unions/intersections
- **Imports**: Named imports for individual exports, `import type` for type-only imports

### File Organization

- **Feature Modules**: Related files grouped together (e.g., `pages/ShoppingCart/` contains component, types, data)
- **Co-location**: Types, data, and components co-located in feature directories
- **Static Data**: Defined at module level (outside component) to prevent recreation
- **Tests**: `*.test.ts` or `*.test.tsx` alongside source files

## Configuration Files

### rsbuild.config.ts
- React plugin enables JSX, HMR, Fast Refresh
- Babel plugin compiles GraphQL queries via Relay plugin
- Artifacts output to `src/__generated__/`

### vitest.config.ts
- Environment: `jsdom`
- Coverage: 70% minimum (lines, functions, branches, statements)
- Setup: `./src/test/setupTests.ts`
- Path alias: `@` → `./src`

### tsconfig.json
- `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`
- `jsx: "react-jsx"`, `module: "ESNext"`, `moduleResolution: "bundler"`
- Excludes: `node_modules`, `dist`, `__generated__/**`

### relay.config.json
- Schema: `./src/schema.graphql`
- Artifact directory: `./src/__generated__`
- Run `pnpm relay` to compile queries

### eslint.config.js
- TypeScript: warn on unused vars (except `^_`), `any`, non-null assertions
- React: hooks rules enforced, prop-types off (TypeScript handles types)
- Test files: exceptions for `console.log`, `any` type, non-null assertions

## Available Commands

**Development**:
- `pnpm run dev` - Start dev server with HMR (http://localhost:3000)
- `pnpm run build` - Production build (output to `dist/`)
- `pnpm run preview` - Preview production build

**GraphQL/Relay**:
- `pnpm run relay` - Compile GraphQL queries (updates `src/__generated__/`)

**Linting**:
- `pnpm run lint` - Run ESLint
- `pnpm run lint:fix` - Auto-fix ESLint issues

**Testing**:
- `pnpm test` - Run tests in watch mode
- `pnpm test:run` - Run tests once (CI mode)
- `pnpm test:ui` - Run tests with Vitest UI
- `pnpm test:coverage` - Generate coverage report

**Git Hooks**:
- `pnpm prepare` - Install Husky git hooks (runs automatically after install)

## Routing Structure

**Routes** (`src/App.tsx`):
- `/` → Home (landing page with featured posts)
- `/posts` → Posts (all blog posts listing with pagination)
- `/shopping-cart` → ShoppingCart (shopping cart demo with search/filtering)
- `/relay-example` → RelayExample (GraphQL/Relay data fetching demo)

**Navigation** (`src/components/Header.tsx`):
- Uses anchor tags (`<a>`) for navigation
- Links match route paths exactly
- Active state via CSS hover effects

**Setup** (`src/index.tsx`):
- Wrapped in `RelayEnvironmentProvider` and `React.StrictMode`
- Uses `ReactDOM.createRoot()` for concurrent rendering

## Testing Infrastructure

**Framework Stack**:
- Vitest (Jest-compatible API, fast execution)
- React Testing Library (component-centric, user-centric assertions)
- Jest DOM (DOM-specific matchers)
- jsdom (browser environment simulation)

**Test Utilities** (`src/test/utils.tsx`):
- Custom `render()` function provides `BrowserRouter` automatically
- Re-exports all `@testing-library/react` exports
- Utilities: `wait(ms)`, `createMockFunction<T>()`

**Global Setup** (`src/test/setupTests.ts`):
- Extends Vitest expect with Jest DOM matchers
- Mocks: `window.matchMedia`, `IntersectionObserver`, `ResizeObserver`
- Filters console errors/warnings, auto-cleanup after each test

**Test Patterns**:
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/utils';
import Component from './Component';

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component prop="value" />);
    expect(screen.getByText('expected')).toBeInTheDocument();
  });
});
```

**Coverage**: 70% minimum for lines/functions/branches/statements, excludes test files and generated files

## GraphQL and Relay Patterns

**Environment Setup** (`src/relay/Environment.ts`):
```typescript
export const environment = new Environment({
  network: Network.create(fetchQueryWithMock),  // Use fetchQuery for production
  store: new Store(new RecordSource())
});
```

**Mock Data**: 300ms delay simulates network latency, returns users/posts data based on query content

**Query Compilation**:
1. Write GraphQL query with `graphql` tag
2. Run `pnpm relay` to compile
3. Generated types appear in `src/__generated__/`
4. Import generated types for type safety

**Component Integration**:
```typescript
import { Suspense } from 'react';

const PageWithData = () => (
  <Suspense fallback={<LoadingUI />}>
    <DataComponent />
  </Suspense>
);
```

## Mock Data Patterns

**Static Data**: Define at module level (outside component) to prevent recreation on each render
```typescript
// Outside component - created once
export const CONSTANT_DATA = [...];

// Inside component - reference only
const MyComponent = () => {
  const items = CONSTANT_DATA;
};
```

**Example** (`src/pages/ShoppingCart/allShoppingCartProducts.tsx`):
- Product data exported as constant array
- Types defined in co-located `interface.ts`
- Categories as enum

## Development Workflow

**Creating New Pages**:
1. Create page component in `src/pages/PageName/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Header.tsx`
4. Create tests if needed

**Creating New Components**:
1. Create component file in `src/components/`
2. Use `React.FC<Props>` typing, wrap in `React.memo()`, set `displayName`
3. Create test file alongside
4. Add JSDoc comments with `@file`, `@description`, `@example`

**Adding GraphQL Queries**:
1. Write query using `graphql` tag in component
2. Run `pnpm relay` to compile
3. Import generated types
4. Use `useLazyLoadQuery` hook
5. Wrap component in Suspense for loading state

## Important Notes for AI Agents

### DO:
- Follow component patterns (React.FC, memo, displayName)
- Use TypeScript interfaces for all props
- Use Tailwind CSS classes for styling
- Co-locate types and data with related functionality
- Write tests for new components
- Run `pnpm relay` after modifying GraphQL queries
- Use custom render function from `test/utils.tsx`
- Maintain 70% test coverage minimum

### DON'T:
- Manually edit files in `src/__generated__/`
- Use `any` type (use `unknown` or proper types)
- Leave unused variables or parameters
- Skip type annotations on state and props
- Use CSS files when Tailwind classes suffice
- Mix different styling approaches unnecessarily

### Common Patterns:
- Feature modules with co-located types and data
- Memoized components with displayName
- useCallback for callback props
- useMemo for expensive computations
- GraphQL queries compiled to types
- Test files alongside source files
- Custom render with BrowserRouter

### When in Doubt:
- Check existing similar components for patterns
- Review `src/components/Header.tsx` for component structure
- Review `src/pages/ShoppingCart/index.tsx` for state patterns
- Review `src/pages/RelayExample.tsx` for GraphQL patterns
- Review `src/components/Header.test.tsx` for test patterns

## Documentation References

- **Rsbuild**: https://rsbuild.rs/llms.txt
- **Rspack**: https://rspack.rs/llms.txt
- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Relay**: https://relay.dev/
- **Vitest**: https://vitest.dev/
- **React Testing Library**: https://testing-library.com/docs/react-testing-library/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Ant Design**: https://ant.design/components
- **React Router**: https://reactrouter.com/en/main
