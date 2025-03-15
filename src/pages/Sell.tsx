
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Camera, Upload, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Product name must be at least 3 characters' }),
  brand: z.string().min(1, { message: 'Please select a brand' }),
  size: z.string().min(1, { message: 'Please select a size' }),
  condition: z.string().min(1, { message: 'Please select a condition' }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Price must be a positive number',
  }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  acceptBids: z.boolean().default(false),
});

const Sell = () => {
  const [images, setImages] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      brand: '',
      size: '',
      condition: '',
      price: '',
      description: '',
      acceptBids: true,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Create preview for first image
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImages(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (images.length === 0) {
      toast({
        title: "Image Required",
        description: "Please upload at least one image of your sneakers",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted', { ...values, images });
      toast({
        title: "Listing Created",
        description: "Your sneakers have been listed for sale!",
      });
      
      // Reset form
      form.reset();
      setImages([]);
      setImagePreview(null);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Sell Your Sneakers</h1>
          <p className="text-muted-foreground">
            List your authentic sneakers for sale in our marketplace
          </p>
        </div>

        <div className="bg-card rounded-lg border shadow-sm p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Upload Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center relative bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
              <Camera className="h-8 w-8 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Upload Image</p>
            </div>

            {imagePreview && (
              <div className="aspect-square border rounded-lg relative overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Sneaker preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-background"
                  onClick={() => {
                    setImagePreview(null);
                    setImages([]);
                  }}
                >
                  <AlertCircle className="h-5 w-5 text-destructive" />
                </button>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Upload at least one high-quality image of your sneakers.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Air Jordan 1 Chicago" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Nike">Nike</SelectItem>
                        <SelectItem value="Adidas">Adidas</SelectItem>
                        <SelectItem value="Jordan">Jordan</SelectItem>
                        <SelectItem value="New Balance">New Balance</SelectItem>
                        <SelectItem value="Converse">Converse</SelectItem>
                        <SelectItem value="Vans">Vans</SelectItem>
                        <SelectItem value="Puma">Puma</SelectItem>
                        <SelectItem value="Reebok">Reebok</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size (US)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 15 }, (_, i) => {
                          const size = (i + 4).toString();
                          return (
                            <SelectItem key={size} value={size}>
                              US {size}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Brand New">Brand New</SelectItem>
                        <SelectItem value="Like New">Like New</SelectItem>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="acceptBids"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <div className="space-y-1 leading-none">
                          <FormLabel>Accept Bids</FormLabel>
                          <FormDescription className="text-xs">
                            Allow buyers to place bids below your asking price
                          </FormDescription>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your sneakers, including any defects or special features..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Be detailed and honest about the condition to avoid returns.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end space-x-4 pt-4">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Listing...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    List for Sale
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Sell;
