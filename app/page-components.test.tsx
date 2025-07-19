import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LanguageProvider } from '@/components/language-provider';
import HomePage from './page';
import AboutPage from './about/page';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock Next.js components and hooks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}));

jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />;
  };
});

// Mock the complex components that might have external dependencies
jest.mock('@/components/hero', () => ({
  Hero: () => <div data-testid="hero-component">Hero Component</div>,
}));

jest.mock('@/components/social-feed', () => ({
  SocialFeed: ({ limit }: { limit: number }) => (
    <div data-testid="social-feed-component">Social Feed (limit: {limit})</div>
  ),
}));

jest.mock('@/components/issues-carousel', () => ({
  IssuesCarousel: () => <div data-testid="issues-carousel-component">Issues Carousel</div>,
}));

jest.mock('@/components/testimonials', () => ({
  Testimonials: () => <div data-testid="testimonials-component">Testimonials</div>,
}));

// Mock UI components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div data-testid="card-content">{children}</div>,
  CardDescription: ({ children }: { children: React.ReactNode }) => <div data-testid="card-description">{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }: { children: React.ReactNode }) => <div data-testid="card-title">{children}</div>,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, asChild, ...props }: any) => {
    if (asChild) {
      return <span {...props}>{children}</span>;
    }
    return <button {...props}>{children}</button>;
  },
}));

jest.mock('lucide-react', () => ({
  Download: () => <span data-testid="download-icon">Download</span>,
  Users: () => <span data-testid="users-icon">Users</span>,
  Heart: () => <span data-testid="heart-icon">Heart</span>,
  Wrench: () => <span data-testid="wrench-icon">Wrench</span>,
  ShieldCheck: () => <span data-testid="shield-check-icon">ShieldCheck</span>,
  Menu: () => <span data-testid="menu-icon">Menu</span>,
  X: () => <span data-testid="x-icon">X</span>,
  Facebook: () => <span data-testid="facebook-icon">Facebook</span>,
  Instagram: () => <span data-testid="instagram-icon">Instagram</span>,
  Mail: () => <span data-testid="mail-icon">Mail</span>,
  Phone: () => <span data-testid="phone-icon">Phone</span>,
  MapPin: () => <span data-testid="map-pin-icon">MapPin</span>,
}));

// Test wrapper component that includes Language provider
function TestWrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

describe('Page Components Language Integration', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.clear.mockClear();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  describe('HomePage', () => {
    it('should display English content by default', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      expect(screen.getByText('Latest Updates')).toBeInTheDocument();
      expect(screen.getByText('Stay connected with the campaign')).toBeInTheDocument();
    });

    it('should switch to Spanish when language is changed to ES', () => {
      const { rerender } = render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Simulate language change by setting localStorage and re-rendering
      mockLocalStorage.getItem.mockReturnValue('es');
      
      rerender(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      expect(screen.getByText('Últimas Actualizaciones')).toBeInTheDocument();
      expect(screen.getByText('Mantente conectado con la campaña')).toBeInTheDocument();
    });

    it('should switch to Portuguese when language is changed to PT', () => {
      mockLocalStorage.getItem.mockReturnValue('pt');
      
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      expect(screen.getByText('Últimas Atualizações')).toBeInTheDocument();
      expect(screen.getByText('Fique conectado com a campanha')).toBeInTheDocument();
    });
  });

  describe('AboutPage', () => {
    it('should display English content by default', () => {
      render(
        <TestWrapper>
          <AboutPage />
        </TestWrapper>
      );

      expect(screen.getByText('About Steven V. Ceceri')).toBeInTheDocument();
      expect(screen.getByText('A lifetime of service to the South Coast community')).toBeInTheDocument();
      expect(screen.getByText('My Story')).toBeInTheDocument();
      expect(screen.getByText('Download Resume')).toBeInTheDocument();
    });

    it('should switch to Spanish when language is changed to ES', () => {
      mockLocalStorage.getItem.mockReturnValue('es');
      
      render(
        <TestWrapper>
          <AboutPage />
        </TestWrapper>
      );

      expect(screen.getByText('Sobre Steven V. Ceceri')).toBeInTheDocument();
      expect(screen.getByText('Una vida de servicio a la comunidad de South Coast')).toBeInTheDocument();
      expect(screen.getByText('Mi Historia')).toBeInTheDocument();
      expect(screen.getByText('Descargar Currículum')).toBeInTheDocument();
    });

    it('should switch to Portuguese when language is changed to PT', () => {
      mockLocalStorage.getItem.mockReturnValue('pt');
      
      render(
        <TestWrapper>
          <AboutPage />
        </TestWrapper>
      );

      expect(screen.getByText('Sobre Steven V. Ceceri')).toBeInTheDocument();
      expect(screen.getByText('Uma vida de serviço à comunidade da Costa Sul')).toBeInTheDocument();
      expect(screen.getByText('Minha História')).toBeInTheDocument();
      expect(screen.getByText('Baixar Currículo')).toBeInTheDocument();
    });
  });

  describe('Cross-Page Language Consistency', () => {
    it('should maintain the same language across different pages', () => {
      mockLocalStorage.getItem.mockReturnValue('es');
      
      // Render HomePage
      const { rerender } = render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      expect(screen.getByText('Últimas Actualizaciones')).toBeInTheDocument();

      // Switch to AboutPage
      rerender(
        <TestWrapper>
          <AboutPage />
        </TestWrapper>
      );

      expect(screen.getByText('Sobre Steven V. Ceceri')).toBeInTheDocument();
      expect(screen.getByText('Mi Historia')).toBeInTheDocument();
    });

    it('should handle rapid language switches across pages', () => {
      const { rerender } = render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Start with English
      expect(screen.getByText('Latest Updates')).toBeInTheDocument();

      // Switch to Spanish
      mockLocalStorage.getItem.mockReturnValue('es');
      rerender(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );
      expect(screen.getByText('Últimas Actualizaciones')).toBeInTheDocument();

      // Navigate to About page in Spanish
      rerender(
        <TestWrapper>
          <AboutPage />
        </TestWrapper>
      );
      expect(screen.getByText('Sobre Steven V. Ceceri')).toBeInTheDocument();

      // Switch to Portuguese
      mockLocalStorage.getItem.mockReturnValue('pt');
      rerender(
        <TestWrapper>
          <AboutPage />
        </TestWrapper>
      );
      expect(screen.getByText('Sobre Steven V. Ceceri')).toBeInTheDocument(); // Same in Portuguese
      expect(screen.getByText('Minha História')).toBeInTheDocument();

      // Navigate back to Home in Portuguese
      rerender(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );
      expect(screen.getByText('Últimas Atualizações')).toBeInTheDocument();
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle invalid localStorage language gracefully', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-language');
      
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Should fallback to English
      expect(screen.getByText('Latest Updates')).toBeInTheDocument();
      expect(screen.getByText('Stay connected with the campaign')).toBeInTheDocument();
    });

    it('should handle null localStorage gracefully', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      render(
        <TestWrapper>
          <AboutPage />
        </TestWrapper>
      );

      // Should default to English
      expect(screen.getByText('About Steven V. Ceceri')).toBeInTheDocument();
      expect(screen.getByText('My Story')).toBeInTheDocument();
    });

    it('should handle localStorage errors gracefully', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Should still render with default English
      expect(screen.getByText('Latest Updates')).toBeInTheDocument();
    });
  });

  describe('Component Isolation', () => {
    it('should not affect components outside the LanguageProvider', () => {
      const IsolatedComponent = () => <div>Isolated Component</div>;
      
      render(
        <div>
          <IsolatedComponent />
          <TestWrapper>
            <HomePage />
          </TestWrapper>
        </div>
      );

      expect(screen.getByText('Isolated Component')).toBeInTheDocument();
      expect(screen.getByText('Latest Updates')).toBeInTheDocument();
    });
  });
});