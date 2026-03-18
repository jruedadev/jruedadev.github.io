import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Logo } from '@/components/Logo';
import { useNavigateToSection } from '@/hooks/useNavigateToSection';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const goToSection = useNavigateToSection();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('light');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleNavClick = (id: string) => {
    goToSection(id);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { key: 'about', id: 'about' },
    { key: 'experience', id: 'experience' },
    { key: 'skills', id: 'skills' },
    { key: 'certifications', id: 'certifications' },
  ];

  // Links que van a páginas propias
  const handleContactClick = () => {
    navigate('/contact');
    setMobileMenuOpen(false);
  };

  const handleProjectsPageClick = () => {
    navigate('/projects');
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center">
            <Logo />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.id)}
                className={`text-foreground hover:text-primary transition-colors ${
                  location.pathname === '/' &&
                  location.hash === `#${item.id}`
                    ? 'text-primary'
                    : ''
                }`}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
            <button
              onClick={handleProjectsPageClick}
              className={`text-foreground hover:text-primary transition-colors ${
                location.pathname === '/projects' ? 'text-primary' : ''
              }`}
            >
              {t('nav.projects')}
            </button>
            <button
              onClick={handleContactClick}
              className={`text-foreground hover:text-primary transition-colors ${
                location.pathname === '/contact' ? 'text-primary' : ''
              }`}
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => changeLanguage('es')}>
                  Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-2 border-t border-border mt-4">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-2 py-2 text-foreground hover:text-primary transition-colors"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
            <button
              onClick={handleProjectsPageClick}
              className={`block w-full text-left px-2 py-2 hover:text-primary transition-colors ${
                location.pathname === '/projects' ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('nav.projects')}
            </button>
            <button
              onClick={handleContactClick}
              className={`block w-full text-left px-2 py-2 hover:text-primary transition-colors ${
                location.pathname === '/contact' ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('nav.contact')}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};