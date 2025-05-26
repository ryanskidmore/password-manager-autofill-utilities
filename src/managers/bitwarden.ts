import { PasswordManager, HtmlAttributes } from '../types';
import { BasePasswordManagerProvider } from './base';

/**
 * Bitwarden provider implementation
 * Uses the data-bwignore attribute to prevent autofill
 */
export class BitwardenProvider extends BasePasswordManagerProvider {
  public readonly manager = PasswordManager.BITWARDEN;

  /**
   * Get attributes that prevent Bitwarden from interacting with the field
   * @returns HTML attributes for Bitwarden ignore behavior
   */
  protected getIgnoreAttributes(): HtmlAttributes {
    return {
      'data-bwignore': '',
    };
  }
}
