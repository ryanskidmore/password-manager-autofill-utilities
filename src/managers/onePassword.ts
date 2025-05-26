import { PasswordManager, HtmlAttributes } from '../types';
import { BasePasswordManagerProvider } from './base';

/**
 * 1Password provider implementation
 *
 * Uses the data-1p-ignore attribute to prevent autofill.
 *
 * @see {@link https://developer.1password.com/docs/web/compatible-website-design/} 1Password Developer Documentation
 *
 * @example
 * ```typescript
 * const provider = new OnePasswordProvider();
 * const attrs = provider.getAttributes(PasswordManagerBehavior.IGNORE);
 * // Returns: { 'data-1p-ignore': '' }
 * ```
 */
export class OnePasswordProvider extends BasePasswordManagerProvider {
  /** The password manager this provider handles */
  public readonly manager = PasswordManager.ONE_PASSWORD;

  /**
   * Get attributes that prevent 1Password from interacting with the field
   *
   * Uses the `data-1p-ignore` attribute as specified in 1Password's documentation.
   * Alternative attribute `data-op-ignore` is also supported by 1Password but not used here.
   *
   * @returns HTML attributes for 1Password ignore behavior
   * @see {@link https://developer.1password.com/docs/web/compatible-website-design/#ignore-offers-to-save-or-fill-specific-fields}
   */
  protected getIgnoreAttributes(): HtmlAttributes {
    return {
      'data-1p-ignore': '',
    };
  }
}
