import { PasswordManager, HtmlAttributes } from '../types';
import { BasePasswordManagerProvider } from './base';

/**
 * Browser autocomplete provider implementation
 * Uses the autoComplete attribute to control browser autofill behavior
 * Note: Uses React's camelCase naming convention (autoComplete) rather than HTML's lowercase (autocomplete)
 */
export class BrowserAutocompleteProvider extends BasePasswordManagerProvider {
  public readonly manager = PasswordManager.BROWSER_AUTOCOMPLETE;

  /**
   * Get attributes that prevent browser autocomplete from interacting with the field
   * @returns HTML attributes for browser autocomplete ignore behavior
   */
  protected getIgnoreAttributes(): HtmlAttributes {
    return {
      autoComplete: 'off',
    };
  }

  /**
   * Get attributes that explicitly allow browser autocomplete
   * @returns HTML attributes for browser autocomplete allow behavior
   */
  protected override getAllowAttributes(): HtmlAttributes {
    return {
      autoComplete: 'on',
    };
  }
}
