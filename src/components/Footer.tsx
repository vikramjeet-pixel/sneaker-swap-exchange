
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Link to="/" className="inline-flex items-center space-x-2">
            <span className="font-display font-bold text-xl">SneakerSwap</span>
          </Link>
          <p className="text-muted-foreground max-w-md">
            SneakerSwap is the premier marketplace for buying, selling and bidding on 
            authenticated sneakers from collectors around the world.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/browse" className="text-muted-foreground hover:text-foreground transition-colors">Browse Sneakers</Link>
            </li>
            <li>
              <Link to="/sell" className="text-muted-foreground hover:text-foreground transition-colors">Sell Sneakers</Link>
            </li>
            <li>
              <Link to="/bids" className="text-muted-foreground hover:text-foreground transition-colors">Active Bids</Link>
            </li>
            <li>
              <Link to="/authentication" className="text-muted-foreground hover:text-foreground transition-colors">Authentication Process</Link>
            </li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Support</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQs</Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
            </li>
            <li>
              <Link to="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">Shipping Info</Link>
            </li>
            <li>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} SneakerSwap. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
