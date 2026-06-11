export interface Brand {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  color: string;
  bgColor: string;
  logo: string;
  heroImage: string;
  productCount: number;
  featured: boolean;
}

export interface Product {
  id: string;
  name: string;
  brandId: string;
  brandName: string;
  categoryId: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  ageRange: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isTrending: boolean;
  isFeatured: boolean;
  videoUrl?: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  productCount: number;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  bgColor: string;
  textColor: string;
}

export const categories: Category[] = [
  { id: "cat1", name: "Action Figures", slug: "action-figures", icon: "🦸", color: "#e8174b", productCount: 124 },
  { id: "cat2", name: "Dolls & Fashion", slug: "dolls", icon: "👗", color: "#8a5dca", productCount: 98 },
  { id: "cat3", name: "Building Sets", slug: "building-sets", icon: "🏗️", color: "#2255cc", productCount: 87 },
  { id: "cat4", name: "RC Vehicles", slug: "rc-vehicles", icon: "🚗", color: "#0a9c8e", productCount: 63 },
  { id: "cat5", name: "Arts & Crafts", slug: "arts-crafts", icon: "🎨", color: "#f5a623", productCount: 75 },
  { id: "cat6", name: "Outdoor Play", slug: "outdoor-play", icon: "🌳", color: "#22c55e", productCount: 52 },
  { id: "cat7", name: "Board Games", slug: "board-games", icon: "🎲", color: "#f97316", productCount: 44 },
  { id: "cat8", name: "Science & STEM", slug: "stem", icon: "🔬", color: "#0ea5e9", productCount: 38 },
];

export const brands: Brand[] = [
  {
    id: "b1", name: "BrickWorld", slug: "brickworld", tagline: "Build Your Imagination",
    description: "Premium building block sets that inspire creativity in children of all ages. From starter kits to master builder collections.",
    color: "#2255cc", bgColor: "#dbeafe",
    logo: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=200&h=200&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1400&h=700&fit=crop&auto=format",
    productCount: 48, featured: true,
  },
  {
    id: "b2", name: "StarDolls", slug: "stardolls", tagline: "Dream. Dress. Play.",
    description: "Fashion-forward dolls and accessories that celebrate creativity, diversity, and self-expression.",
    color: "#8a5dca", bgColor: "#f3e8ff",
    logo: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&h=200&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1400&h=700&fit=crop&auto=format",
    productCount: 36, featured: true,
  },
  {
    id: "b3", name: "TurboRace", slug: "turborace", tagline: "Speed. Thrills. Victory.",
    description: "High-performance RC cars, trucks, and drones for kids who love the thrill of speed.",
    color: "#0a9c8e", bgColor: "#ccfbf1",
    logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=700&fit=crop&auto=format",
    productCount: 29, featured: true,
  },
  {
    id: "b4", name: "HeroForce", slug: "heroforce", tagline: "Unleash Your Inner Hero",
    description: "Epic action figures and playsets from your favorite superhero universes.",
    color: "#e8174b", bgColor: "#fee2e2",
    logo: "https://images.unsplash.com/photo-1608889825271-9696283c3ea0?w=200&h=200&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1608889825271-9696283c3ea0?w=1400&h=700&fit=crop&auto=format",
    productCount: 52, featured: true,
  },
  {
    id: "b5", name: "ColorSplash", slug: "colorsplash", tagline: "Every Color, Every Child",
    description: "Award-winning arts & crafts kits that spark creativity and develop fine motor skills.",
    color: "#f5a623", bgColor: "#fef3c7",
    logo: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1400&h=700&fit=crop&auto=format",
    productCount: 41, featured: false,
  },
  {
    id: "b6", name: "MiniWorld", slug: "miniworld", tagline: "Big Adventures, Tiny Scale",
    description: "Collectible miniature figures and sets that create entire worlds in your hands.",
    color: "#ec4899", bgColor: "#fce7f3",
    logo: "https://images.unsplash.com/photo-1620503374956-c942862f0372?w=200&h=200&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1620503374956-c942862f0372?w=1400&h=700&fit=crop&auto=format",
    productCount: 67, featured: true,
  },
  {
    id: "b7", name: "SplashZone", slug: "splashzone", tagline: "Make a Splash",
    description: "Premium water toys and outdoor play equipment for endless summer fun.",
    color: "#0ea5e9", bgColor: "#e0f2fe",
    logo: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&h=200&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&h=700&fit=crop&auto=format",
    productCount: 23, featured: false,
  },
  {
    id: "b8", name: "RoboKids", slug: "robokids", tagline: "The Future of Play",
    description: "Educational robotics and STEM kits that teach coding, engineering, and problem solving.",
    color: "#6366f1", bgColor: "#e0e7ff",
    logo: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=200&h=200&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1400&h=700&fit=crop&auto=format",
    productCount: 31, featured: false,
  },
];

export const products: Product[] = [
  {
    id: "p1", name: "BrickWorld City Mega Set", brandId: "b1", brandName: "BrickWorld",
    categoryId: "cat3", categoryName: "Building Sets",
    price: 89.99, originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&auto=format",
    ],
    description: "Build a complete city with over 2,000 premium building pieces. Includes city hall, fire station, shopping mall, and 12 minifigures.",
    features: ["2,000+ premium bricks", "12 minifigures included", "Compatible with all major brands", "Ages 8+", "LED lighting kit compatible"],
    ageRange: "8-14", rating: 4.8, reviewCount: 342, isNew: false, isTrending: true, isFeatured: true, inStock: true,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "p2", name: "StarDolls Fashion House", brandId: "b2", brandName: "StarDolls",
    categoryId: "cat2", categoryName: "Dolls & Fashion",
    price: 49.99, originalPrice: 64.99,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=800&fit=crop&auto=format"],
    description: "A complete fashion studio with 3 poseable dolls, 20+ outfits, and a full runway setup. Design your own looks!",
    features: ["3 poseable dolls", "20+ mix-and-match outfits", "Runway set included", "Accessories kit", "Ages 4+"],
    ageRange: "4-10", rating: 4.7, reviewCount: 218, isNew: true, isTrending: true, isFeatured: true, inStock: true,
  },
  {
    id: "p3", name: "TurboRace Max Pro 4WD", brandId: "b3", brandName: "TurboRace",
    categoryId: "cat4", categoryName: "RC Vehicles",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&auto=format"],
    description: "Pro-grade 4WD RC car with 40km/h top speed, full suspension, and waterproof electronics. Race on any terrain.",
    features: ["40km/h top speed", "4-wheel drive", "Waterproof electronics", "60min battery life", "2.4GHz remote"],
    ageRange: "8+", rating: 4.9, reviewCount: 487, isNew: false, isTrending: true, isFeatured: true, inStock: true,
  },
  {
    id: "p4", name: "HeroForce Ultimate Titan", brandId: "b4", brandName: "HeroForce",
    categoryId: "cat1", categoryName: "Action Figures",
    price: 34.99, originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1608889825271-9696283c3ea0?w=600&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1608889825271-9696283c3ea0?w=800&h=800&fit=crop&auto=format"],
    description: "The 12-inch ultimate titan action figure with 32 points of articulation, light-up chest armor, and battle sounds.",
    features: ["32 points of articulation", "Light-up armor", "Battle sound effects", "10 accessories included", "Ages 4+"],
    ageRange: "4-12", rating: 4.6, reviewCount: 156, isNew: false, isTrending: false, isFeatured: true, inStock: true,
  },
  {
    id: "p5", name: "ColorSplash Rainbow Kit Pro", brandId: "b5", brandName: "ColorSplash",
    categoryId: "cat5", categoryName: "Arts & Crafts",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=800&fit=crop&auto=format"],
    description: "Complete art studio kit with 200+ non-toxic supplies. Includes paints, brushes, canvases, and step-by-step project guides.",
    features: ["200+ art supplies", "Non-toxic & washable", "25 project guides", "Carrying case included", "Ages 5+"],
    ageRange: "5-12", rating: 4.5, reviewCount: 203, isNew: true, isTrending: false, isFeatured: false, inStock: true,
  },
  {
    id: "p6", name: "MiniWorld Mystery Ball Series 5", brandId: "b6", brandName: "MiniWorld",
    categoryId: "cat1", categoryName: "Action Figures",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1620503374956-c942862f0372?w=600&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1620503374956-c942862f0372?w=800&h=800&fit=crop&auto=format"],
    description: "Crack open the mystery ball to reveal one of 50 ultra-rare collectible mini figures. Collect them all!",
    features: ["50 figures to collect", "5 ultra-rare figures", "Series 5 exclusive", "Collector checklist", "Ages 3+"],
    ageRange: "3+", rating: 4.7, reviewCount: 891, isNew: true, isTrending: true, isFeatured: true, inStock: true,
  },
  {
    id: "p7", name: "SplashZone Mega Blaster X", brandId: "b7", brandName: "SplashZone",
    categoryId: "cat6", categoryName: "Outdoor Play",
    price: 29.99, originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=800&fit=crop&auto=format"],
    description: "The ultimate water blaster with motorized pump, 1.5L tank, and 20-foot range. Perfect for backyard battles.",
    features: ["Motorized pump", "1.5L water tank", "20-foot range", "Ergonomic grip", "Ages 6+"],
    ageRange: "6+", rating: 4.8, reviewCount: 324, isNew: false, isTrending: true, isFeatured: false, inStock: true,
  },
  {
    id: "p8", name: "RoboKids Starter Bot", brandId: "b8", brandName: "RoboKids",
    categoryId: "cat8", categoryName: "Science & STEM",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=800&fit=crop&auto=format"],
    description: "Build, program, and play with your own robot! Includes 150+ components and a free app with 30 coding challenges.",
    features: ["150+ components", "Free coding app", "30 challenges", "Voice control", "Ages 7+"],
    ageRange: "7-14", rating: 4.9, reviewCount: 147, isNew: true, isTrending: false, isFeatured: true, inStock: true,
  },
  {
    id: "p9", name: "BrickWorld Space Station", brandId: "b1", brandName: "BrickWorld",
    categoryId: "cat3", categoryName: "Building Sets",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?w=600&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?w=800&h=800&fit=crop&auto=format"],
    description: "Blast off with the ultimate space station set! 3,200 pieces, 8 astronaut figures, and a working launch pad.",
    features: ["3,200 pieces", "8 astronaut figures", "Launch pad mechanism", "Solar panels", "Ages 10+"],
    ageRange: "10+", rating: 4.9, reviewCount: 211, isNew: true, isTrending: true, isFeatured: true, inStock: false,
  },
  {
    id: "p10", name: "HeroForce Battle Pack 6", brandId: "b4", brandName: "HeroForce",
    categoryId: "cat1", categoryName: "Action Figures",
    price: 59.99, originalPrice: 74.99,
    image: "https://images.unsplash.com/photo-1608889825271-9696283c3ea0?w=600&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1608889825271-9696283c3ea0?w=800&h=800&fit=crop&auto=format"],
    description: "The complete HeroForce squad! 6 detailed action figures with weapons, vehicles, and battle base.",
    features: ["6 unique figures", "Battle base included", "2 vehicles", "40 accessories", "Ages 5+"],
    ageRange: "5-12", rating: 4.7, reviewCount: 298, isNew: false, isTrending: true, isFeatured: false, inStock: true,
  },
  {
    id: "p11", name: "StarDolls Princess Castle", brandId: "b2", brandName: "StarDolls",
    categoryId: "cat2", categoryName: "Dolls & Fashion",
    price: 79.99, originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=800&fit=crop&auto=format"],
    description: "A magical 3-story castle with working elevator, light-up ballroom, and 2 exclusive princess dolls.",
    features: ["3-story castle", "Working elevator", "Light-up ballroom", "2 exclusive dolls", "Ages 3+"],
    ageRange: "3-10", rating: 4.6, reviewCount: 175, isNew: false, isTrending: false, isFeatured: true, inStock: true,
  },
  {
    id: "p12", name: "TurboRace Stunt Drone Pro", brandId: "b3", brandName: "TurboRace",
    categoryId: "cat4", categoryName: "RC Vehicles",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&auto=format"],
    description: "Perform aerial flips, rolls, and 360° spins with this pro-level stunt drone. HD camera included.",
    features: ["HD camera", "Auto flip stunts", "Altitude hold", "15-min flight time", "Ages 8+"],
    ageRange: "8+", rating: 4.5, reviewCount: 234, isNew: true, isTrending: false, isFeatured: false, inStock: true,
  },
];

export const heroBanners: HeroBanner[] = [
  {
    id: "hero1",
    title: "Summer of Play",
    subtitle: "The biggest outdoor toys collection is here. Splash, race, and adventure all summer long.",
    ctaText: "Shop Now",
    ctaLink: "/products",
    image: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=1600&h=800&fit=crop&auto=format",
    bgColor: "#0d1b4b",
    textColor: "#ffffff",
  },
  {
    id: "hero2",
    title: "Build. Create. Explore.",
    subtitle: "New BrickWorld City Mega Sets — 2,000+ pieces, endless possibilities.",
    ctaText: "Explore BrickWorld",
    ctaLink: "/brands/brickworld",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1600&h=800&fit=crop&auto=format",
    bgColor: "#1e3a8a",
    textColor: "#ffffff",
  },
  {
    id: "hero3",
    title: "Collect Them All",
    subtitle: "MiniWorld Mystery Ball Series 5 — 50 rare figures, infinite surprises.",
    ctaText: "Start Collecting",
    ctaLink: "/brands/miniworld",
    image: "https://images.unsplash.com/photo-1620503374956-c942862f0372?w=1600&h=800&fit=crop&auto=format",
    bgColor: "#831843",
    textColor: "#ffffff",
  },
];

export const videos = [
  {
    id: "v1",
    title: "TurboRace Max Pro in Action",
    brand: "TurboRace",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
    duration: "2:34",
    views: "1.2M",
  },
  {
    id: "v2",
    title: "MiniWorld Series 5 Unboxing",
    brand: "MiniWorld",
    thumbnail: "https://images.unsplash.com/photo-1620503374956-c942862f0372?w=600&h=400&fit=crop&auto=format",
    duration: "4:12",
    views: "856K",
  },
  {
    id: "v3",
    title: "BrickWorld City: Time-lapse Build",
    brand: "BrickWorld",
    thumbnail: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop&auto=format",
    duration: "6:48",
    views: "2.1M",
  },
  {
    id: "v4",
    title: "SplashZone Summer Battles",
    brand: "SplashZone",
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&auto=format",
    duration: "3:22",
    views: "445K",
  },
];
