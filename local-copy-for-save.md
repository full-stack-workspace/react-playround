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

### Core Framework
- **React**: 19.2.1 (latest major version with concurrent features)
- **TypeScript**: 5.9.3 (strict mode with comprehensive type checking)
- **Package Manager**: pnpm (efficient disk space usage, fast installs)

### Build and Compilation
- **Rsbuild**: 1.6.14 (modern build tool powered by Rspack)
- **Rspack**: High-performance webpack-compatible bundler
- **Babel**: 7.26.0 (custom transformations via rsbuild-plugin-babel)
- **Relay Compiler**: 19.0.0 (GraphQL query compilation)

### Data Layer
- **React Relay**: 19.0.0 (GraphQL client for React)
- **Relay Runtime**: 19.0.0 (normalized data caching)
- **GraphQL**: 16.9.0 (query language)

### UI Components and Styling
- **Ant Design**: 6.1.0 (comprehensive component library)
- **Tailwind CSS**: 3.4.10 (utility-first CSS framework)
- **SCSS**: 1.96.0 (via @rsbuild/plugin-sass)
- **PostCSS**: 8.5.6 (CSS processing)

### Routing and Navigation
- **React Router DOM**: 6.x (declarative routing)

### Testing Infrastructure
- **Vitest**: 2.1.8 (fast test framework based on Vite)
- **React Testing Library**: 16.1.0 (component testing utilities)
- **Jest DOM**: 6.6.3 (DOM-specific assertions)
- **User Event**: 14.5.2 (user interaction simulation)
- **jsdom**: 25.0.1 (browser environment simulation)
- **Happy DOM**: 15.11.7 (alternative DOM implementation)
- **@vitest/ui**: 2.1.8 (visual test interface)
- **@vitest/coverage-v8**: 2.1.8 (V8 coverage provider)

### Development Tools
- **ESLint**: 9.0.0 (code linting)
- **@typescript-eslint**: 8.0.0 (TypeScript linting rules)
- **Husky**: 9.0.0 (Git hooks)
- **lint-staged**: 15.2.0 (pre-commit linting)

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
│   │   │
│   │   └── RelayExample.tsx     # GraphQL/Relay demonstration page
│   │
│   ├── relay/                   # GraphQL configuration
│   │   └── Environment.ts       # Relay Environment setup with mock data
│   │
│   ├── __generated__/           # Auto-generated GraphQL types (DO NOT EDIT)
│   │   └── RelayExampleQuery.graphql.ts
│   │
│   ├── test/                    # Testing infrastructure
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

**components/**:
- Contains reusable UI elements used across multiple pages
- Each component typically has: source file (.tsx), optional test file (.test.tsx)
- Naming: PascalCase (e.g., `Header.tsx`, `PostCard.tsx`)
- All components use `React.memo()` for performance optimization
- All memoized components set `displayName` for debugging

**pages/**:
- Route-level components that map to URL paths
- Feature modules (like ShoppingCart) contain related components and data
- Complex pages may have internal sub-components defined in same directory
- Data models and interfaces co-located with related functionality

**relay/**:
- GraphQL-specific configuration
- Environment.ts contains network layer setup and mock data
- Query compilation artifacts stored in `__generated__/`

**test/**:
- Shared test utilities and configuration
- setupTests.ts runs before all tests (mocks, global setup)
- utils.tsx provides custom render function with common providers

## Code Conventions and Patterns

### Component Definition Pattern

**Standard Functional Component**:
```typescript
// Always use React.FC for explicit typing
// Always wrap in React.memo() for performance
// Always set displayName for debugging
// Always use TypeScript interfaces for props

/**
 * @file Component description
 * @description Detailed description for documentation tools
 */
import React, { memo } from 'react';

interface ComponentNameProps {
  // Required props first
  title: string;
  // Optional props with default handling
  subtitle?: string;
  // Callback props
  onClick?: () => void;
  // Complex prop types
  items: Array<{ id: string; name: string }>;
}

/**
 * @example
 * <ComponentName title="Hello" items={[{id: '1', name: 'Item'}]} />
 */
const ComponentName: React.FC<ComponentNameProps> = memo(({ 
  title, 
  subtitle,
  onClick,
  items 
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

**Component with Internal State**:
```typescript
// Use useState for component-level state
// Use useCallback for callback functions to maintain referential equality
// Use useMemo for expensive computed values
// Always type state explicitly

const [state, setState] = useState<StateType>(initialValue);

const handleAction = useCallback((param: ParamType) => {
  // Implementation
}, [dependencies]);
```

### State Management Approach

**Local Component State**:
- React `useState` for component-level state
- State updates trigger re-renders
- State colocated with component using it

**Computed Values**:
- `useMemo` for expensive calculations
- Dependencies array controls when recomputation occurs
- Example: filtering lists, derived data

**Callback Stability**:
- `useCallback` for functions passed as props
- Prevents unnecessary re-renders of child components
- Critical for performance optimization

**No Global State Library**:
- Currently no Redux, Zustand, or Context for global state
- All state is either local or managed by Relay's normalized cache
- Simpler architecture, less boilerplate

### Data Fetching with Relay

**Query Definition**:
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

**GraphQL Types**:
- Generated automatically by Relay Compiler
- Stored in `src/__generated__/` directory
- Types follow pattern: `{QueryName}Query.graphql.ts`
- NEVER manually edit generated files

**Environment Configuration**:
- `src/relay/Environment.ts` defines the Relay Environment
- Network layer handles GraphQL requests
- Mock data function (`fetchQueryWithMock`) used for development
- To use real GraphQL: uncomment Authorization header, point to real API

**Suspense Integration**:
- Relay components wrapped in `Suspense` for loading states
- Fallback prop provides loading UI
- Automatic loading state management

### Styling Approach

**Primary: Tailwind CSS**:
- Utility-first CSS framework
- Classes applied via `className` prop
- Responsive design with mobile-first breakpoints
- Example: `className="bg-white shadow-md p-6 hover:shadow-lg transition-shadow"`

**Secondary: SCSS**:
- Available via @rsbuild/plugin-sass
- For complex component-specific styles
- File extension: `.scss` or `.module.scss`

**Ant Design Components**:
- Used for complex UI elements (Input, Button, Checkbox, etc.)
- Imported directly from 'antd'
- Styled via Ant Design theming (minimal custom overrides)

**Styling Patterns**:
- Tailwind for layout, spacing, typography, colors
- Ant Design for form controls, complex components
- Inline styles only for dynamic values (e.g., `style={{ width: progress }}`)

### TypeScript Patterns

**Strict Mode Enabled**:
- All strict flags in tsconfig.json are enabled
- No implicit any types
- Strict null checks
- Strict function types

**No Unused Variables**:
- `noUnusedLocals: true` - errors on unused local variables
- `noUnusedParameters: true` - errors on unused function parameters
- Exception: underscore prefix (e.g., `_unusedParam`) allowed
- Exception: test files have more relaxed rules

**Interface vs Type**:
- Use `interface` for object shapes and prop types
- Use `type` for unions, intersections, primitive aliases
- Export interfaces from dedicated `interface.ts` files in feature directories

**Import Patterns**:
- Named imports for individual exports
- Default imports for main module exports
- Type-only imports with `import type` (TypeScript 5.0+)

### File Organization Patterns

**Feature Modules**:
- Related files grouped in same directory
- Example: `pages/ShoppingCart/` contains:
  - `index.tsx` (main component)
  - `ProductList.tsx` (child component)
  - `SearchBar.tsx` (child component)
  - `interface.ts` (types)
  - `allShoppingCartProducts.tsx` (data)

**Type Co-location**:
- Types defined near where they're used
- Feature-specific types in feature directory
- Shared types in common location or co-located

**Data Co-location**:
- Static data defined outside component (module level)
- Prevents recreation on each render
- Example: mock data arrays, constant configurations

**Test Co-location**:
- Test files alongside source files
- Naming: `*.test.ts` or `*.test.tsx`
- Setup files in `src/test/` directory

## Configuration Files

### rsbuild.config.ts

**Purpose**: Build tool configuration for Rsbuild

**Key Configuration**:
```typescript
// React plugin enables JSX, HMR, Fast Refresh
plugins: [pluginReact()]

// Babel plugin with custom configuration
pluginBabel({
  babelLoaderOptions: {
    plugins: [
      ['relay', { artifactDirectory: './src/__generated__' }]
    ]
  }
})
```

**Special Notes**:
- Relay Babel plugin compiles GraphQL queries to artifacts
- Artifacts output to `src/__generated__/` directory
- Supports HMR for rapid development
- Production builds optimized automatically

### vitest.config.ts

**Purpose**: Test runner configuration

**Key Configuration**:
```typescript
// Test environment
environment: 'jsdom'

// File patterns
include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}']
exclude: ['node_modules', 'dist', '__generated__/**']

// Global setup
setupFiles: ['./src/test/setupTests.ts']

// Coverage configuration
coverage: {
  provider: 'v8',
  thresholds: { lines: 70, functions: 70, branches: 70, statements: 70 },
  exclude: ['node_modules/', 'src/test/', '**/*.d.ts', '__generated__/**']
}

// Path alias
resolve: { alias: { '@': path.resolve(__dirname, './src') } }
```

**Coverage Requirements**:
- 70% minimum for lines, functions, branches, statements
- Coverage reports generated in `coverage/` directory
- Test commands: `test:run`, `test:ui`, `test:coverage`

### tsconfig.json

**Purpose**: TypeScript compiler options

**Key Configuration**:
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "skipLibCheck": true,
    "verbatimModuleSyntax": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true
  },
  "include": ["src", "vitest.config.ts", "src/vitest.d.ts"],
  "exclude": ["node_modules", "dist", "__generated__/**"]
}
```

**Important Rules**:
- `strict: true` enables all strict type checking
- `noUnusedLocals/Parameters` catches dead code
- `noEmit` only type-checks (build handled by Rsbuild)
- `ESNext` modules with `bundler` resolution for modern tooling

### relay.config.json

**Purpose**: Relay Compiler configuration

**Configuration**:
```json
{
  "src": "./src",
  "schema": "./src/schema.graphql",
  "language": "typescript",
  "artifactDirectory": "./src/__generated__",
  "eagerEsModules": true
}
```

**Key Points**:
- `schema` points to GraphQL schema file
- `artifactDirectory` defines generated type output
- `eagerEsModules` enables ES module imports
- Run `pnpm relay` to compile queries

### tailwind.config.js

**Purpose**: Tailwind CSS configuration

**Configuration**:
```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: { extend: {} },
  plugins: []
}
```

**Key Points**:
- Scans all source files for class names
- Default theme (no customization in this project)
- No custom plugins configured

### eslint.config.js

**Purpose**: Code linting rules

**Key Rules**:
```javascript
// TypeScript
'@typescript-eslint/no-unused-vars': ['warn', {
  argsIgnorePattern: '^_',
  varsIgnorePattern: '^_'
}]
'@typescript-eslint/no-explicit-any': 'warn'
'@typescript-eslint/no-non-null-assertion': 'warn'

// React
'react/react-in-jsx-scope': 'off'  // React 17+
'react/prop-types': 'off'          // TypeScript handles types
'react-hooks/rules-of-hooks': 'error'
'react-hooks/exhaustive-deps': 'warn'

// General
'no-console': ['warn', { allow: ['warn', 'error'] }]
'prefer-const': 'warn'
```

**Test File Exceptions**:
- Test files can use `console.log`
- Test files can use `any` type
- Test files can use non-null assertions

## Available Commands

### Development Commands
```bash
pnpm run dev          # Start development server with HMR
                      # Opens http://localhost:3000
                      # Supports hot module replacement

pnpm run build        # Production build
                      # Output to dist/ directory
                      # Optimized and minified

pnpm run preview      # Preview production build locally
                      # Serves dist/ directory
                      # Useful to test production build
```

### GraphQL/Relay Commands
```bash
pnpm run relay        # Compile GraphQL queries
                      # Updates src/__generated__/
                      # Required after query changes
```

### Linting Commands
```bash
pnpm run lint         # Run ESLint
                      # Checks all .ts, .tsx files
                      # Reports issues

pnpm run lint:fix     # Run ESLint with auto-fix
                      # Fixes fixable issues
                      # Requires review for changes
```

### Testing Commands
```bash
pnpm test             # Run tests in watch mode
                      # Re-runs on file changes
                      # Interactive test selection

pnpm test:run         # Run tests once (CI mode)
                      # No watch mode
                      # Returns exit code

pnpm test:ui          # Run tests with Vitest UI
                      # Visual interface
                      # Browse test results

pnpm test:watch       # Run tests in watch mode
                      # Waits for file changes
                      # Manual control

pnpm test:coverage    # Generate coverage report
                      # Outputs to coverage/ directory
                      # Checks against thresholds
```

### Git Hooks
```bash
pnpm prepare          # Install Husky git hooks
                      # Runs automatically after install
                      # Enables pre-commit linting
```

## Routing Structure

### Route Definitions

**Location**: `src/App.tsx`

**Route Map**:
```typescript
// Route configuration in App.tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/posts" element={<Posts />} />
  <Route path="/shopping-cart" element={<ShoppingCart />} />
  <Route path="/relay-example" element={<RelayExample />} />
</Routes>
```

**Route Details**:

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page with featured posts and Teek branding |
| `/posts` | Posts | All blog posts listing with pagination |
| `/shopping-cart` | ShoppingCart | Shopping cart demo with search and filtering |
| `/relay-example` | RelayExample | GraphQL/Relay data fetching demonstration |

### Navigation Component

**Location**: `src/components/Header.tsx`

**Implementation**:
- Uses anchor tags (`<a>`) for navigation
- Links match route paths exactly
- Active state via CSS (hover effects)
- No client-side routing hook usage (simple anchor tags)

### Router Setup

**Location**: `src/App.tsx`

**Pattern**:
- Wrapped in `BrowserRouter` (aliased as Router)
- Routes component defines all routes
- Route elements are page components
- No nested routes currently implemented

**Entry Point**: `src/index.tsx`
- Wraps App in `RelayEnvironmentProvider`
- Wraps in `React.StrictMode`
- Uses `ReactDOM.createRoot()` for concurrent rendering

## Testing Infrastructure

### Test Framework Stack

**Framework**: Vitest
- Vite-native test runner
- Jest-compatible API
- Fast execution with worker threads
- Built-in watch mode

**Renderer**: React Testing Library
- Component-centric testing
- User-centric assertions
- No testing implementation details
- Accessible by role, text, label

**Assertions**: Jest DOM
- `toBeInTheDocument()`
- `toHaveTextContent()`
- `toHaveAttribute()`
- `toHaveClass()`

**Environment**: jsdom
- Simulates browser DOM
- Lightweight alternative to real browser
- Sufficient for unit tests

### Test Utilities

**Custom Render Function**: `src/test/utils.tsx`
```typescript
// Provides BrowserRouter automatically
// Includes all common providers
// Usage: render(<Component />) instead of rtlRender()

export { customRender as render }
// Re-exports all @testing-library/react exports
```

**Global Setup**: `src/test/setupTests.ts`
- Imports `@testing-library/jest-dom`
- Extends Vitest expect with matchers
- Mocks `window.matchMedia`
- Mocks `IntersectionObserver`
- Mocks `ResizeObserver`
- Filters console errors/warnings
- Auto-cleansup after each test

**Wait Utility**: `src/test/utils.tsx`
```typescript
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
```

**Mock Function**: `src/test/utils.tsx`
```typescript
export const createMockFunction = <T extends (...args: any[]) => any>(
  implementation?: T
) => vi.fn(implementation);
```

### Test File Patterns

**Naming Conventions**:
- `*.test.ts` - Unit tests
- `*.test.tsx` - Component tests
- `*.spec.ts` - Alternative naming
- Location: Alongside source files

**Test Structure**:
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/utils';
import Component from './Component';

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component prop="value" />);
    expect(screen.getByText('expected')).toBeInTheDocument();
  });

  it('should handle interactions', async () => {
    const user = userEvent.setup();
    render(<Component />);
    await user.click(screen.getByRole('button'));
    // assertions
  });
});
```

**Coverage Requirements**:
- Minimum 70% for: lines, functions, branches, statements
- Excludes: node_modules, test files, generated files, config files
- Reports generated in `coverage/` directory
- Enforced in CI/CD pipeline

### Mock Examples

**Component Mock**:
```typescript
// Simple component mock for testing parents
const MockComponent = () => <div>Mock</div>;
```

**Function Mock**:
```typescript
const handleClick = vi.fn();
render(<Component onClick={handleClick} />);
fireEvent.click(screen.getByRole('button'));
expect(handleClick).toHaveBeenCalledTimes(1);
```

**API Mock** (in tests):
- Use `vi.spyOn()` to mock module functions
- Use `vi.mock()` to mock modules (requires hoisting)
- Return mock data for async operations

## GraphQL and Relay Patterns

### Relay Environment Setup

**Location**: `src/relay/Environment.ts`

**Configuration**:
```typescript
export const environment = new Environment({
  network: Network.create(fetchQueryWithMock),
  store: new Store(new RecordSource())
});
```

**Network Layer Options**:
1. `fetchQuery` - Real GraphQL API calls
   - Points to `https://api.github.com/graphql`
   - Requires Authorization header (commented out)
   - Replace with actual GraphQL server

2. `fetchQueryWithMock` - Development mock data
   - Returns Promise resolving after 300ms delay
   - Simulates users and posts data
   - Used for development without real API

**Mock Data Structure**:
```typescript
const mockUsers = [
  { id: '1', name: 'Alice', email: 'alice@example.com', avatar: null }
];

const mockPosts = [
  {
    id: '1',
    title: 'Hello Relay',
    content: 'Sample post content',
    author: { id: '1', name: 'Alice', email: 'alice@example.com' },
    createdAt: new Date().toISOString()
  }
];
```

### Query Definition

**Pattern**:
```typescript
import { graphql, useLazyLoadQuery } from 'react-relay';

const data = useLazyLoadQuery<QueryType>(
  graphql`
    query QueryName($variable: Type!) {
      field(arg: $variable) {
        subfield
      }
    }
  `,
  { variable: value }
);
```

**Compilation Process**:
1. Write GraphQL query with `graphql` tag
2. Run `pnpm relay` to compile
3. Generated types appear in `src/__generated__/`
4. Import generated types for type safety

### Generated Types

**Location**: `src/__generated__/`

**Naming Pattern**: `{QueryName}Query.graphql.ts`

**Usage**:
```typescript
import type { RelayExampleQuery } from '../__generated__/RelayExampleQuery.graphql';

const data = useLazyLoadQuery<RelayExampleQuery>(graphql`...`, {});
```

**Important**:
- NEVER manually edit generated files
- Re-run `pnpm relay` after query changes
- Include in version control (generated artifacts)

### Component Integration

**With Suspense**:
```typescript
import { Suspense } from 'react';

const PageWithData = () => (
  <Suspense fallback={<LoadingUI />}>
    <DataComponent />
  </Suspense>
);
```

**Query in Component**:
```typescript
const Component = () => {
  const data = useLazyLoadQuery<QueryType>(query, variables);
  return <div>{data.field}</div>;
};
```

## Mock Data Patterns

### Static Data in Modules

**Pattern**: Define data at module level (outside component)
```typescript
// Outside component - created once
const CONSTANT_DATA = [...];

// Inside component - reference only
const MyComponent = () => {
  const items = CONSTANT_DATA; // No recreation
};
```

**Benefits**:
- No recreation on each render
- Better memory efficiency
- Clearer code structure

### Shopping Cart Example

**Location**: `src/pages/ShoppingCart/allShoppingCartProducts.tsx`

**Data Structure**:
```typescript
export const allShoppingCartProducts: ProductItem[] = [
  {
    id: '001',
    name: 'Apple',
    category: Category.FreshFruit,
    price: 8.5,
    stock: 100,
    description: 'Fresh red apples from Fuji'
  },
  // ... more products
];

// Type definition in interface.ts
export interface ProductItem {
  id: string;
  name: string;
  category: Category;
  price: number;
  stock: number;
  description?: string;
}

export enum Category {
  FreshFruit = '新鲜水果',
  MeatEggs = '肉禽蛋',
  Vegetables = '蔬菜',
  Others = '其他'
}
```

### Mock API Responses

**Pattern**: Async function returning Promise
```typescript
async function fetchData(): Promise<MockData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ /* data */ });
    }, 300);
  });
}
```

**Relay Mock** (in Environment.ts):
- 300ms delay simulates network latency
- Checks operation text to determine data to return
- Conditional responses based on query content

## Development Workflow

### Creating New Pages

1. Create page component in `src/pages/PageName/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Header.tsx`
4. Create tests if needed
5. Commit changes

### Creating New Components

1. Create component file in `src/components/`
2. Use `React.FC<Props>` typing
3. Wrap in `React.memo()`
4. Set `displayName`
5. Create test file alongside
6. Add JSDoc comments with `@file`, `@description`, `@example`

### Adding GraphQL Queries

1. Write query using `graphql` tag in component
2. Run `pnpm relay` to compile
3. Import generated types
4. Use `useLazyLoadQuery` hook
5. Wrap component in Suspense for loading state

### Running Tests

```bash
# All tests
pnpm test:run

# With coverage
pnpm test:coverage

# UI mode
pnpm test:ui
```

### Building for Production

```bash
pnpm run build
# Output in dist/ directory
```

## Important Notes for AI Agents

### DO:
- Follow the established component patterns (React.FC, memo, displayName)
- Use TypeScript interfaces for all props
- Use Tailwind CSS classes for styling
- Co-locate types and data with related functionality
- Write tests for new components
- Run `pnpm relay` after modifying GraphQL queries
- Use the custom render function from `test/utils.tsx`
- Maintain 70% test coverage minimum

### DON'T:
- Manually edit files in `src/__generated__/`
- Use `any` type (use `unknown` or proper types)
- Leave unused variables or parameters
- Use JavaScript-only imports in TypeScript files
- Skip type annotations on state and props
- Use CSS files when Tailwind classes suffice
- Mix different styling approaches unnecessarily

### Common Patterns to Follow:
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
