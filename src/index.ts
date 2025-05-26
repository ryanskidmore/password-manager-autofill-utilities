// Core types and enums
export {
  PasswordManager,
  PasswordManagerBehavior,
  type PasswordManagerConfig,
  type PasswordManagerProvider,
  type HtmlAttributes,
  type FormElementProps,
  type WithPasswordManagerPrevention,
  type PasswordManagerAttributes,
  PasswordManagerConfigError,
  PasswordManagerProviderError,
} from './types';

// Password manager providers
export {
  BasePasswordManagerProvider,
  OnePasswordProvider,
  LastPassProvider,
  BitwardenProvider,
  DashlaneProvider,
  BrowserAutocompleteProvider,
  PASSWORD_MANAGER_PROVIDERS,
  getPasswordManagerProvider,
  getAllPasswordManagerProviders,
} from './managers';

// Core utilities
export {
  getPasswordManagerAttributes,
  getPasswordManagerPreventionProps,
  mergeWithPasswordManagerAttributes,
  mergeWithPasswordManagerPrevention,
  supportsPasswordManagerBehavior,
  getSupportedPasswordManagers,
  getSupportedBehaviors,
} from './utils/passwordManagerUtils';

// React utilities (optional, requires React in consuming app)
export {
  getPasswordManagerControlAttributes,
  getPasswordManagerPreventionAttributes,
  createPasswordManagerControlConfig,
  createPasswordManagerPreventionConfig,
  mergePropsWithPasswordManagerControl,
  mergePropsWithPasswordManagerPrevention,
  usePasswordManagerControl,
  usePasswordManagerPrevention,
} from './utils/reactUtils';

// Backward compatibility exports (matching original API)
export {
  getPasswordManagerPreventionProps as PASSWORD_MANAGER_PREVENTION_ATTRS,
} from './utils/passwordManagerUtils'; 