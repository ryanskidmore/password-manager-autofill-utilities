import { PasswordManager, HtmlAttributes } from '../types';
import { BasePasswordManagerProvider } from './base';

/**
 * Dashlane provider implementation
 * Uses the data-form-type attribute to prevent autofill
 */
export class DashlaneProvider extends BasePasswordManagerProvider {
  public readonly manager = PasswordManager.DASHLANE;

  /**
   * Get attributes that prevent Dashlane from interacting with the field
   * @returns HTML attributes for Dashlane ignore behavior
   */
  protected getIgnoreAttributes(): HtmlAttributes {
    return {
      'data-form-type': 'other',
    };
  }
}
