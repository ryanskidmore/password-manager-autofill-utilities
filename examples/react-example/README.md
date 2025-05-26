# Password Manager Autofill Utilities - React Example

This is a comprehensive React example application that demonstrates and validates the `password-manager-autofill-utilities` library.

## Purpose

This example serves multiple purposes:

1. **Integration Testing**: Validates that the library works correctly with React
2. **Type Safety Validation**: Ensures TypeScript types are properly exported and usable
3. **React Compatibility**: Tests that all props can be spread onto React components without warnings
4. **Feature Demonstration**: Shows all library features in action
5. **Regression Prevention**: Catches compatibility issues during development

## Features Tested

### Core Functions

- `getPasswordManagerAttributes()` - with various configurations
- `getPasswordManagerPreventionProps()` - convenience function
- `mergeWithPasswordManagerPrevention()` - prop merging

### React Utilities

- `usePasswordManagerControl()` - React hook with configuration
- `usePasswordManagerPrevention()` - React hook for prevention
- `mergePropsWithPasswordManagerPrevention()` - React-specific prop merging

### Type Safety

- All TypeScript types and interfaces
- Enum usage and validation
- Proper prop spreading without type errors

### React Integration

- Component prop spreading
- Hook usage patterns
- Form integration examples

## Running the Example

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Type check
bun run type-check

# Lint code
bun run lint
```

## What to Look For

When running this example, you should see:

1. **No TypeScript Errors**: All imports and types should resolve correctly
2. **No React Warnings**: Props should spread without React warnings about unknown attributes
3. **Correct Attributes**: Inspect the DOM to see that password manager attributes are correctly applied
4. **Interactive Controls**: Use the controls to test different configurations
5. **JSON Output**: See the actual attributes being generated for each configuration

## Validation

This example is automatically built and type-checked as part of the library's validation process. If any compatibility issues are introduced, the build will fail, preventing regressions.

The example tests:

- ✅ Library imports work correctly
- ✅ TypeScript types are properly exported
- ✅ React props spread without warnings
- ✅ All functions return correct attribute objects
- ✅ Hooks work in React components
- ✅ Error handling works as expected
