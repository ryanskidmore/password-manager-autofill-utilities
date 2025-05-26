import { PasswordManager, HtmlAttributes } from '../types';
import { BasePasswordManagerProvider } from './base';

/**
 * LastPass provider implementation
 *
 * Uses the data-lpignore attribute to prevent autofill.
 *
 * @example
 * ```typescript
 * const provider = new LastPassProvider();
 * const attrs = provider.getAttributes(PasswordManagerBehavior.IGNORE);
 * // Returns: { 'data-lpignore': 'true' }
 * ```
 */
export class LastPassProvider extends BasePasswordManagerProvider {
  /** The password manager this provider handles */
  public readonly manager = PasswordManager.LASTPASS;

  /**
   * Get attributes that prevent LastPass from interacting with the field
   *
   * Uses the `data-lpignore="true"` attribute as specified in LastPass documentation.
   * Note that the value must be "true" (string), not a boolean.
   *
   * @returns HTML attributes for LastPass ignore behavior
   */
  protected getIgnoreAttributes(): HtmlAttributes {
    return {
      'data-lpignore': 'true',
    };
  }
}
