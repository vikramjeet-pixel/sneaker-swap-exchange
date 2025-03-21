
import { cn } from "@/lib/utils";

const brands = [
  {
    name: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png",
    class: "w-16 md:w-20"
  },
  {
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png",
    class: "w-20 md:w-24"
  },
  {
    name: "New Balance",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/2560px-New_Balance_logo.svg.png",
    class: "w-20 md:w-24"
  },
  {
    name: "Puma",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Puma_logo.png/2560px-Puma_logo.png",
    class: "w-18 md:w-20"
  },
  {
    name: "Converse",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Converse_logo.svg/1280px-Converse_logo.svg.png",
    class: "w-24 md:w-28"
  },
  {
    name: "Reebok",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Reebok_2019_logo.svg/2560px-Reebok_2019_logo.svg.png",
    class: "w-20 md:w-24"
  }
];

const BrandsShowcase = () => {
  return (
    <section className="py-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">Top Brands Available</h2>
          <p className="text-muted-foreground">Authentic products from the world's leading footwear brands</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
              <img 
                src={brand.logo} 
                alt={`${brand.name} logo`} 
                className={cn("h-auto object-contain", brand.class)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsShowcase;
