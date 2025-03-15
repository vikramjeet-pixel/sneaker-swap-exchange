
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import AuthButton from './AuthButton';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Browse', path: '/browse' },
    { title: 'Sell', path: '/sell' },
    { title: 'Bids', path: '/bids' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10",
      isScrolled ? "bg-background/80 backdrop-blur-lg border-b" : "bg-background border-b"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="font-display font-bold text-xl">SneakerSwap</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "font-medium transition-all duration-200 hover:text-primary/80 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left",
                location.pathname === link.path ? "text-primary after:scale-x-100" : "text-muted-foreground"
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav>
        
        {/* Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <AuthButton />
          <ThemeToggle />
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 top-[72px] bg-background z-40 transition-transform duration-300 ease-in-out transform md:hidden border-t",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col py-8 px-6 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "font-medium py-3 px-4 rounded-md transition-colors",
                location.pathname === link.path 
                  ? "bg-secondary text-primary" 
                  : "text-muted-foreground hover:bg-secondary/50"
              )}
            >
              {link.title}
            </Link>
          ))}
          <div className="flex mt-4 space-x-4 px-4">
            <Button variant="outline" size="icon" className="w-full justify-start">
              <Search className="h-5 w-5 mr-2" />
              <span>Search</span>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
