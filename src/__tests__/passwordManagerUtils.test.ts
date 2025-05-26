import {
  PasswordManager,
  PasswordManagerBehavior,
  getPasswordManagerAttributes,
  getPasswordManagerPreventionProps,
  mergeWithPasswordManagerPrevention,
  supportsPasswordManagerBehavior,
  getSupportedPasswordManagers,
} from '../index';

describe('Password Manager Utils', () => {
  describe('getPasswordManagerAttributes', () => {
    it('should return attributes for all password managers when none specified', () => {
      const attrs = getPasswordManagerAttributes({
        behavior: PasswordManagerBehavior.IGNORE,
      });

      expect(attrs).toHaveProperty('data-1p-ignore');
      expect(attrs).toHaveProperty('data-lpignore');
      expect(attrs).toHaveProperty('data-bwignore');
      expect(attrs).toHaveProperty('data-form-type');
      expect(attrs).toHaveProperty('autoComplete');
    });

    it('should return attributes for specific password managers only', () => {
      const attrs = getPasswordManagerAttributes({
        behavior: PasswordManagerBehavior.IGNORE,
        managers: [PasswordManager.ONE_PASSWORD, PasswordManager.LASTPASS],
      });

      expect(attrs).toHaveProperty('data-1p-ignore');
      expect(attrs).toHaveProperty('data-lpignore');
      expect(attrs).not.toHaveProperty('data-bwignore');
      expect(attrs).not.toHaveProperty('data-form-type');
      expect(attrs).not.toHaveProperty('autoComplete');
    });

    it('should throw error for null config', () => {
      expect(() => {
        getPasswordManagerAttributes(null as any);
      }).toThrow('Password manager configuration is required');
    });

    it('should throw error for undefined config', () => {
      expect(() => {
        getPasswordManagerAttributes(undefined as any);
      }).toThrow('Password manager configuration is required');
    });

    it('should throw error for invalid behavior', () => {
      expect(() => {
        getPasswordManagerAttributes({
          behavior: 'invalid' as PasswordManagerBehavior,
        });
      }).toThrow('Invalid password manager behavior: invalid');
    });

    it('should throw error for non-array managers', () => {
      expect(() => {
        getPasswordManagerAttributes({
          behavior: PasswordManagerBehavior.IGNORE,
          managers: 'invalid' as any,
        });
      }).toThrow('Password managers must be an array');
    });

    it('should throw error for empty managers array', () => {
      expect(() => {
        getPasswordManagerAttributes({
          behavior: PasswordManagerBehavior.IGNORE,
          managers: [],
        });
      }).toThrow('Password managers array cannot be empty');
    });

    it('should throw error for invalid managers', () => {
      expect(() => {
        getPasswordManagerAttributes({
          behavior: PasswordManagerBehavior.IGNORE,
          managers: ['invalid' as PasswordManager],
        });
      }).toThrow('Invalid password managers: invalid');
    });

    it('should handle allow behavior for browser autocomplete', () => {
      const attrs = getPasswordManagerAttributes({
        behavior: PasswordManagerBehavior.ALLOW,
        managers: [PasswordManager.BROWSER_AUTOCOMPLETE],
      });

      expect(attrs).toEqual({ autoComplete: 'on' });
    });

    it('should return empty object for allow behavior on unsupported managers', () => {
      const attrs = getPasswordManagerAttributes({
        behavior: PasswordManagerBehavior.ALLOW,
        managers: [PasswordManager.ONE_PASSWORD],
      });

      expect(attrs).toEqual({});
    });
  });

  describe('getPasswordManagerPreventionProps', () => {
    it('should return prevention attributes for all password managers', () => {
      const props = getPasswordManagerPreventionProps();

      expect(props).toHaveProperty('data-1p-ignore');
      expect(props).toHaveProperty('data-lpignore');
      expect(props).toHaveProperty('data-bwignore');
      expect(props).toHaveProperty('data-form-type');
      expect(props).toHaveProperty('autoComplete');
      expect(props.autoComplete).toBe('off');
    });
  });

  describe('mergeWithPasswordManagerPrevention', () => {
    it('should merge existing props with prevention attributes', () => {
      const existingProps = {
        className: 'my-input',
        placeholder: 'Enter text',
      };

      const mergedProps = mergeWithPasswordManagerPrevention(existingProps);

      expect(mergedProps).toHaveProperty('className', 'my-input');
      expect(mergedProps).toHaveProperty('placeholder', 'Enter text');
      expect(mergedProps).toHaveProperty('data-1p-ignore');
      expect(mergedProps).toHaveProperty('autoComplete', 'off');
    });

    it('should work with empty props', () => {
      const mergedProps = mergeWithPasswordManagerPrevention({});

      expect(mergedProps).toHaveProperty('data-1p-ignore');
      expect(mergedProps).toHaveProperty('autoComplete', 'off');
    });

    it('should work with undefined props', () => {
      const mergedProps = mergeWithPasswordManagerPrevention();

      expect(mergedProps).toHaveProperty('data-1p-ignore');
      expect(mergedProps).toHaveProperty('autoComplete', 'off');
    });

    it('should override existing autoComplete attribute', () => {
      const existingProps = {
        autoComplete: 'on',
      };

      const mergedProps = mergeWithPasswordManagerPrevention(existingProps);

      expect(mergedProps.autoComplete).toBe('off');
    });
  });

  describe('supportsPasswordManagerBehavior', () => {
    it('should return true for ignore behavior on all managers', () => {
      const managers = getSupportedPasswordManagers();

      managers.forEach(manager => {
        expect(
          supportsPasswordManagerBehavior(
            manager,
            PasswordManagerBehavior.IGNORE
          )
        ).toBe(true);
      });
    });

    it('should return true for allow behavior on browser autocomplete', () => {
      expect(
        supportsPasswordManagerBehavior(
          PasswordManager.BROWSER_AUTOCOMPLETE,
          PasswordManagerBehavior.ALLOW
        )
      ).toBe(true);
    });

    it('should return false for allow behavior on password managers without explicit allow support', () => {
      expect(
        supportsPasswordManagerBehavior(
          PasswordManager.ONE_PASSWORD,
          PasswordManagerBehavior.ALLOW
        )
      ).toBe(false);
    });

    it('should return false for unknown manager', () => {
      expect(
        supportsPasswordManagerBehavior(
          'unknown' as PasswordManager,
          PasswordManagerBehavior.IGNORE
        )
      ).toBe(false);
    });

    it('should return false for invalid behavior', () => {
      expect(
        supportsPasswordManagerBehavior(
          PasswordManager.ONE_PASSWORD,
          'invalid' as PasswordManagerBehavior
        )
      ).toBe(false);
    });
  });

  describe('getSupportedPasswordManagers', () => {
    it('should return all supported password managers', () => {
      const managers = getSupportedPasswordManagers();

      expect(managers).toContain(PasswordManager.ONE_PASSWORD);
      expect(managers).toContain(PasswordManager.LASTPASS);
      expect(managers).toContain(PasswordManager.BITWARDEN);
      expect(managers).toContain(PasswordManager.DASHLANE);
      expect(managers).toContain(PasswordManager.BROWSER_AUTOCOMPLETE);
    });

    it('should return exactly 5 managers', () => {
      const managers = getSupportedPasswordManagers();
      expect(managers).toHaveLength(5);
    });
  });
});
