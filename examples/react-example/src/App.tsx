import React, { useState } from 'react';
import {
  // Core functions
  getPasswordManagerAttributes,
  getPasswordManagerPreventionProps,
  mergeWithPasswordManagerPrevention,
  
  // React utilities
  usePasswordManagerControl,
  usePasswordManagerPrevention,
  mergePropsWithPasswordManagerPrevention,
  
  // Types and enums
  PasswordManager,
  PasswordManagerBehavior,
  type PasswordManagerConfig,
  type FormElementProps,
} from 'password-manager-autofill-utilities';

import './App.css';

// Test component that validates prop spreading works correctly
interface TestInputProps {
  label: string;
  placeholder?: string;
  className?: string;
}

const TestInput: React.FC<TestInputProps> = ({ label, ...props }) => {
  const preventionProps = mergePropsWithPasswordManagerPrevention(props);
  
  return (
    <div className="input-group">
      <label>{label}</label>
      <input {...preventionProps} type="text" />
    </div>
  );
};

// Component that tests the React hooks
const HookTestComponent: React.FC = () => {
  const [selectedManagers, setSelectedManagers] = useState<PasswordManager[]>([]);
  const [behavior, setBehavior] = useState<PasswordManagerBehavior>(PasswordManagerBehavior.IGNORE);
  
  const config: PasswordManagerConfig = {
    behavior,
    managers: selectedManagers.length > 0 ? selectedManagers : undefined,
  };
  
  const controlAttrs = usePasswordManagerControl(config);
  const preventionAttrs = usePasswordManagerPrevention();
  
  return (
    <div className="hook-test">
      <h3>React Hooks Test</h3>
      
      <div className="controls">
        <div>
          <label>Behavior:</label>
          <select 
            value={behavior} 
            onChange={(e) => setBehavior(e.target.value as PasswordManagerBehavior)}
          >
            <option value={PasswordManagerBehavior.IGNORE}>Ignore</option>
            <option value={PasswordManagerBehavior.ALLOW}>Allow</option>
          </select>
        </div>
        
        <div>
          <label>Target Managers:</label>
          <div className="checkbox-group">
            {Object.values(PasswordManager).map((manager) => (
              <label key={manager}>
                <input
                  type="checkbox"
                  checked={selectedManagers.includes(manager)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedManagers([...selectedManagers, manager]);
                    } else {
                      setSelectedManagers(selectedManagers.filter(m => m !== manager));
                    }
                  }}
                />
                {manager}
              </label>
            ))}
          </div>
        </div>
      </div>
      
      <div className="test-inputs">
        <div>
          <label>usePasswordManagerControl:</label>
          <input {...controlAttrs} type="text" placeholder="Controlled input" />
          <pre>{JSON.stringify(controlAttrs, null, 2)}</pre>
        </div>
        
        <div>
          <label>usePasswordManagerPrevention:</label>
          <input {...preventionAttrs} type="text" placeholder="Prevention input" />
          <pre>{JSON.stringify(preventionAttrs, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

// Component that tests core functions
const CoreFunctionTestComponent: React.FC = () => {
  const allManagersIgnore = getPasswordManagerAttributes({
    behavior: PasswordManagerBehavior.IGNORE,
  });
  
  const specificManagersIgnore = getPasswordManagerAttributes({
    behavior: PasswordManagerBehavior.IGNORE,
    managers: [PasswordManager.ONE_PASSWORD, PasswordManager.LASTPASS],
  });
  
  const browserAllow = getPasswordManagerAttributes({
    behavior: PasswordManagerBehavior.ALLOW,
    managers: [PasswordManager.BROWSER_AUTOCOMPLETE],
  });
  
  const preventionProps = getPasswordManagerPreventionProps();
  
  const mergedProps = mergeWithPasswordManagerPrevention({
    className: 'custom-input',
    placeholder: 'Merged props example',
  });
  
  return (
    <div className="core-test">
      <h3>Core Functions Test</h3>
      
      <div className="test-case">
        <label>All Managers Ignore:</label>
        <input {...allManagersIgnore} type="text" placeholder="All managers ignored" />
        <pre>{JSON.stringify(allManagersIgnore, null, 2)}</pre>
      </div>
      
      <div className="test-case">
        <label>Specific Managers Ignore (1Password + LastPass):</label>
        <input {...specificManagersIgnore} type="text" placeholder="Specific managers ignored" />
        <pre>{JSON.stringify(specificManagersIgnore, null, 2)}</pre>
      </div>
      
      <div className="test-case">
        <label>Browser Autocomplete Allow:</label>
        <input {...browserAllow} type="text" placeholder="Browser autocomplete allowed" />
        <pre>{JSON.stringify(browserAllow, null, 2)}</pre>
      </div>
      
      <div className="test-case">
        <label>Prevention Props:</label>
        <input {...preventionProps} type="text" placeholder="Prevention props" />
        <pre>{JSON.stringify(preventionProps, null, 2)}</pre>
      </div>
      
      <div className="test-case">
        <label>Merged Props:</label>
        <input {...mergedProps} type="text" />
        <pre>{JSON.stringify(mergedProps, null, 2)}</pre>
      </div>
    </div>
  );
};

// Component that validates TypeScript types work correctly
const TypeValidationComponent: React.FC = () => {
  // Test that types are properly exported and usable
  const config: PasswordManagerConfig = {
    behavior: PasswordManagerBehavior.IGNORE,
    managers: [PasswordManager.ONE_PASSWORD],
  };
  
  const props: FormElementProps = getPasswordManagerAttributes(config);
  
  return (
    <div className="type-validation">
      <h3>TypeScript Type Validation</h3>
      <p>✅ PasswordManagerConfig type works</p>
      <p>✅ FormElementProps type works</p>
      <p>✅ All enums are properly typed</p>
      <input {...props} type="text" placeholder="Type validation successful" />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Password Manager Autofill Utilities</h1>
        <h2>React Integration Test</h2>
        <p>
          This example app validates that the password manager utilities library
          works correctly with React and catches any compatibility issues.
        </p>
      </header>
      
      <main>
        <section>
          <h2>Test Input Component</h2>
          <TestInput 
            label="Test Input with Prevention:" 
            placeholder="This input prevents all password managers"
            className="test-input"
          />
        </section>
        
        <CoreFunctionTestComponent />
        <HookTestComponent />
        <TypeValidationComponent />
        
        <section>
          <h2>Form Example</h2>
          <form className="example-form">
            <TestInput label="Username:" placeholder="Enter username" />
            <TestInput label="Password:" placeholder="Enter password" />
            <TestInput label="Confirm Password:" placeholder="Confirm password" />
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App; 