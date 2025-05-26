import {
  PasswordManager,
  PasswordManagerBehavior,
  PasswordManagerProvider,
  HtmlAttributes,
} from '../types';

/**
 * Abstract base class for password manager providers
 * Provides common functionality and enforces the interface contract
 */
export abstract class BasePasswordManagerProvider
  implements PasswordManagerProvider
{
  public abstract readonly manager: PasswordManager;

  /**
   * Get attributes for the specified behavior
   * @param behavior - The desired behavior
   * @returns HTML attributes to apply
   */
  public getAttributes(behavior: PasswordManagerBehavior): HtmlAttributes {
    if (!this.supportsBehavior(behavior)) {
      return {};
    }

    switch (behavior) {
      case PasswordManagerBehavior.IGNORE:
        return this.getIgnoreAttributes();
      case PasswordManagerBehavior.ALLOW:
        return this.getAllowAttributes();
      default:
        return {};
    }
  }

  /**
   * Check if this provider supports the given behavior
   * @param behavior - The behavior to check
   * @returns true if supported
   */
  public supportsBehavior(behavior: PasswordManagerBehavior): boolean {
    // By default, all providers support ignore behavior
    // Allow behavior is supported if the provider has specific allow attributes
    switch (behavior) {
      case PasswordManagerBehavior.IGNORE:
        return true;
      case PasswordManagerBehavior.ALLOW:
        return Object.keys(this.getAllowAttributes()).length > 0;
      default:
        return false;
    }
  }

  /**
   * Get attributes that prevent the password manager from interacting with the field
   * Must be implemented by each provider
   */
  protected abstract getIgnoreAttributes(): HtmlAttributes;

  /**
   * Get attributes that explicitly allow the password manager to interact with the field
   * Default implementation returns empty object (no special attributes needed)
   * Can be overridden by providers that have specific allow attributes
   */
  protected getAllowAttributes(): HtmlAttributes {
    return {};
  }
}
