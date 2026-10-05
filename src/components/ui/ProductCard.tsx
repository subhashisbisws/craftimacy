import Link from "next/link";
import { Product } from "@/lib/demo-data";

export function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = product.stock_quantity <= 0;

  return (
    <div className="group flex flex-col">
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] bg-stone-100 mb-4 overflow-hidden block">
        {/* Placeholder image background */}
        <div className="absolute inset-0 bg-stone-200 group-hover:scale-105 transition-transform duration-700"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.is_new && (
            <span className="bg-amber-700 text-white text-xs px-2 py-1 uppercase tracking-wider">
              New
            </span>
          )}
          {product.sale_price && (
            <span className="bg-red-700 text-white text-xs px-2 py-1 uppercase tracking-wider">
              Sale
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-stone-900 text-white text-xs px-2 py-1 uppercase tracking-wider">
              Sold Out
            </span>
          )}
        </div>
      </Link>
      
      <div className="flex-1 flex flex-col">
        <p className="text-stone-500 text-xs uppercase tracking-wider mb-1">{product.category}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg text-stone-900 mb-2 group-hover:text-amber-700 transition-colors font-medium">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex items-center gap-3">
          {product.sale_price ? (
            <>
              <span className="font-medium text-stone-900">₹{product.sale_price}</span>
              <span className="text-stone-400 line-through text-sm">₹{product.price}</span>
            </>
          ) : (
            <span className="font-medium text-stone-900">₹{product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
}
