/**
 * Supported password manager behaviors
 */
export enum PasswordManagerBehavior {
  /** Prevent password manager from interacting with the field */
  IGNORE = 'ignore',
  /** Allow password manager to interact with the field (default behavior) */
  ALLOW = 'allow',
}

/**
 * Supported password managers
 */
export enum PasswordManager {
  ONE_PASSWORD = '1password',
  LASTPASS = 'lastpass',
  BITWARDEN = 'bitwarden',
  DASHLANE = 'dashlane',
  BROWSER_AUTOCOMPLETE = 'browser',
}

/**
 * HTML attributes that can be applied to form elements
 * More specific than the generic Record type for better type safety
 */
export type HtmlAttributes = Record<
  string,
  string | boolean | number | undefined
>;

/**
 * Specific password manager attributes for better type safety
 */
export interface PasswordManagerAttributes {
  /** 1Password ignore attribute */
  'data-1p-ignore'?: string;
  /** LastPass ignore attribute */
  'data-lpignore'?: string;
  /** Bitwarden ignore attribute */
  'data-bwignore'?: string;
  /** Dashlane form type attribute */
  'data-form-type'?: string;
  /** Browser autocomplete attribute (React camelCase naming) */
  autoComplete?: 'on' | 'off';
}

/**
 * Configuration for password manager behavior
 */
export interface PasswordManagerConfig {
  /** The behavior to apply */
  behavior: PasswordManagerBehavior;
  /** Specific password managers to target (if not provided, applies to all) */
  managers?: PasswordManager[];
}

/**
 * Interface for password manager implementations
 */
export interface PasswordManagerProvider {
  /** The password manager this provider handles */
  readonly manager: PasswordManager;

  /**
   * Get attributes for the specified behavior
   * @param behavior - The desired behavior
   * @returns HTML attributes to apply
   */
  getAttributes(behavior: PasswordManagerBehavior): HtmlAttributes;

  /**
   * Check if this provider supports the given behavior
   * @param behavior - The behavior to check
   * @returns true if supported
   */
  supportsBehavior(behavior: PasswordManagerBehavior): boolean;
}

/**
 * Props that can be spread onto HTML form elements
 */
export type FormElementProps = HtmlAttributes &
  Partial<PasswordManagerAttributes>;

/**
 * React component props with password manager prevention
 */
export type WithPasswordManagerPrevention<T = {}> = T & FormElementProps;

/**
 * Error thrown when password manager configuration is invalid
 */
export class PasswordManagerConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PasswordManagerConfigError';
  }
}

/**
 * Error thrown when a password manager provider is not found
 */
export class PasswordManagerProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PasswordManagerProviderError';
  }
}
