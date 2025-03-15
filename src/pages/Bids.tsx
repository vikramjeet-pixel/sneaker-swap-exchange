
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Tag, 
  Check, 
  X, 
  Clock, 
  ArrowUp, 
  ArrowDown,
  ChevronRight, 
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Sample data for bids
interface Bid {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  bidAmount: number;
  askingPrice: number;
  bidDate: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  isIncoming?: boolean;
}

const sampleBids: Bid[] = [
  {
    id: 'bid1',
    productId: '1',
    productName: 'Air Jordan 1 Retro High OG',
    productImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    bidAmount: 600,
    askingPrice: 650,
    bidDate: '2023-05-15',
    status: 'pending',
    isIncoming: false,
  },
  {
    id: 'bid2',
    productId: '2',
    productName: 'Yeezy Boost 350 V2',
    productImage: 'https://images.unsplash.com/photo-1584735175315-9d5df23be0c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    bidAmount: 350,
    askingPrice: 380,
    bidDate: '2023-05-20',
    status: 'pending',
    isIncoming: false,
  },
  {
    id: 'bid3',
    productId: '3',
    productName: 'Nike Dunk Low',
    productImage: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    bidAmount: 210,
    askingPrice: 220,
    bidDate: '2023-05-22',
    status: 'accepted',
    isIncoming: false,
  },
  {
    id: 'bid4',
    productId: '4',
    productName: 'New Balance 550',
    productImage: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    bidAmount: 145,
    askingPrice: 160,
    bidDate: '2023-05-25',
    status: 'rejected',
    isIncoming: false,
  },
  {
    id: 'bid5',
    productId: '5',
    productName: 'Air Jordan 4 Retro',
    productImage: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80',
    bidAmount: 415,
    askingPrice: 420,
    bidDate: '2023-05-27',
    status: 'pending',
    isIncoming: true,
  },
  {
    id: 'bid6',
    productId: '6',
    productName: 'Nike Air Max 90',
    productImage: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1915&q=80',
    bidAmount: 180,
    askingPrice: 200,
    bidDate: '2023-06-01',
    status: 'pending',
    isIncoming: true,
  },
];

const Bids = () => {
  const [outgoingBids, setOutgoingBids] = useState<Bid[]>([]);
  const [incomingBids, setIncomingBids] = useState<Bid[]>([]);
  const [activeTab, setActiveTab] = useState<string>('outgoing');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const outgoing = sampleBids.filter(bid => !bid.isIncoming);
      const incoming = sampleBids.filter(bid => bid.isIncoming);
      
      setOutgoingBids(outgoing);
      setIncomingBids(incoming);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleAcceptBid = (bidId: string) => {
    setIncomingBids(prev => 
      prev.map(bid => 
        bid.id === bidId ? { ...bid, status: 'accepted' } : bid
      )
    );

    toast({
      title: "Bid Accepted",
      description: "You have accepted the bid. Please contact the buyer to complete the transaction.",
    });
  };

  const handleRejectBid = (bidId: string) => {
    setIncomingBids(prev => 
      prev.map(bid => 
        bid.id === bidId ? { ...bid, status: 'rejected' } : bid
      )
    );

    toast({
      title: "Bid Rejected",
      description: "You have rejected the bid.",
    });
  };

  const handleCancelBid = (bidId: string) => {
    setOutgoingBids(prev => 
      prev.map(bid => 
        bid.id === bidId ? { ...bid, status: 'rejected' } : bid
      )
    );

    toast({
      title: "Bid Cancelled",
      description: "Your bid has been cancelled successfully.",
    });
  };

  // Helper function to format percentage
  const getPercentage = (bidAmount: number, askingPrice: number) => {
    const percentage = (bidAmount / askingPrice) * 100;
    return percentage.toFixed(1) + '%';
  };

  // Helper function to get status badge style
  const getStatusBadge = (status: Bid['status']) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <Check className="mr-1 h-3 w-3" />
            Accepted
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            <X className="mr-1 h-3 w-3" />
            Rejected
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
            <Clock className="mr-1 h-3 w-3" />
            Expired
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded-md w-1/4 mb-6"></div>
            <div className="h-12 bg-muted rounded-md w-full mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-muted rounded-md w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-6">Your Bids</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="outgoing">Bids You've Made</TabsTrigger>
            <TabsTrigger value="incoming">Bids You've Received</TabsTrigger>
          </TabsList>
          
          <TabsContent value="outgoing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Your Outgoing Bids</CardTitle>
                <CardDescription>
                  Track the status of bids you've placed on sneakers
                </CardDescription>
              </CardHeader>
              <CardContent>
                {outgoingBids.length === 0 ? (
                  <div className="text-center py-12">
                    <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No bids yet</h3>
                    <p className="text-muted-foreground mb-6">You haven't placed any bids on sneakers yet</p>
                    <Button asChild>
                      <Link to="/browse">Browse Sneakers</Link>
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Bid Amount</TableHead>
                        <TableHead className="hidden md:table-cell">Asking Price</TableHead>
                        <TableHead className="hidden md:table-cell">Bid Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {outgoingBids.map((bid) => (
                        <TableRow key={bid.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="h-12 w-12 rounded overflow-hidden bg-secondary flex-shrink-0">
                                <img 
                                  src={bid.productImage} 
                                  alt={bid.productName} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="truncate">
                                <Link 
                                  to={`/product/${bid.productId}`}
                                  className="font-medium hover:text-primary truncate"
                                >
                                  {bid.productName}
                                </Link>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span className="font-medium">{bid.bidAmount}</span>
                              <span className="text-xs text-muted-foreground ml-1">
                                {bid.bidAmount < bid.askingPrice ? (
                                  <span className="flex items-center text-amber-500">
                                    <ArrowDown className="h-3 w-3 mr-0.5" />
                                    {getPercentage(bid.bidAmount, bid.askingPrice)}
                                  </span>
                                ) : (
                                  <span className="flex items-center text-green-500">
                                    <ArrowUp className="h-3 w-3 mr-0.5" />
                                    {getPercentage(bid.bidAmount, bid.askingPrice)}
                                  </span>
                                )}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">${bid.askingPrice}</TableCell>
                          <TableCell className="hidden md:table-cell">{bid.bidDate}</TableCell>
                          <TableCell>{getStatusBadge(bid.status)}</TableCell>
                          <TableCell className="text-right">
                            {bid.status === 'pending' ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCancelBid(bid.id)}
                              >
                                Cancel Bid
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                              >
                                <Link to={`/product/${bid.productId}`}>
                                  View Item
                                  <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="incoming" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Bids on Your Listings</CardTitle>
                <CardDescription>
                  Manage bids from buyers interested in your sneakers
                </CardDescription>
              </CardHeader>
              <CardContent>
                {incomingBids.length === 0 ? (
                  <div className="text-center py-12">
                    <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No incoming bids</h3>
                    <p className="text-muted-foreground mb-6">You haven't received any bids on your listings yet</p>
                    <Button asChild>
                      <Link to="/sell">List a Sneaker</Link>
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Bid Amount</TableHead>
                        <TableHead className="hidden md:table-cell">Your Price</TableHead>
                        <TableHead className="hidden md:table-cell">Bid Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {incomingBids.map((bid) => (
                        <TableRow key={bid.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="h-12 w-12 rounded overflow-hidden bg-secondary flex-shrink-0">
                                <img 
                                  src={bid.productImage} 
                                  alt={bid.productName} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="truncate">
                                <Link 
                                  to={`/product/${bid.productId}`}
                                  className="font-medium hover:text-primary truncate"
                                >
                                  {bid.productName}
                                </Link>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span className="font-medium">{bid.bidAmount}</span>
                              <span className="text-xs text-muted-foreground ml-1">
                                {bid.bidAmount < bid.askingPrice ? (
                                  <span className="flex items-center text-amber-500">
                                    <ArrowDown className="h-3 w-3 mr-0.5" />
                                    {getPercentage(bid.bidAmount, bid.askingPrice)}
                                  </span>
                                ) : (
                                  <span className="flex items-center text-green-500">
                                    <ArrowUp className="h-3 w-3 mr-0.5" />
                                    {getPercentage(bid.bidAmount, bid.askingPrice)}
                                  </span>
                                )}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">${bid.askingPrice}</TableCell>
                          <TableCell className="hidden md:table-cell">{bid.bidDate}</TableCell>
                          <TableCell>{getStatusBadge(bid.status)}</TableCell>
                          <TableCell className="text-right">
                            {bid.status === 'pending' ? (
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRejectBid(bid.id)}
                                >
                                  <X className="mr-1 h-4 w-4" />
                                  Reject
                                </Button>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleAcceptBid(bid.id)}
                                >
                                  <Check className="mr-1 h-4 w-4" />
                                  Accept
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                              >
                                <Link to={`/product/${bid.productId}`}>
                                  View Item
                                  <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Accepting a bid creates a binding agreement to sell.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Bids;
