import {
  PasswordManager,
  PasswordManagerBehavior,
  OnePasswordProvider,
  LastPassProvider,
  BitwardenProvider,
  DashlaneProvider,
  BrowserAutocompleteProvider,
  getPasswordManagerProvider,
  getAllPasswordManagerProviders,
  PASSWORD_MANAGER_PROVIDERS,
} from '../index';

describe('Password Manager Providers', () => {
  describe('OnePasswordProvider', () => {
    const provider = new OnePasswordProvider();

    it('should have correct manager type', () => {
      expect(provider.manager).toBe(PasswordManager.ONE_PASSWORD);
    });

    it('should support ignore behavior', () => {
      expect(provider.supportsBehavior(PasswordManagerBehavior.IGNORE)).toBe(
        true
      );
    });

    it('should not support allow behavior', () => {
      expect(provider.supportsBehavior(PasswordManagerBehavior.ALLOW)).toBe(
        false
      );
    });

    it('should return correct ignore attributes', () => {
      const attrs = provider.getAttributes(PasswordManagerBehavior.IGNORE);
      expect(attrs).toEqual({ 'data-1p-ignore': '' });
    });

    it('should return empty attributes for allow behavior', () => {
      const attrs = provider.getAttributes(PasswordManagerBehavior.ALLOW);
      expect(attrs).toEqual({});
    });
  });

  describe('LastPassProvider', () => {
    const provider = new LastPassProvider();

    it('should have correct manager type', () => {
      expect(provider.manager).toBe(PasswordManager.LASTPASS);
    });

    it('should support ignore behavior', () => {
      expect(provider.supportsBehavior(PasswordManagerBehavior.IGNORE)).toBe(
        true
      );
    });

    it('should return correct ignore attributes', () => {
      const attrs = provider.getAttributes(PasswordManagerBehavior.IGNORE);
      expect(attrs).toEqual({ 'data-lpignore': 'true' });
    });
  });

  describe('BitwardenProvider', () => {
    const provider = new BitwardenProvider();

    it('should have correct manager type', () => {
      expect(provider.manager).toBe(PasswordManager.BITWARDEN);
    });

    it('should support ignore behavior', () => {
      expect(provider.supportsBehavior(PasswordManagerBehavior.IGNORE)).toBe(
        true
      );
    });

    it('should return correct ignore attributes', () => {
      const attrs = provider.getAttributes(PasswordManagerBehavior.IGNORE);
      expect(attrs).toEqual({ 'data-bwignore': '' });
    });
  });

  describe('DashlaneProvider', () => {
    const provider = new DashlaneProvider();

    it('should have correct manager type', () => {
      expect(provider.manager).toBe(PasswordManager.DASHLANE);
    });

    it('should support ignore behavior', () => {
      expect(provider.supportsBehavior(PasswordManagerBehavior.IGNORE)).toBe(
        true
      );
    });

    it('should return correct ignore attributes', () => {
      const attrs = provider.getAttributes(PasswordManagerBehavior.IGNORE);
      expect(attrs).toEqual({ 'data-form-type': 'other' });
    });
  });

  describe('BrowserAutocompleteProvider', () => {
    const provider = new BrowserAutocompleteProvider();

    it('should have correct manager type', () => {
      expect(provider.manager).toBe(PasswordManager.BROWSER_AUTOCOMPLETE);
    });

    it('should support ignore behavior', () => {
      expect(provider.supportsBehavior(PasswordManagerBehavior.IGNORE)).toBe(
        true
      );
    });

    it('should support allow behavior', () => {
      expect(provider.supportsBehavior(PasswordManagerBehavior.ALLOW)).toBe(
        true
      );
    });

    it('should return correct ignore attributes', () => {
      const attrs = provider.getAttributes(PasswordManagerBehavior.IGNORE);
      expect(attrs).toEqual({ autoComplete: 'off' });
    });

    it('should return correct allow attributes', () => {
      const attrs = provider.getAttributes(PasswordManagerBehavior.ALLOW);
      expect(attrs).toEqual({ autoComplete: 'on' });
    });
  });

  describe('Provider Registry', () => {
    it('should contain all password manager providers', () => {
      expect(PASSWORD_MANAGER_PROVIDERS).toHaveProperty(
        PasswordManager.ONE_PASSWORD
      );
      expect(PASSWORD_MANAGER_PROVIDERS).toHaveProperty(
        PasswordManager.LASTPASS
      );
      expect(PASSWORD_MANAGER_PROVIDERS).toHaveProperty(
        PasswordManager.BITWARDEN
      );
      expect(PASSWORD_MANAGER_PROVIDERS).toHaveProperty(
        PasswordManager.DASHLANE
      );
      expect(PASSWORD_MANAGER_PROVIDERS).toHaveProperty(
        PasswordManager.BROWSER_AUTOCOMPLETE
      );
    });

    it('should return correct provider for each manager', () => {
      expect(
        getPasswordManagerProvider(PasswordManager.ONE_PASSWORD)
      ).toBeInstanceOf(OnePasswordProvider);
      expect(
        getPasswordManagerProvider(PasswordManager.LASTPASS)
      ).toBeInstanceOf(LastPassProvider);
      expect(
        getPasswordManagerProvider(PasswordManager.BITWARDEN)
      ).toBeInstanceOf(BitwardenProvider);
      expect(
        getPasswordManagerProvider(PasswordManager.DASHLANE)
      ).toBeInstanceOf(DashlaneProvider);
      expect(
        getPasswordManagerProvider(PasswordManager.BROWSER_AUTOCOMPLETE)
      ).toBeInstanceOf(BrowserAutocompleteProvider);
    });

    it('should throw error for unknown manager', () => {
      expect(() => {
        getPasswordManagerProvider('unknown' as PasswordManager);
      }).toThrow('Unknown password manager: unknown');
    });

    it('should return all providers', () => {
      const providers = getAllPasswordManagerProviders();
      expect(providers).toHaveLength(5);
      expect(providers.some(p => p instanceof OnePasswordProvider)).toBe(true);
      expect(providers.some(p => p instanceof LastPassProvider)).toBe(true);
      expect(providers.some(p => p instanceof BitwardenProvider)).toBe(true);
      expect(providers.some(p => p instanceof DashlaneProvider)).toBe(true);
      expect(
        providers.some(p => p instanceof BrowserAutocompleteProvider)
      ).toBe(true);
    });
  });
});
