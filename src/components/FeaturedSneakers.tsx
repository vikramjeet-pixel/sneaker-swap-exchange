
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SneakerCard, { Sneaker } from './SneakerCard';
import { Link } from 'react-router-dom';

// Sample data
const featuredSneakers: Sneaker[] = [
  {
    id: '1',
    name: 'Air Jordan 1 Retro High OG',
    brand: 'Nike',
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    condition: 'Like New',
    price: 650,
    bidCount: 5,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Yeezy Boost 350 V2',
    brand: 'Adidas',
    imageUrl: 'https://images.unsplash.com/photo-1584735175315-9d5df23be0c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    condition: 'Good',
    price: 380,
    bidCount: 3,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Air Force 1 Low',
    brand: 'Nike',
    imageUrl: 'https://images.unsplash.com/photo-1603787081207-362bcef7c144?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
    condition: 'Excellent',
    price: 180,
    bidCount: 2,
    isFeatured: true
  },
  {
    id: '4',
    name: 'Dunk Low Retro',
    brand: 'Nike',
    imageUrl: 'https://images.unsplash.com/photo-1612015670817-0127d21628d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    condition: 'New',
    price: 240,
    bidCount: 0,
    isFeatured: true
  }
];

const FeaturedSneakers = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3; // Number of visible cards on desktop
  
  const handlePrev = () => {
    setStartIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setStartIndex(prev => Math.min(featuredSneakers.length - visibleCount, prev + 1));
  };
  
  const hasPrev = startIndex > 0;
  const hasNext = startIndex < featuredSneakers.length - visibleCount;

  return (
    <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-10">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tight">Featured Sneakers</h2>
            <p className="text-muted-foreground mt-2">Hand-picked premium listings you don't want to miss</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                disabled={!hasPrev}
                className="rounded-full transition-all duration-200"
                aria-label="Previous"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={!hasNext}
                className="rounded-full transition-all duration-200"
                aria-label="Next"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="ghost" asChild>
              <Link to="/browse">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Desktop Carousel */}
        <div className="hidden md:grid grid-cols-3 gap-6 overflow-hidden">
          {featuredSneakers.slice(startIndex, startIndex + visibleCount).map((sneaker) => (
            <SneakerCard key={sneaker.id} sneaker={sneaker} />
          ))}
        </div>
        
        {/* Mobile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-6">
          {featuredSneakers.slice(0, 4).map((sneaker) => (
            <SneakerCard key={sneaker.id} sneaker={sneaker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSneakers;
