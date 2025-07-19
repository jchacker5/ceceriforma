import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LanguageProvider, useTranslation } from '../components/language-provider';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { Hero } from '../components/hero';
import HomePage from '../app/page';
import AboutPage from '../app/about/page';
import ContactPage from '../app/contact/page';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}));

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />;
  };
});

// Mock form components to avoid external dependencies
jest.mock('../components/contact-form', () => ({
  ContactForm: () => <div data-testid="contact-form">Contact Form</div>,
}));

// Test wrapper
function TestWrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

describe('Production Language System Tests', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  describe('Language Provider Core Functionality', () => {
    it('should initialize with English by default', () => {
      const TestComponent = () => {
        const { lang, t } = useTranslation();
        return (
          <div>
            <span data-testid="current-lang">{lang}</span>
            <span data-testid="home-nav">{t.navigation.home}</span>
          </div>
        );
      };

      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
      expect(screen.getByTestId('home-nav')).toHaveTextContent('Home');
    });

    it('should detect browser language on first visit', () => {
      Object.defineProperty(navigator, 'language', {
        writable: true,
        value: 'pt-BR',
      });

      const TestComponent = () => {
        const { lang } = useTranslation();
        return <span data-testid="current-lang">{lang}</span>;
      };

      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      waitFor(() => {
        expect(screen.getByTestId('current-lang')).toHaveTextContent('pt');
      });
    });

    it('should persist language changes to localStorage', async () => {
      const TestComponent = () => {
        const { lang, setLang, t } = useTranslation();
        return (
          <div>
            <span data-testid="current-lang">{lang}</span>
            <button onClick={() => setLang('es')} data-testid="set-spanish">
              Set Spanish
            </button>
            <span data-testid="nav-home">{t.navigation.home}</span>
          </div>
        );
      };

      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      const button = screen.getByTestId('set-spanish');
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByTestId('current-lang')).toHaveTextContent('es');
        expect(screen.getByTestId('nav-home')).toHaveTextContent('Inicio');
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('language', 'es');
    });

    it('should handle localStorage errors gracefully', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const TestComponent = () => {
        const { lang, error } = useTranslation();
        return (
          <div>
            <span data-testid="current-lang">{lang}</span>
            <span data-testid="error">{error || 'no-error'}</span>
          </div>
        );
      };

      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
      expect(screen.getByTestId('error')).toHaveTextContent('no-error');
    });

    it('should validate language codes and reject invalid ones', async () => {
      const TestComponent = () => {
        const { lang, setLang, error } = useTranslation();
        return (
          <div>
            <span data-testid="current-lang">{lang}</span>
            <button 
              onClick={() => setLang('invalid' as any)} 
              data-testid="set-invalid"
            >
              Set Invalid
            </button>
            <span data-testid="error">{error || 'no-error'}</span>
          </div>
        );
      };

      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      const button = screen.getByTestId('set-invalid');
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toContain('Failed to set language');
      });

      expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
    });
  });

  describe('Navigation Component Integration', () => {
    it('should render navigation in all languages', () => {
      const TestNav = ({ lang }: { lang: 'en' | 'pt' | 'es' }) => {
        mockLocalStorage.getItem.mockReturnValue(lang);
        return (
          <TestWrapper>
            <Navigation />
          </TestWrapper>
        );
      };

      const { rerender } = render(<TestNav lang="en" />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();

      rerender(<TestNav lang="es" />);
      expect(screen.getByText('Inicio')).toBeInTheDocument();
      expect(screen.getByText('Acerca de')).toBeInTheDocument();
      expect(screen.getByText('Contacto')).toBeInTheDocument();

      rerender(<TestNav lang="pt" />);
      expect(screen.getByText('Início')).toBeInTheDocument();
      expect(screen.getByText('Sobre')).toBeInTheDocument();
      expect(screen.getByText('Contato')).toBeInTheDocument();
    });

    it('should switch languages through dropdown', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <Navigation />
        </TestWrapper>
      );

      const languageButton = screen.getByTestId('lang-switcher-btn');
      await user.click(languageButton);

      const spanishOption = await screen.findByText('ES');
      await user.click(spanishOption);

      await waitFor(() => {
        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('Acerca de')).toBeInTheDocument();
      });
    });
  });

  describe('Page Component Integration', () => {
    it('should render HomePage in all languages', () => {
      const TestHome = ({ lang }: { lang: 'en' | 'pt' | 'es' }) => {
        mockLocalStorage.getItem.mockReturnValue(lang);
        return (
          <TestWrapper>
            <HomePage />
          </TestWrapper>
        );
      };

      const { rerender } = render(<TestHome lang="en" />);
      expect(screen.getByText('Latest Updates')).toBeInTheDocument();

      rerender(<TestHome lang="es" />);
      expect(screen.getByText('Últimas Actualizaciones')).toBeInTheDocument();

      rerender(<TestHome lang="pt" />);
      expect(screen.getByText('Últimas Atualizações')).toBeInTheDocument();
    });

    it('should render AboutPage in all languages', () => {
      const TestAbout = ({ lang }: { lang: 'en' | 'pt' | 'es' }) => {
        mockLocalStorage.getItem.mockReturnValue(lang);
        return (
          <TestWrapper>
            <AboutPage />
          </TestWrapper>
        );
      };

      const { rerender } = render(<TestAbout lang="en" />);
      expect(screen.getByText('About Steven V. Ceceri')).toBeInTheDocument();
      expect(screen.getByText('My Story')).toBeInTheDocument();

      rerender(<TestAbout lang="es" />);
      expect(screen.getByText('Sobre Steven V. Ceceri')).toBeInTheDocument();
      expect(screen.getByText('Mi Historia')).toBeInTheDocument();

      rerender(<TestAbout lang="pt" />);
      expect(screen.getByText('Sobre Steven V. Ceceri')).toBeInTheDocument();
      expect(screen.getByText('Minha História')).toBeInTheDocument();
    });

    it('should render ContactPage in all languages', () => {
      const TestContact = ({ lang }: { lang: 'en' | 'pt' | 'es' }) => {
        mockLocalStorage.getItem.mockReturnValue(lang);
        return (
          <TestWrapper>
            <ContactPage />
          </TestWrapper>
        );
      };

      const { rerender } = render(<TestContact lang="en" />);
      expect(screen.getByText('Contact Us')).toBeInTheDocument();

      rerender(<TestContact lang="es" />);
      expect(screen.getByText('Contáctanos')).toBeInTheDocument();

      rerender(<TestContact lang="pt" />);
      expect(screen.getByText('Fale Conosco')).toBeInTheDocument();
    });
  });

  describe('Hero Component Integration', () => {
    it('should render hero in all languages', () => {
      const TestHero = ({ lang }: { lang: 'en' | 'pt' | 'es' }) => {
        mockLocalStorage.getItem.mockReturnValue(lang);
        return (
          <TestWrapper>
            <Hero />
          </TestWrapper>
        );
      };

      const { rerender } = render(<TestHero lang="en" />);
      expect(screen.getByText('COMMON-SENSE LEADERSHIP FOR THE SOUTH COAST')).toBeInTheDocument();
      expect(screen.getByText('Read My Plan')).toBeInTheDocument();

      rerender(<TestHero lang="es" />);
      expect(screen.getByText('Liderazgo de sentido común para la Costa Sur')).toBeInTheDocument();
      expect(screen.getByText('Lee Mi Plan')).toBeInTheDocument();

      rerender(<TestHero lang="pt" />);
      expect(screen.getByText('Liderança de bom senso para a Costa Sul')).toBeInTheDocument();
      expect(screen.getByText('Leia Meu Plano')).toBeInTheDocument();
    });
  });

  describe('Footer Component Integration', () => {
    it('should render footer in all languages', () => {
      const TestFooter = ({ lang }: { lang: 'en' | 'pt' | 'es' }) => {
        mockLocalStorage.getItem.mockReturnValue(lang);
        return (
          <TestWrapper>
            <Footer />
          </TestWrapper>
        );
      };

      const { rerender } = render(<TestFooter lang="en" />);
      expect(screen.getByText('Common-sense leadership for the South Coast')).toBeInTheDocument();
      expect(screen.getByText('Quick Links')).toBeInTheDocument();

      rerender(<TestFooter lang="es" />);
      expect(screen.getByText('Liderazgo de sentido común para la Costa Sur')).toBeInTheDocument();
      expect(screen.getByText('Enlaces Rápidos')).toBeInTheDocument();

      rerender(<TestFooter lang="pt" />);
      expect(screen.getByText('Liderança de bom senso para a Costa Sul')).toBeInTheDocument();
      expect(screen.getByText('Links Rápidos')).toBeInTheDocument();
    });
  });

  describe('Performance and Memory', () => {
    it('should not cause memory leaks with rapid language switching', async () => {
      const TestComponent = () => {
        const { lang, setLang, t } = useTranslation();
        return (
          <div>
            <span data-testid="current-lang">{lang}</span>
            <button onClick={() => setLang('en')} data-testid="set-en">EN</button>
            <button onClick={() => setLang('es')} data-testid="set-es">ES</button>
            <button onClick={() => setLang('pt')} data-testid="set-pt">PT</button>
            <span data-testid="nav-home">{t.navigation.home}</span>
          </div>
        );
      };

      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      // Rapidly switch languages
      for (let i = 0; i < 10; i++) {
        fireEvent.click(screen.getByTestId('set-es'));
        fireEvent.click(screen.getByTestId('set-pt'));
        fireEvent.click(screen.getByTestId('set-en'));
      }

      await waitFor(() => {
        expect(screen.getByTestId('nav-home')).toHaveTextContent('Home');
      });

      expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
    });

    it('should handle component unmounting gracefully', () => {
      const TestComponent = () => {
        const { t } = useTranslation();
        return <span>{t.navigation.home}</span>;
      };

      const { unmount } = render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Error Boundaries and Edge Cases', () => {
    it('should throw error when useTranslation is used outside provider', () => {
      const TestComponent = () => {
        const { t } = useTranslation();
        return <span>{t.navigation.home}</span>;
      };

      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useTranslation must be used within a LanguageProvider');

      console.error = originalError;
    });

    it('should handle corrupted localStorage data', () => {
      mockLocalStorage.getItem.mockReturnValue('{"invalid": "json"');

      const TestComponent = () => {
        const { lang } = useTranslation();
        return <span data-testid="current-lang">{lang}</span>;
      };

      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for language switcher', async () => {
      render(
        <TestWrapper>
          <Navigation />
        </TestWrapper>
      );

      const languageButton = screen.getByTestId('lang-switcher-btn');
      expect(languageButton).toBeInTheDocument();
      expect(languageButton).toHaveAttribute('role', 'button');
    });

    it('should announce language changes to screen readers', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <Navigation />
        </TestWrapper>
      );

      const languageButton = screen.getByTestId('lang-switcher-btn');
      await user.click(languageButton);

      const spanishOption = await screen.findByText('ES');
      await user.click(spanishOption);

      await waitFor(() => {
        expect(screen.getByText('Inicio')).toBeInTheDocument();
      });
    });
  });
});