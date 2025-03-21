
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedSneakers from '@/components/FeaturedSneakers';
import Testimonials from '@/components/Testimonials';
import BrandsShowcase from '@/components/BrandsShowcase';
import FAQ from '@/components/FAQ';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <BrandsShowcase />
      <FeaturedSneakers />
      
      {/* Statistics Section */}
      <section className="py-16 px-6 md:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold tracking-tight">Trusted by Sneakerheads</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Our community keeps growing because we prioritize authenticity and fair trades</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold">20K+</p>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold">50K+</p>
              <p className="text-muted-foreground">Transactions</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold">5K+</p>
              <p className="text-muted-foreground">Sneakers Listed</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold">99%</p>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold tracking-tight">How SneakerSwap Works</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Simple steps to buy, sell, or bid on your favorite sneakers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold">1</div>
              <h3 className="text-xl font-bold">Browse & Discover</h3>
              <p className="text-muted-foreground">Explore our curated collection of authenticated sneakers from sellers worldwide.</p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold">2</div>
              <h3 className="text-xl font-bold">Buy or Make a Bid</h3>
              <p className="text-muted-foreground">Purchase at listed price or place a competitive bid to negotiate with sellers.</p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold">3</div>
              <h3 className="text-xl font-bold">Secure Exchange</h3>
              <p className="text-muted-foreground">We verify authenticity and facilitate secure transactions between buyers and sellers.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-24 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Ready to Step Up Your Sneaker Game?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of sneaker enthusiasts buying, selling, and bidding on the most exclusive footwear today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/browse">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/sell">Sell Your Sneakers</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <FAQ />
    </main>
  );
};

export default Index;
