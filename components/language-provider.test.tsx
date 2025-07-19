import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LanguageProvider, useTranslation } from './language-provider';

// Test component that uses the translation hook
function TestComponent() {
  const { lang, setLang, t } = useTranslation();
  
  return (
    <div>
      <span data-testid="current-lang">{lang}</span>
      <span data-testid="nav-home">{t.navigation.home}</span>
      <button 
        onClick={() => setLang('es')} 
        data-testid="switch-to-spanish"
      >
        Switch to Spanish
      </button>
      <button 
        onClick={() => setLang('pt')} 
        data-testid="switch-to-portuguese"
      >
        Switch to Portuguese
      </button>
      <button 
        onClick={() => setLang('en')} 
        data-testid="switch-to-english"
      >
        Switch to English
      </button>
    </div>
  );
}

describe('LanguageProvider', () => {
  it('should provide default English translations', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Home');
  });

  it('should switch to Spanish when language is changed', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByTestId('switch-to-spanish'));

    expect(screen.getByTestId('current-lang')).toHaveTextContent('es');
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Inicio');
  });

  it('should switch to Portuguese when language is changed', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByTestId('switch-to-portuguese'));

    expect(screen.getByTestId('current-lang')).toHaveTextContent('pt');
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Início');
  });

  it('should switch back to English', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    // Switch to Spanish first
    fireEvent.click(screen.getByTestId('switch-to-spanish'));
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Inicio');

    // Switch back to English
    fireEvent.click(screen.getByTestId('switch-to-english'));
    expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Home');
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTranslation must be used within a LanguageProvider');

    console.error = originalError;
  });
});