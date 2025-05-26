import {
  PasswordManagerConfig,
  PasswordManagerBehavior,
  FormElementProps,
} from '../types';
import {
  getPasswordManagerAttributes,
  getPasswordManagerPreventionProps,
} from './passwordManagerUtils';

/**
 * Get password manager attributes for use in React components
 * This function can be used in React hooks when React is available
 * @param config - Password manager configuration
 * @returns HTML attributes to spread onto form elements
 *
 * @example
 * // In a React component:
 * function MyInput() {
 *   const attrs = getPasswordManagerControlAttributes({
 *     behavior: PasswordManagerBehavior.IGNORE
 *   });
 *   return <input {...attrs} />;
 * }
 */
export function getPasswordManagerControlAttributes(
  config: PasswordManagerConfig
): FormElementProps {
  return getPasswordManagerAttributes(config);
}

/**
 * Get password manager prevention attributes for use in React components
 * Convenience function for the most common use case
 * @returns HTML attributes to prevent password manager autofill
 *
 * @example
 * // In a React component:
 * function MyInput() {
 *   const preventionProps = getPasswordManagerPreventionAttributes();
 *   return <input {...preventionProps} />;
 * }
 */
export function getPasswordManagerPreventionAttributes(): FormElementProps {
  return getPasswordManagerPreventionProps();
}

/**
 * Create configuration object for password manager control HOCs
 * This can be used with custom HOC implementations
 * @param config - Password manager configuration
 * @returns Configuration object with attributes
 *
 * @example
 * const controlConfig = createPasswordManagerControlConfig({
 *   behavior: PasswordManagerBehavior.IGNORE
 * });
 * // Use controlConfig.attributes in your HOC implementation
 */
export function createPasswordManagerControlConfig(
  config: PasswordManagerConfig
) {
  const attributes = getPasswordManagerAttributes(config);

  return {
    config,
    attributes,
  };
}

/**
 * Create configuration object for password manager prevention HOCs
 * Convenience function for the most common use case
 * @returns Configuration object with prevention attributes
 */
export function createPasswordManagerPreventionConfig() {
  return createPasswordManagerControlConfig({
    behavior: PasswordManagerBehavior.IGNORE,
  });
}

/**
 * Merge props with password manager attributes
 * Utility function for React component prop merging
 * @param existingProps - Existing component props
 * @param config - Password manager configuration
 * @returns Merged props with password manager attributes
 *
 * @example
 * function MyInput(props) {
 *   const mergedProps = mergePropsWithPasswordManagerControl(props, {
 *     behavior: PasswordManagerBehavior.IGNORE
 *   });
 *   return <input {...mergedProps} />;
 * }
 */
export function mergePropsWithPasswordManagerControl<
  T extends Record<string, unknown>,
>(existingProps: T, config: PasswordManagerConfig): T & FormElementProps {
  const passwordManagerAttrs = getPasswordManagerAttributes(config);
  return {
    ...existingProps,
    ...passwordManagerAttrs,
  };
}

/**
 * Merge props with password manager prevention attributes
 * Convenience function for the most common use case
 * @param existingProps - Existing component props
 * @returns Merged props with password manager prevention attributes
 *
 * @example
 * function MyInput(props) {
 *   const mergedProps = mergePropsWithPasswordManagerPrevention(props);
 *   return <input {...mergedProps} />;
 * }
 */
export function mergePropsWithPasswordManagerPrevention<
  T extends Record<string, unknown>,
>(existingProps: T): T & FormElementProps {
  return mergePropsWithPasswordManagerControl(existingProps, {
    behavior: PasswordManagerBehavior.IGNORE,
  });
}

/**
 * React hook for controlling password manager behavior
 * @param config - Password manager configuration
 * @returns HTML attributes to spread onto form elements
 *
 * @example
 * function MyInput() {
 *   const attrs = usePasswordManagerControl({
 *     behavior: PasswordManagerBehavior.IGNORE
 *   });
 *   return <input {...attrs} type="text" />;
 * }
 */
export function usePasswordManagerControl(
  config: PasswordManagerConfig
): FormElementProps {
  // In a real React environment, this would use useMemo for optimization
  // For now, we'll return the attributes directly since React is a peer dependency
  return getPasswordManagerAttributes(config);
}

/**
 * React hook for the common use case of preventing password manager autofill
 * @returns HTML attributes to prevent password manager autofill
 *
 * @example
 * function MyInput() {
 *   const preventionProps = usePasswordManagerPrevention();
 *   return <input {...preventionProps} type="text" />;
 * }
 */
export function usePasswordManagerPrevention(): FormElementProps {
  // In a real React environment, this would use useMemo for optimization
  // For now, we'll return the attributes directly since React is a peer dependency
  return getPasswordManagerPreventionProps();
}
