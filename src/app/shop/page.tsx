import { getProducts } from "@/lib/services";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

export const metadata = {
  title: "Shop | Craftimacy",
  description: "Browse our complete collection of handmade jewellery, bags, and artisan accessories.",
};

export default async function ShopPage() {
  const categories = ["All", "Jewellery", "Bags", "Diaries", "T-Shirts", "Accessories"];
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">The Collection</h1>
        <div className="w-16 h-0.5 bg-amber-700 mx-auto"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar / Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="flex items-center gap-2 mb-6 lg:hidden font-medium text-stone-900">
            <SlidersHorizontal className="w-5 h-5" /> Filters
          </div>
          
          <div className="space-y-10 hidden lg:block">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-stone-900 mb-4">Categories</h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link 
                      href={cat === "All" ? "/shop" : `/shop/${cat.toLowerCase()}`}
                      className={`text-sm hover:text-amber-700 transition-colors ${cat === "All" ? "text-amber-700 font-medium" : "text-stone-600"}`}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-stone-900 mb-4">Availability</h3>
              <ul className="space-y-3">
                <li>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-4 h-4 border border-stone-300 group-hover:border-amber-700 rounded-sm"></div>
                    <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">In Stock</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-4 h-4 border border-stone-300 group-hover:border-amber-700 rounded-sm"></div>
                    <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">Out of Stock</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8 border-b border-stone-200 pb-4">
            <p className="text-sm text-stone-500">Showing all {products.length} products</p>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-stone-500">Sort by:</span>
              <select className="text-sm text-stone-900 bg-transparent border-none outline-none cursor-pointer font-medium">
                <option>Featured</option>
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
