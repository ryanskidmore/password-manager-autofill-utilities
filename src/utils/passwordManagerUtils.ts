import {
  PasswordManager,
  PasswordManagerBehavior,
  PasswordManagerConfig,
  FormElementProps,
  HtmlAttributes,
  PasswordManagerConfigError,
} from '../types';
import {
  getAllPasswordManagerProviders,
  getPasswordManagerProvider,
} from '../managers';

/**
 * Validates a password manager configuration
 * @param config - Configuration to validate
 * @throws Error if configuration is invalid
 */
function validatePasswordManagerConfig(config: PasswordManagerConfig): void {
  if (!config) {
    throw new PasswordManagerConfigError(
      'Password manager configuration is required'
    );
  }

  if (!Object.values(PasswordManagerBehavior).includes(config.behavior)) {
    throw new PasswordManagerConfigError(
      `Invalid password manager behavior: ${config.behavior}. Must be one of: ${Object.values(PasswordManagerBehavior).join(', ')}`
    );
  }

  if (config.managers) {
    if (!Array.isArray(config.managers)) {
      throw new PasswordManagerConfigError(
        'Password managers must be an array'
      );
    }

    if (config.managers.length === 0) {
      throw new PasswordManagerConfigError(
        'Password managers array cannot be empty. Omit the managers property to target all managers.'
      );
    }

    const invalidManagers = config.managers.filter(
      manager => !Object.values(PasswordManager).includes(manager)
    );

    if (invalidManagers.length > 0) {
      throw new PasswordManagerConfigError(
        `Invalid password managers: ${invalidManagers.join(', ')}. Must be one of: ${Object.values(PasswordManager).join(', ')}`
      );
    }
  }
}

/**
 * Get HTML attributes for controlling password manager behavior
 * @param config - Configuration specifying the desired behavior
 * @returns HTML attributes to apply to form elements
 *
 * @example
 * // Prevent all password managers from autofilling
 * const attrs = getPasswordManagerAttributes({
 *   behavior: PasswordManagerBehavior.IGNORE
 * });
 *
 * @example
 * // Prevent only specific password managers
 * const attrs = getPasswordManagerAttributes({
 *   behavior: PasswordManagerBehavior.IGNORE,
 *   managers: [PasswordManager.ONE_PASSWORD, PasswordManager.LASTPASS]
 * });
 */
export function getPasswordManagerAttributes(
  config: PasswordManagerConfig
): FormElementProps {
  validatePasswordManagerConfig(config);

  const { behavior, managers } = config;
  const attributes: HtmlAttributes = {};

  try {
    // If specific managers are provided, only apply to those
    if (managers && managers.length > 0) {
      managers.forEach(manager => {
        try {
          const provider = getPasswordManagerProvider(manager);
          const providerAttrs = provider.getAttributes(behavior);
          Object.assign(attributes, providerAttrs);
        } catch (error) {
          // Log warning but continue with other providers
          console.warn(`Failed to get attributes for ${manager}:`, error);
        }
      });
    } else {
      // Apply to all password managers
      const providers = getAllPasswordManagerProviders();
      providers.forEach(provider => {
        try {
          const providerAttrs = provider.getAttributes(behavior);
          Object.assign(attributes, providerAttrs);
        } catch (error) {
          // Log warning but continue with other providers
          console.warn(
            `Failed to get attributes for ${provider.manager}:`,
            error
          );
        }
      });
    }
  } catch (error) {
    throw new Error(
      `Failed to generate password manager attributes: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }

  return attributes;
}

/**
 * Get attributes to prevent all password managers from autofilling
 * Convenience function for the most common use case
 * @returns HTML attributes to prevent password manager autofill
 *
 * @example
 * <input {...getPasswordManagerPreventionProps()} />
 * <textarea {...getPasswordManagerPreventionProps()} />
 */
export function getPasswordManagerPreventionProps(): FormElementProps {
  return getPasswordManagerAttributes({
    behavior: PasswordManagerBehavior.IGNORE,
  });
}

/**
 * Merge password manager attributes with existing props
 * Useful when you need to preserve existing attributes while adding password manager control
 * @param existingProps - Existing props object
 * @param config - Password manager configuration
 * @returns Merged props with password manager attributes
 *
 * @example
 * const props = mergeWithPasswordManagerAttributes(
 *   { className: "my-input", placeholder: "Enter text" },
 *   { behavior: PasswordManagerBehavior.IGNORE }
 * );
 */
export function mergeWithPasswordManagerAttributes<T extends HtmlAttributes>(
  existingProps: T,
  config: PasswordManagerConfig
): T & FormElementProps {
  const passwordManagerAttrs = getPasswordManagerAttributes(config);
  return {
    ...existingProps,
    ...passwordManagerAttrs,
  };
}

/**
 * Merge password manager prevention attributes with existing props
 * Convenience function for the most common use case
 * @param existingProps - Existing props object
 * @returns Merged props with password manager prevention attributes
 *
 * @example
 * const props = mergeWithPasswordManagerPrevention({
 *   className: "my-input",
 *   placeholder: "Enter text"
 * });
 */
export function mergeWithPasswordManagerPrevention<T extends HtmlAttributes>(
  existingProps: T = {} as T
): T & FormElementProps {
  return mergeWithPasswordManagerAttributes(existingProps, {
    behavior: PasswordManagerBehavior.IGNORE,
  });
}

/**
 * Check if a password manager supports a specific behavior
 * @param manager - The password manager to check
 * @param behavior - The behavior to check for support
 * @returns true if the password manager supports the behavior
 *
 * @example
 * const supportsIgnore = supportsPasswordManagerBehavior(
 *   PasswordManager.ONE_PASSWORD,
 *   PasswordManagerBehavior.IGNORE
 * );
 */
export function supportsPasswordManagerBehavior(
  manager: PasswordManager,
  behavior: PasswordManagerBehavior
): boolean {
  try {
    const provider = getPasswordManagerProvider(manager);
    return provider.supportsBehavior(behavior);
  } catch {
    return false;
  }
}

/**
 * Get all supported password managers
 * @returns Array of all supported password manager identifiers
 */
export function getSupportedPasswordManagers(): PasswordManager[] {
  return Object.values(PasswordManager);
}

/**
 * Get all supported behaviors for a specific password manager
 * @param manager - The password manager to check
 * @returns Array of supported behaviors
 */
export function getSupportedBehaviors(
  manager: PasswordManager
): PasswordManagerBehavior[] {
  try {
    const provider = getPasswordManagerProvider(manager);
    return Object.values(PasswordManagerBehavior).filter(behavior =>
      provider.supportsBehavior(behavior)
    );
  } catch {
    return [];
  }
}
