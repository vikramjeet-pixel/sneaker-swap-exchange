
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Sneaker {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  condition: string;
  price: number;
  bidCount: number;
  isFeatured?: boolean;
}

interface SneakerCardProps {
  sneaker: Sneaker;
  className?: string;
}

const SneakerCard = ({ sneaker, className }: SneakerCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link 
      to={`/product/${sneaker.id}`}
      className={cn(
        "group relative bg-card overflow-hidden rounded-xl transition-all duration-300",
        isHovered ? "shadow-lg scale-[1.02]" : "shadow-md hover:shadow-lg",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <img
          src={sneaker.imageUrl}
          alt={sneaker.name}
          onLoad={handleImageLoad}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        
        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFavorite}
          className="absolute top-3 right-3 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-all duration-300 z-10"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            className={cn("h-4 w-4 transition-all", 
              isFavorite ? "fill-red-500 text-red-500" : "fill-transparent"
            )} 
          />
        </Button>
        
        {/* Featured badge */}
        {sneaker.isFeatured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-background/50 backdrop-blur-sm text-primary z-10">
            <Sparkles className="h-3 w-3 text-yellow-500" />
            <span>Featured</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-2 bg-background">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-medium text-muted-foreground">{sneaker.brand}</p>
            <h3 className="font-semibold text-lg line-clamp-1">{sneaker.name}</h3>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Condition: <span className="font-medium text-foreground">{sneaker.condition}</span></p>
            {sneaker.bidCount > 0 && (
              <p className="text-xs text-muted-foreground">{sneaker.bidCount} active {sneaker.bidCount === 1 ? 'bid' : 'bids'}</p>
            )}
          </div>
          <p className="font-bold text-lg">${sneaker.price.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Hover overlay with CTA */}
      <div className={cn(
        "absolute inset-x-0 bottom-0 h-[60px] flex items-center justify-center bg-gradient-to-t from-background to-transparent p-4 transition-all duration-300",
        isHovered ? "opacity-100" : "opacity-0"
      )}>
        <Button 
          className="w-full rounded-full transition-all shadow-lg"
          aria-label="View details"
        >
          View Details
        </Button>
      </div>
    </Link>
  );
};

export default SneakerCard;
