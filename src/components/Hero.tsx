
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Hero = () => {
  const { theme } = useTheme();
  
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-20 px-6 md:px-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-[50%] -left-[25%] w-[150%] h-[150%] ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-900/10 via-background to-purple-900/10' 
            : 'bg-gradient-to-br from-blue-100 via-background to-purple-100'
        } rounded-full blur-3xl opacity-50 animate-[spin_60s_linear_infinite]`}></div>
      </div>

      <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-secondary/80 rounded-full backdrop-blur-sm animate-fade-in">
            The Premier Sneaker Marketplace
          </span>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-balance">
            Buy, Sell & Bid on
            <span className="relative ml-2">
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500">
                Exclusive Sneakers
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-full transform"></span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            Join the community of sneaker enthusiasts. Find rare pairs, sell your collection, and make competitive bids in our authenticated marketplace.
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <Badge variant="outline" className="px-3 py-1 text-sm">100% Authenticity Guaranteed</Badge>
            <Badge variant="outline" className="px-3 py-1 text-sm">Free Shipping on Orders $300+</Badge>
            <Badge variant="outline" className="px-3 py-1 text-sm">24/7 Customer Support</Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Button asChild size="lg" className="rounded-full transition-all duration-300 hover:translate-y-[-2px]">
              <Link to="/browse">
                Browse Sneakers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full transition-all duration-300 hover:translate-y-[-2px]">
              <Link to="/sell">Start Selling</Link>
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 relative w-full max-w-md">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-2xl animate-float">
            <div className="glass-card absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
              <img 
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Premium sneakers"
                className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Floating accent elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-blue-500/20 dark:bg-blue-500/10 blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-purple-500/20 dark:bg-purple-500/10 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
