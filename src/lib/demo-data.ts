export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  category: string;
  price: number;
  sale_price: number | null;
  sku: string;
  stock_quantity: number;
  material: string;
  care_instructions: string;
  images: string[];
  is_new: boolean;
};

export const demoProducts: Product[] = [
  {
    id: "1",
    name: "Oxidised Silver Jhumkas",
    slug: "oxidised-silver-jhumkas",
    description: "Handcrafted oxidised silver jhumkas with intricate detailing. Perfect for ethnic wear and festive occasions. These earrings are lightweight and comfortable for all-day wear.",
    short_description: "Traditional handcrafted oxidised silver earrings.",
    category: "Jewellery",
    price: 899,
    sale_price: null,
    sku: "CR-EAR-001",
    stock_quantity: 15,
    material: "German Silver / Oxidised Metal",
    care_instructions: "Store in a dry place. Keep away from water and perfume.",
    images: ["/placeholder.jpg"], // We'll use a CSS placeholder in the UI
    is_new: true,
  },
  {
    id: "2",
    name: "Blue Beaded Necklace",
    slug: "blue-beaded-necklace",
    description: "A stunning bohemian necklace made with deep blue glass beads and silver accents. It adds a pop of color to both western and traditional outfits.",
    short_description: "Bohemian style blue beaded glass necklace.",
    category: "Jewellery",
    price: 1299,
    sale_price: 1099,
    sku: "CR-NEC-042",
    stock_quantity: 5,
    material: "Glass beads, Metal alloy",
    care_instructions: "Wipe with a soft cloth after use.",
    images: ["/placeholder.jpg"],
    is_new: true,
  },
  {
    id: "3",
    name: "Tibetan Coral Pendant",
    slug: "tibetan-coral-pendant",
    description: "Authentic Tibetan style pendant featuring synthetic coral and turquoise stones set in a vintage silver-tone base.",
    short_description: "Vintage style Tibetan pendant with coral stones.",
    category: "Jewellery",
    price: 1599,
    sale_price: null,
    sku: "CR-PEN-018",
    stock_quantity: 2,
    material: "Synthetic coral, Turquoise, White Metal",
    care_instructions: "Avoid exposure to harsh chemicals.",
    images: ["/placeholder.jpg"],
    is_new: false,
  },
  {
    id: "4",
    name: "Handmade Sling Bag",
    slug: "handmade-sling-bag",
    description: "Woven cotton sling bag with traditional tribal motifs. Features an adjustable strap, inner zip pocket, and magnetic closure.",
    short_description: "Cotton woven tribal motif sling bag.",
    category: "Bags",
    price: 1850,
    sale_price: null,
    sku: "CR-BAG-105",
    stock_quantity: 8,
    material: "100% Cotton, Vegan Leather accents",
    care_instructions: "Hand wash cold separately.",
    images: ["/placeholder.jpg"],
    is_new: false,
  },
  {
    id: "5",
    name: "Handcrafted Leather Diary",
    slug: "handcrafted-leather-diary",
    description: "A beautiful artisan diary with a distressed leather cover and handmade unlined paper. Perfect for sketching, journaling, or as a thoughtful gift.",
    short_description: "Vintage style distressed leather journal.",
    category: "Diaries",
    price: 950,
    sale_price: null,
    sku: "CR-DIA-003",
    stock_quantity: 20,
    material: "Cruelty-free Leather, Handmade paper",
    care_instructions: "Keep away from moisture.",
    images: ["/placeholder.jpg"],
    is_new: false,
  },
  {
    id: "6",
    name: "Block Print T-Shirt",
    slug: "block-print-t-shirt",
    description: "Comfortable organic cotton t-shirt featuring traditional Rajasthani block print patterns. Each piece is uniquely printed by hand.",
    short_description: "Organic cotton hand-block printed tee.",
    category: "T-Shirts",
    price: 1199,
    sale_price: 999,
    sku: "CR-TSH-022",
    stock_quantity: 0, // Out of stock example
    material: "Organic Cotton",
    care_instructions: "Machine wash cold inside out. Do not iron on print.",
    images: ["/placeholder.jpg"],
    is_new: false,
  }
];
