export { BasePasswordManagerProvider } from './base';
export { OnePasswordProvider } from './onePassword';
export { LastPassProvider } from './lastPass';
export { BitwardenProvider } from './bitwarden';
export { DashlaneProvider } from './dashlane';
export { BrowserAutocompleteProvider } from './browserAutocomplete';

import {
  PasswordManager,
  PasswordManagerProvider,
  PasswordManagerProviderError,
} from '../types';
import { OnePasswordProvider } from './onePassword';
import { LastPassProvider } from './lastPass';
import { BitwardenProvider } from './bitwarden';
import { DashlaneProvider } from './dashlane';
import { BrowserAutocompleteProvider } from './browserAutocomplete';

/**
 * Registry of all available password manager providers
 */
export const PASSWORD_MANAGER_PROVIDERS: Record<
  PasswordManager,
  PasswordManagerProvider
> = {
  [PasswordManager.ONE_PASSWORD]: new OnePasswordProvider(),
  [PasswordManager.LASTPASS]: new LastPassProvider(),
  [PasswordManager.BITWARDEN]: new BitwardenProvider(),
  [PasswordManager.DASHLANE]: new DashlaneProvider(),
  [PasswordManager.BROWSER_AUTOCOMPLETE]: new BrowserAutocompleteProvider(),
};

/**
 * Get a password manager provider by its identifier
 * @param manager - The password manager identifier
 * @returns The provider instance
 */
export function getPasswordManagerProvider(
  manager: PasswordManager
): PasswordManagerProvider {
  const provider = PASSWORD_MANAGER_PROVIDERS[manager];
  if (!provider) {
    throw new PasswordManagerProviderError(
      `Unknown password manager: ${manager}`
    );
  }
  return provider;
}

/**
 * Get all available password manager providers
 * @returns Array of all provider instances
 */
export function getAllPasswordManagerProviders(): PasswordManagerProvider[] {
  return Object.values(PASSWORD_MANAGER_PROVIDERS);
}
