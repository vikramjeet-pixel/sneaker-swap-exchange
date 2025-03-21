
import { Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Sneaker Collector",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    rating: 5,
    content: "SneakerSwap changed the game for me. The authentication process gives me peace of mind when buying high-value sneakers. I've completed over 30 transactions with zero issues."
  },
  {
    id: 2,
    name: "Morgan Smith",
    role: "Casual Seller",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 5,
    content: "As someone who occasionally sells from my collection, I appreciate how straightforward the platform is. Listing is easy, and I always get fair offers. The bidding system is transparent and fun!"
  },
  {
    id: 3,
    name: "Jamie Zhang",
    role: "Sneaker Reseller",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 4,
    content: "I run a small reselling business, and SneakerSwap has become my go-to marketplace. The fees are reasonable, and the community is knowledgeable and respectful. Great place to do business!"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 px-6 md:px-10 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold tracking-tight">What Our Community Says</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">See why sneaker enthusiasts choose SneakerSwap for their collections</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-foreground italic">&ldquo;{testimonial.content}&rdquo;</p>
                
                <div className="flex items-center space-x-3 pt-2">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
