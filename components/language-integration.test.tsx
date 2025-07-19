import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LanguageProvider, useTranslation } from './language-provider';
import { Navigation } from './navigation';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}));

// Test component that displays multiple translated strings
function MultiTranslationTestComponent() {
  const { t, lang } = useTranslation();
  
  return (
    <div>
      <span data-testid="current-language">{lang}</span>
      <h1 data-testid="home-title">{t.home.latestUpdates}</h1>
      <p data-testid="home-subtitle">{t.home.stayConnected}</p>
      <h2 data-testid="about-title">{t.about.title}</h2>
      <p data-testid="about-subtitle">{t.about.subtitle}</p>
      <span data-testid="nav-home">{t.navigation.home}</span>
      <span data-testid="nav-about">{t.navigation.about}</span>
      <span data-testid="nav-contact">{t.navigation.contact}</span>
      <span data-testid="footer-slogan">{t.footer.slogan}</span>
      <span data-testid="footer-contact">{t.footer.contact}</span>
    </div>
  );
}

// Component that mimics a page layout
function MockPageLayout() {
  return (
    <LanguageProvider>
      <Navigation />
      <main>
        <MultiTranslationTestComponent />
      </main>
    </LanguageProvider>
  );
}

describe('Language Integration Tests', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.clear.mockClear();
  });

  it('should load English as default language and display English content', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(<MockPageLayout />);

    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
    expect(screen.getByTestId('home-title')).toHaveTextContent('Latest Updates');
    expect(screen.getByTestId('home-subtitle')).toHaveTextContent('Stay connected with the campaign');
    expect(screen.getByTestId('about-title')).toHaveTextContent('About Steven V. Ceceri');
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Home');
    expect(screen.getByTestId('nav-about')).toHaveTextContent('About');
    expect(screen.getByTestId('footer-slogan')).toHaveTextContent('Common-sense leadership for the South Coast');
  });

  it('should switch to Spanish and update all components simultaneously', async () => {
    render(<MockPageLayout />);

    // Click the language switcher
    const languageButton = screen.getByTestId('lang-switcher-btn');
    fireEvent.click(languageButton);

    // Wait for dropdown to appear and click Spanish
    const spanishOption = await screen.findByText('ES');
    fireEvent.click(spanishOption);

    // Verify all components updated to Spanish
    await waitFor(() => {
      expect(screen.getByTestId('current-language')).toHaveTextContent('es');
      expect(screen.getByTestId('home-title')).toHaveTextContent('Últimas Actualizaciones');
      expect(screen.getByTestId('home-subtitle')).toHaveTextContent('Mantente conectado con la campaña');
      expect(screen.getByTestId('about-title')).toHaveTextContent('Sobre Steven V. Ceceri');
      expect(screen.getByTestId('nav-home')).toHaveTextContent('Inicio');
      expect(screen.getByTestId('nav-about')).toHaveTextContent('Acerca de');
      expect(screen.getByTestId('footer-slogan')).toHaveTextContent('Liderazgo de sentido común para la Costa Sur');
    });

    // Verify localStorage was called
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('language', 'es');
  });

  it('should switch to Portuguese and update all components simultaneously', async () => {
    render(<MockPageLayout />);

    // Click the language switcher
    const languageButton = screen.getByTestId('lang-switcher-btn');
    fireEvent.click(languageButton);

    // Wait for dropdown to appear and click Portuguese
    const portugueseOption = await screen.findByText('PT');
    fireEvent.click(portugueseOption);

    // Verify all components updated to Portuguese
    await waitFor(() => {
      expect(screen.getByTestId('current-language')).toHaveTextContent('pt');
      expect(screen.getByTestId('home-title')).toHaveTextContent('Últimas Atualizações');
      expect(screen.getByTestId('home-subtitle')).toHaveTextContent('Fique conectado com a campanha');
      expect(screen.getByTestId('about-title')).toHaveTextContent('Sobre Steven V. Ceceri');
      expect(screen.getByTestId('nav-home')).toHaveTextContent('Início');
      expect(screen.getByTestId('nav-about')).toHaveTextContent('Sobre');
      expect(screen.getByTestId('footer-slogan')).toHaveTextContent('Liderança de bom senso para a Costa Sul');
    });

    // Verify localStorage was called
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('language', 'pt');
  });

  it('should persist language choice across component re-renders', async () => {
    const { rerender } = render(<MockPageLayout />);

    // Switch to Spanish
    const languageButton = screen.getByTestId('lang-switcher-btn');
    fireEvent.click(languageButton);
    const spanishOption = await screen.findByText('ES');
    fireEvent.click(spanishOption);

    // Verify Spanish content
    await waitFor(() => {
      expect(screen.getByTestId('nav-home')).toHaveTextContent('Inicio');
    });

    // Re-render the component
    rerender(<MockPageLayout />);

    // Verify language persists
    expect(screen.getByTestId('current-language')).toHaveTextContent('es');
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Inicio');
  });

  it('should load saved language preference from localStorage on mount', () => {
    mockLocalStorage.getItem.mockReturnValue('pt');
    
    render(<MockPageLayout />);

    expect(screen.getByTestId('current-language')).toHaveTextContent('pt');
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Início');
    expect(screen.getByTestId('home-title')).toHaveTextContent('Últimas Atualizações');
  });

  it('should cycle through all three languages and maintain consistency', async () => {
    render(<MockPageLayout />);

    // Start with English
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Home');

    // Switch to Spanish
    const languageButton = screen.getByTestId('lang-switcher-btn');
    fireEvent.click(languageButton);
    const spanishOption = await screen.findByText('ES');
    fireEvent.click(spanishOption);

    await waitFor(() => {
      expect(screen.getByTestId('nav-home')).toHaveTextContent('Inicio');
    });

    // Switch to Portuguese
    fireEvent.click(languageButton);
    const portugueseOption = await screen.findByText('PT');
    fireEvent.click(portugueseOption);

    await waitFor(() => {
      expect(screen.getByTestId('nav-home')).toHaveTextContent('Início');
    });

    // Switch back to English
    fireEvent.click(languageButton);
    const englishOption = await screen.findByText('EN');
    fireEvent.click(englishOption);

    await waitFor(() => {
      expect(screen.getByTestId('nav-home')).toHaveTextContent('Home');
    });

    // Verify final localStorage call
    expect(mockLocalStorage.setItem).toHaveBeenLastCalledWith('language', 'en');
  });

  it('should handle invalid localStorage value gracefully', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid-lang');
    
    render(<MockPageLayout />);

    // Should fallback to English
    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Home');
  });

  it('should update mobile language switcher along with desktop', async () => {
    render(<MockPageLayout />);

    // Switch language using desktop switcher
    const languageButton = screen.getByTestId('lang-switcher-btn');
    fireEvent.click(languageButton);
    const spanishOption = await screen.findByText('ES');
    fireEvent.click(spanishOption);

    // Verify mobile button also updated
    await waitFor(() => {
      const mobileButton = screen.getByTestId('lang-switcher-btn-mobile');
      expect(mobileButton).toHaveTextContent('Language: ES');
    });
  });

  it('should maintain language state when navigating between components', async () => {
    const TestNavigationComponent = () => {
      const { t } = useTranslation();
      return (
        <div>
          <span data-testid="navigation-volunteer">{t.navigation.volunteer}</span>
          <span data-testid="navigation-donate">{t.navigation.donate}</span>
        </div>
      );
    };

    const { rerender } = render(
      <LanguageProvider>
        <MultiTranslationTestComponent />
      </LanguageProvider>
    );

    // Switch to Spanish
    const languageButton = screen.getByTestId('lang-switcher-btn');
    fireEvent.click(languageButton);
    const spanishOption = await screen.findByText('ES');
    fireEvent.click(spanishOption);

    await waitFor(() => {
      expect(screen.getByTestId('nav-home')).toHaveTextContent('Inicio');
    });

    // "Navigate" to different component
    rerender(
      <LanguageProvider>
        <TestNavigationComponent />
      </LanguageProvider>
    );

    // Verify language persists in new component
    expect(screen.getByTestId('navigation-volunteer')).toHaveTextContent('Voluntario');
    expect(screen.getByTestId('navigation-donate')).toHaveTextContent('Donar');
  });
});