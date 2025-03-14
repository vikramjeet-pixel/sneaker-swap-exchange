
import { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SneakerCard, { Sneaker } from '@/components/SneakerCard';

// Sample data
const allSneakers: Sneaker[] = [
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
  },
  {
    id: '5',
    name: 'New Balance 990v5',
    brand: 'New Balance',
    imageUrl: 'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    condition: 'Good',
    price: 175,
    bidCount: 1
  },
  {
    id: '6',
    name: 'Air Max 90',
    brand: 'Nike',
    imageUrl: 'https://images.unsplash.com/photo-1585591359088-e144e8cde85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    condition: 'Excellent',
    price: 150,
    bidCount: 0
  },
  {
    id: '7',
    name: 'Converse Chuck Taylor All Star',
    brand: 'Converse',
    imageUrl: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1921&q=80',
    condition: 'Like New',
    price: 70,
    bidCount: 0
  },
  {
    id: '8',
    name: 'Vans Old Skool',
    brand: 'Vans',
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1998&q=80',
    condition: 'Good',
    price: 65,
    bidCount: 1
  }
];

const brands = ['All Brands', 'Nike', 'Adidas', 'New Balance', 'Converse', 'Vans'];
const conditions = ['All Conditions', 'New', 'Like New', 'Excellent', 'Good'];
const sortOptions = ['Recently Added', 'Price: Low to High', 'Price: High to Low', 'Most Bids'];

const Browse = () => {
  const [sneakers, setSneakers] = useState<Sneaker[]>(allSneakers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [selectedSort, setSelectedSort] = useState('Recently Added');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    let filtered = [...allSneakers];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(sneaker => 
        sneaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sneaker.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply brand filter
    if (selectedBrand !== 'All Brands') {
      filtered = filtered.filter(sneaker => sneaker.brand === selectedBrand);
    }
    
    // Apply condition filter
    if (selectedCondition !== 'All Conditions') {
      filtered = filtered.filter(sneaker => sneaker.condition === selectedCondition);
    }
    
    // Apply sorting
    switch (selectedSort) {
      case 'Price: Low to High':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Most Bids':
        filtered.sort((a, b) => b.bidCount - a.bidCount);
        break;
      default:
        // Recently Added (default, no change needed)
        break;
    }
    
    setSneakers(filtered);
  }, [searchQuery, selectedBrand, selectedCondition, selectedSort]);
  
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedBrand('All Brands');
    setSelectedCondition('All Conditions');
    setSelectedSort('Recently Added');
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Browse Sneakers</h1>
          <p className="text-muted-foreground mt-2">Find your perfect pair from our authenticated collection</p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={toggleFilters}
                className="sm:hidden flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                onClick={clearFilters}
                disabled={searchQuery === '' && selectedBrand === 'All Brands' && selectedCondition === 'All Conditions' && selectedSort === 'Recently Added'}
                className="flex items-center gap-1 ml-auto sm:ml-0"
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
          
          {/* Desktop Filters */}
          <div className="hidden sm:flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Brand:</span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-background border rounded-md px-3 py-1 text-sm outline-none focus:ring-1 focus:ring-primary"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Condition:</span>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="bg-background border rounded-md px-3 py-1 text-sm outline-none focus:ring-1 focus:ring-primary"
              >
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-muted-foreground">Sort:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-background border rounded-md px-3 py-1 text-sm outline-none focus:ring-1 focus:ring-primary"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Mobile Filters */}
          {isFilterOpen && (
            <div className="sm:hidden space-y-4 p-4 bg-card rounded-lg border animate-fade-in">
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-background border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-primary"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Condition</label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full bg-background border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-primary"
                >
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="w-full bg-background border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-primary"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {sneakers.length} {sneakers.length === 1 ? 'result' : 'results'}
          </p>
        </div>
        
        {/* Sneakers Grid */}
        {sneakers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sneakers.map(sneaker => (
              <SneakerCard key={sneaker.id} sneaker={sneaker} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-xl font-medium mb-2">No sneakers found</p>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Browse;
