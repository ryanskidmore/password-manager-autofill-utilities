import {
  PasswordManager,
  PasswordManagerBehavior,
  getPasswordManagerControlAttributes,
  getPasswordManagerPreventionAttributes,
  createPasswordManagerControlConfig,
  createPasswordManagerPreventionConfig,
  mergePropsWithPasswordManagerControl,
  mergePropsWithPasswordManagerPrevention,
  usePasswordManagerControl,
  usePasswordManagerPrevention,
} from '../index';

describe('React Utils', () => {
  describe('getPasswordManagerControlAttributes', () => {
    it('should return attributes for ignore behavior', () => {
      const attrs = getPasswordManagerControlAttributes({
        behavior: PasswordManagerBehavior.IGNORE,
      });

      expect(attrs).toHaveProperty('data-1p-ignore');
      expect(attrs).toHaveProperty('data-lpignore');
      expect(attrs).toHaveProperty('data-bwignore');
      expect(attrs).toHaveProperty('data-form-type');
      expect(attrs).toHaveProperty('autoComplete');
    });

    it('should return attributes for specific managers only', () => {
      const attrs = getPasswordManagerControlAttributes({
        behavior: PasswordManagerBehavior.IGNORE,
        managers: [PasswordManager.ONE_PASSWORD],
      });

      expect(attrs).toHaveProperty('data-1p-ignore');
      expect(attrs).not.toHaveProperty('data-lpignore');
      expect(attrs).not.toHaveProperty('data-bwignore');
    });
  });

  describe('getPasswordManagerPreventionAttributes', () => {
    it('should return prevention attributes for all managers', () => {
      const attrs = getPasswordManagerPreventionAttributes();

      expect(attrs).toHaveProperty('data-1p-ignore');
      expect(attrs).toHaveProperty('data-lpignore');
      expect(attrs).toHaveProperty('data-bwignore');
      expect(attrs).toHaveProperty('data-form-type');
      expect(attrs).toHaveProperty('autoComplete');
      expect(attrs.autoComplete).toBe('off');
    });
  });

  describe('createPasswordManagerControlConfig', () => {
    it('should create config with attributes', () => {
      const config = createPasswordManagerControlConfig({
        behavior: PasswordManagerBehavior.IGNORE,
      });

      expect(config).toHaveProperty('config');
      expect(config).toHaveProperty('attributes');
      expect(config.config.behavior).toBe(PasswordManagerBehavior.IGNORE);
      expect(config.attributes).toHaveProperty('data-1p-ignore');
    });
  });

  describe('createPasswordManagerPreventionConfig', () => {
    it('should create prevention config', () => {
      const config = createPasswordManagerPreventionConfig();

      expect(config).toHaveProperty('config');
      expect(config).toHaveProperty('attributes');
      expect(config.config.behavior).toBe(PasswordManagerBehavior.IGNORE);
      expect(config.attributes).toHaveProperty('data-1p-ignore');
    });
  });

  describe('mergePropsWithPasswordManagerControl', () => {
    it('should merge props with password manager attributes', () => {
      const existingProps = {
        className: 'my-input',
        placeholder: 'Enter text',
      };

      const mergedProps = mergePropsWithPasswordManagerControl(existingProps, {
        behavior: PasswordManagerBehavior.IGNORE,
      });

      expect(mergedProps).toHaveProperty('className', 'my-input');
      expect(mergedProps).toHaveProperty('placeholder', 'Enter text');
      expect(mergedProps).toHaveProperty('data-1p-ignore');
      expect(mergedProps).toHaveProperty('autoComplete', 'off');
    });

    it('should work with empty props', () => {
      const mergedProps = mergePropsWithPasswordManagerControl(
        {},
        {
          behavior: PasswordManagerBehavior.IGNORE,
        }
      );

      expect(mergedProps).toHaveProperty('data-1p-ignore');
      expect(mergedProps).toHaveProperty('autoComplete', 'off');
    });
  });

  describe('mergePropsWithPasswordManagerPrevention', () => {
    it('should merge props with prevention attributes', () => {
      const existingProps = {
        className: 'my-input',
        placeholder: 'Enter text',
      };

      const mergedProps =
        mergePropsWithPasswordManagerPrevention(existingProps);

      expect(mergedProps).toHaveProperty('className', 'my-input');
      expect(mergedProps).toHaveProperty('placeholder', 'Enter text');
      expect(mergedProps).toHaveProperty('data-1p-ignore');
      expect(mergedProps).toHaveProperty('autoComplete', 'off');
    });

    it('should work with empty props', () => {
      const mergedProps = mergePropsWithPasswordManagerPrevention({});

      expect(mergedProps).toHaveProperty('data-1p-ignore');
      expect(mergedProps).toHaveProperty('autoComplete', 'off');
    });
  });

  describe('usePasswordManagerControl', () => {
    it('should return attributes for ignore behavior', () => {
      const attrs = usePasswordManagerControl({
        behavior: PasswordManagerBehavior.IGNORE,
      });

      expect(attrs).toHaveProperty('data-1p-ignore');
      expect(attrs).toHaveProperty('data-lpignore');
      expect(attrs).toHaveProperty('data-bwignore');
      expect(attrs).toHaveProperty('data-form-type');
      expect(attrs).toHaveProperty('autoComplete');
    });

    it('should return attributes for specific managers', () => {
      const attrs = usePasswordManagerControl({
        behavior: PasswordManagerBehavior.IGNORE,
        managers: [PasswordManager.BITWARDEN, PasswordManager.LASTPASS],
      });

      expect(attrs).toHaveProperty('data-bwignore');
      expect(attrs).toHaveProperty('data-lpignore');
      expect(attrs).not.toHaveProperty('data-1p-ignore');
      expect(attrs).not.toHaveProperty('data-form-type');
    });
  });

  describe('usePasswordManagerPrevention', () => {
    it('should return prevention attributes', () => {
      const attrs = usePasswordManagerPrevention();

      expect(attrs).toHaveProperty('data-1p-ignore');
      expect(attrs).toHaveProperty('data-lpignore');
      expect(attrs).toHaveProperty('data-bwignore');
      expect(attrs).toHaveProperty('data-form-type');
      expect(attrs).toHaveProperty('autoComplete');
      expect(attrs.autoComplete).toBe('off');
    });
  });
});
