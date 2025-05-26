# Password Manager Autofill Utilities

A TypeScript library that provides utilities to control password manager autofill behavior across different password managers including 1Password, LastPass, Bitwarden, Dashlane, and browser autocomplete.

## Features

- 🔒 **Universal Support**: Works with all major password managers
- 🎯 **Selective Control**: Target specific password managers or all at once
- ⚛️ **React Ready**: Includes React-specific utilities and patterns
- 🏗️ **Extensible**: Easy to add support for new password managers
- 📦 **Zero Dependencies**: No external dependencies (React is optional peer dependency)
- 🔧 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🛡️ **Type Safe**: Enhanced type safety with specific attribute interfaces
- ⚡ **Error Handling**: Comprehensive error handling with custom error types

## Installation

```bash
npm install password-manager-autofill-utilities
```

## Quick Start

### Basic Usage

```typescript
import { getPasswordManagerPreventionProps } from 'password-manager-autofill-utilities';

// Get attributes to prevent all password managers from autofilling
const preventionProps = getPasswordManagerPreventionProps();

// Use with any HTML input element
<input {...preventionProps} type="text" placeholder="Enter text" />
```

### React Usage

```typescript
import { 
  usePasswordManagerControl, 
  PasswordManagerBehavior 
} from 'password-manager-autofill-utilities';

function MyInput() {
  const attrs = usePasswordManagerControl({
    behavior: PasswordManagerBehavior.IGNORE
  });
  
  return <input {...attrs} type="text" />;
}
```

### Selective Password Manager Control

```typescript
import { 
  getPasswordManagerAttributes,
  PasswordManager,
  PasswordManagerBehavior 
} from 'password-manager-autofill-utilities';

// Only prevent 1Password and LastPass
const attrs = getPasswordManagerAttributes({
  behavior: PasswordManagerBehavior.IGNORE,
  managers: [PasswordManager.ONE_PASSWORD, PasswordManager.LASTPASS]
});
```

## API Reference

### Core Functions

#### `getPasswordManagerAttributes(config)`

Get HTML attributes for controlling password manager behavior.

```typescript
const attrs = getPasswordManagerAttributes({
  behavior: PasswordManagerBehavior.IGNORE,
  managers?: [PasswordManager.ONE_PASSWORD] // Optional: target specific managers
});
```

#### `getPasswordManagerPreventionProps()`

Convenience function to get attributes that prevent all password managers from autofilling.

```typescript
const props = getPasswordManagerPreventionProps();
// Returns: { 'data-1p-ignore': '', 'data-lpignore': 'true', 'autoComplete': 'off', ... }
```

#### `mergeWithPasswordManagerPrevention(existingProps)`

Merge existing props with password manager prevention attributes.

```typescript
const mergedProps = mergeWithPasswordManagerPrevention({
  className: 'my-input',
  placeholder: 'Enter text'
});
```

### React Utilities

#### `usePasswordManagerControl(config)`

React hook that returns password manager attributes.

```typescript
function MyComponent() {
  const attrs = usePasswordManagerControl({
    behavior: PasswordManagerBehavior.IGNORE
  });
  return <input {...attrs} />;
}
```

#### `usePasswordManagerPrevention()`

React hook for the common use case of preventing autofill.

```typescript
function MyComponent() {
  const preventionProps = usePasswordManagerPrevention();
  return <input {...preventionProps} />;
}
```

### Enums

#### `PasswordManager`

- `ONE_PASSWORD` - 1Password
- `LASTPASS` - LastPass  
- `BITWARDEN` - Bitwarden
- `DASHLANE` - Dashlane
- `BROWSER_AUTOCOMPLETE` - Browser autocomplete

#### `PasswordManagerBehavior`

- `IGNORE` - Prevent password manager from interacting with the field
- `ALLOW` - Allow password manager to interact with the field

### Error Handling

The library provides custom error types for better error handling:

```typescript
import { 
  PasswordManagerConfigError, 
  PasswordManagerProviderError 
} from 'password-manager-autofill-utilities';

try {
  getPasswordManagerAttributes({
    behavior: 'invalid' as PasswordManagerBehavior
  });
} catch (error) {
  if (error instanceof PasswordManagerConfigError) {
    console.error('Configuration error:', error.message);
  }
}
```

### Provider System

The library uses a provider system that makes it easy to add support for new password managers:

```typescript
import { BasePasswordManagerProvider, PasswordManager } from 'password-manager-autofill-utilities';

class MyPasswordManagerProvider extends BasePasswordManagerProvider {
  public readonly manager = PasswordManager.MY_MANAGER;
  
  protected getIgnoreAttributes() {
    return { 'data-my-ignore': 'true' };
  }
}
```

## Examples

### Prevent All Password Managers

```typescript
import { getPasswordManagerPreventionProps } from 'password-manager-autofill-utilities';

const MyForm = () => (
  <form>
    <input {...getPasswordManagerPreventionProps()} type="text" />
    <textarea {...getPasswordManagerPreventionProps()} />
  </form>
);
```

### Target Specific Password Managers

```typescript
import { 
  getPasswordManagerAttributes,
  PasswordManager,
  PasswordManagerBehavior 
} from 'password-manager-autofill-utilities';

// Only prevent 1Password
const attrs = getPasswordManagerAttributes({
  behavior: PasswordManagerBehavior.IGNORE,
  managers: [PasswordManager.ONE_PASSWORD]
});
```

### React Component with Props Merging

```typescript
import { mergeWithPasswordManagerPrevention } from 'password-manager-autofill-utilities';

interface InputProps {
  className?: string;
  placeholder?: string;
}

const ProtectedInput = (props: InputProps) => {
  const mergedProps = mergeWithPasswordManagerPrevention(props);
  return <input {...mergedProps} />;
};
```

## TypeScript Support

The library is written in TypeScript and provides comprehensive type definitions:

```typescript
import type { 
  PasswordManagerConfig,
  FormElementProps,
  WithPasswordManagerPrevention,
  PasswordManagerAttributes
} from 'password-manager-autofill-utilities';

// Use types in your own components
interface MyInputProps extends WithPasswordManagerPrevention<{
  label: string;
}> {}
```

## Development

This project uses Bun for package management and includes comprehensive CI/CD pipelines.

### Setup

```bash
# Install dependencies
bun install

# Install example dependencies
bun run example:install
```

### Development Commands

```bash
# Run tests
bun test

# Build the library
bun run build

# Lint code
bun run lint

# Type check
bun run type-check

# Run example app
bun run example:dev

# Full validation (runs all checks)
bun run validate
```

### Example App

The `examples/react-example/` directory contains a comprehensive React application that:
- Validates all library features work correctly
- Tests TypeScript integration
- Ensures React prop compatibility
- Provides visual validation of generated attributes
- Serves as integration test and documentation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.
