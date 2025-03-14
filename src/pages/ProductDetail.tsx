
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Heart, Share, Clock, Check, ArrowRight, Sparkles, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Sneaker } from '@/components/SneakerCard';

// Sample data
const sneakersData: Sneaker[] = [
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
  }
];

interface ExtendedSneaker extends Sneaker {
  description?: string;
  size?: string;
  seller?: string;
  bids?: { amount: number; user: string; date: string }[];
}

const extendedData: Record<string, ExtendedSneaker> = {
  '1': {
    ...sneakersData[0],
    description: 'Iconic Air Jordan 1 Retro High OG in the classic Chicago colorway. These are in like-new condition with original box and extra laces included. Worn only once indoors for a photo shoot.',
    size: 'US 10',
    seller: 'SneakerKing',
    bids: [
      { amount: 600, user: 'sneakerhead23', date: '2023-05-15' },
      { amount: 620, user: 'kickscollector', date: '2023-05-16' },
      { amount: 625, user: 'airtime', date: '2023-05-17' },
      { amount: 635, user: 'solelover', date: '2023-05-18' },
      { amount: 640, user: 'kicksflipper', date: '2023-05-19' },
    ]
  },
  '2': {
    ...sneakersData[1],
    description: 'Adidas Yeezy Boost 350 V2 in the Zebra colorway. Good condition with minimal signs of wear. Original box included, no extra laces.',
    size: 'US 9.5',
    seller: 'YeezyCollector',
    bids: [
      { amount: 350, user: 'yeezymaster', date: '2023-05-20' },
      { amount: 365, user: 'boostlover', date: '2023-05-21' },
      { amount: 370, user: 'sneakerflip', date: '2023-05-22' },
    ]
  }
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [sneaker, setSneaker] = useState<ExtendedSneaker | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
    
    // Simulate API fetch
    setTimeout(() => {
      if (id && extendedData[id]) {
        const foundSneaker = extendedData[id];
        setSneaker(foundSneaker);
        setSelectedImage(foundSneaker.imageUrl);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: !isFavorite ? "Added to favorites" : "Removed from favorites",
      description: !isFavorite ? "This item has been added to your favorites" : "This item has been removed from your favorites",
    });
  };
  
  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bidAmount) {
      toast({
        title: "Bid amount required",
        description: "Please enter a valid bid amount",
        variant: "destructive",
      });
      return;
    }
    
    const bidValue = parseFloat(bidAmount);
    
    if (isNaN(bidValue) || bidValue <= 0) {
      toast({
        title: "Invalid bid amount",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }
    
    if (sneaker && bidValue <= sneaker.price * 0.8) {
      toast({
        title: "Bid too low",
        description: "Your bid must be at least 80% of the asking price",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Bid submitted successfully",
      description: `Your bid of $${bidValue.toLocaleString()} has been placed`,
    });
    
    // Clear the input
    setBidAmount('');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 md:px-10 flex items-center justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-5xl">
          <div className="h-8 bg-muted rounded-md w-1/3"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 aspect-square bg-muted rounded-lg"></div>
            <div className="md:w-1/2 space-y-6">
              <div className="h-8 bg-muted rounded-md w-3/4"></div>
              <div className="h-6 bg-muted rounded-md w-1/2"></div>
              <div className="h-24 bg-muted rounded-md w-full"></div>
              <div className="h-10 bg-muted rounded-md w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!sneaker) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 md:px-10 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">The sneaker you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/browse">Browse Other Sneakers</Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Link 
            to="/browse" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Browse
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-secondary/30 aspect-square">
              <img
                src={selectedImage}
                alt={sneaker.name}
                className="w-full h-full object-cover"
                onLoad={handleImageLoad}
              />
              
              {sneaker.isFeatured && (
                <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-full glass-card z-10">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span>Featured</span>
                </div>
              )}
            </div>
            
            {/* Additional images would go here */}
          </div>
          
          {/* Details Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{sneaker.brand}</p>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    onClick={toggleFavorite}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart 
                      className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "fill-transparent"}`} 
                    />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    aria-label="Share"
                  >
                    <Share className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <h1 className="text-3xl font-display font-bold">{sneaker.name}</h1>
              
              <div className="flex items-center space-x-4">
                <p className="text-xl font-bold">${sneaker.price.toLocaleString()}</p>
                <p className="text-sm px-2 py-1 bg-secondary rounded-full">
                  Size: {sneaker.size}
                </p>
                <p className="text-sm px-2 py-1 bg-secondary rounded-full">
                  {sneaker.condition}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Description</p>
              <p className="text-muted-foreground">{sneaker.description}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" />
                <span>Authenticity guaranteed</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Seller typically ships within 2 business days</span>
              </div>
            </div>
            
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">Buy Now</TabsTrigger>
                <TabsTrigger value="bid">Place Bid</TabsTrigger>
              </TabsList>
              
              <TabsContent value="buy" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <p className="font-medium">Buy for ${sneaker.price.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">
                    Secure this pair immediately at the listed price
                  </p>
                </div>
                
                <Button size="lg" className="w-full">
                  Buy Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </TabsContent>
              
              <TabsContent value="bid" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <p className="font-medium">Current Highest Bid: ${sneaker.bids ? Math.max(...sneaker.bids.map(bid => bid.amount)).toLocaleString() : '0'}</p>
                  <p className="text-sm text-muted-foreground">
                    {sneaker.bidCount} active {sneaker.bidCount === 1 ? 'bid' : 'bids'}
                  </p>
                </div>
                
                <form onSubmit={handleBidSubmit} className="space-y-4">
                  <div className="flex items-center">
                    <span className="bg-muted px-3 py-2 rounded-l-md border-y border-l">$</span>
                    <Input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder="Enter your bid amount"
                      className="rounded-l-none"
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>Bids are binding. If the seller accepts, you'll be committed to purchase.</p>
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full">
                    Place Bid
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Seller: <span className="font-medium text-foreground">{sneaker.seller}</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Bids History Section */}
        {sneaker.bids && sneaker.bids.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold mb-6">Bid History</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">User</th>
                    <th className="text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sneaker.bids.sort((a, b) => b.amount - a.amount).map((bid, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4 font-medium">${bid.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-muted-foreground">{bid.user}</td>
                      <td className="py-3 px-4 text-muted-foreground">{bid.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
