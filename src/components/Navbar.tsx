import { useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

// Type for the motion component
type MotionComponent = typeof motion.div;

import { Button } from '@/components/ui/button';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { cn } from '@/lib/utils';

// NavItem component
const NavItem = ({ item, activeSection }: NavItemComponentProps) => (
  <a
    href={item.href}
    onClick={(e) => {
      e.preventDefault();
      const element = document.getElementById(item.id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }}
    className={cn(
      'px-3 py-2 rounded-md text-sm font-medium transition-colors',
      activeSection === item.id
        ? 'text-primary font-semibold'
        : 'text-foreground/70 hover:text-foreground'
    )}
  >
    {item.label}
  </a>
);

// MobileNavItem component
const MobileNavItem = ({ item, activeSection, setIsMobileMenuOpen }: MobileNavItemProps) => (
  <a
    href={item.href}
    onClick={(e) => {
      e.preventDefault();
      const element = document.getElementById(item.id);
      element?.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }}
    className={cn(
      'block px-3 py-2 rounded-md text-base font-medium transition-colors',
      activeSection === item.id
        ? 'bg-foreground/5 text-primary'
        : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
    )}
  >
    {item.label}
  </a>
);

interface NavItemProps {
  label: string;
  href: string;
  id: string;
}

interface NavItemComponentProps {
  item: NavItemProps;
  activeSection: string;
}

interface MobileNavItemProps extends NavItemComponentProps {
  setIsMobileMenuOpen: (value: boolean) => void;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, setTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollProgress, isScrolled } = useScrollProgress();
  const pathname = usePathname() || '';
  
  const ThemeIcon = theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />;
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const navItems: NavItemProps[] = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Smooth scroll progress indicator
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Navbar background opacity
  const navBgOpacity = useTransform(
    scrollYProgress,
    [0, 0.1],
    [0, 1]
  );
  
  // Scroll to top function for navigation items
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50 origin-left"
        style={{ scaleX: pathLength }}
      />
      
      <motion.header
        ref={navRef}
        style={{ 
          backgroundColor: isScrolled ? 'hsl(var(--background) / 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none'
        }}
        className="fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b border-border/10"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <a 
                href="#home" 
                className="text-2xl font-extrabold bg-gradient-to-r from-primary via-accent to-foreground bg-clip-text text-transparent tracking-tight"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#home');
                }}
              >
                Basit
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavItem key={item.href} item={item} activeSection={activeSection} />
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-foreground/70 hover:bg-foreground/5"
                aria-label="Toggle theme"
              >
                {ThemeIcon}
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground/70 hover:bg-foreground/5"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden fixed inset-x-0 top-16 bg-background/95 backdrop-blur-sm border-b border-foreground/10 shadow-lg"
              style={{ willChange: 'opacity, transform' }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <MobileNavItem 
                    key={item.href} 
                    item={item} 
                    activeSection={activeSection}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Progress Bar - Only render when scrolled */}
        {isScrolled && (
          <motion.div
            className="h-0.5 bg-gradient-to-r from-primary to-purple-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ 
              transformOrigin: 'left center',
              willChange: 'transform' 
            }}
          />
        )}
</motion.header>
      <ScrollToTop />
    </>
  );
};

export default Navbar;