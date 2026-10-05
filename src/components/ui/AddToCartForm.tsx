"use client";

import { useState } from "react";
import { Product } from "@/lib/demo-data";
import { useCart } from "@/lib/CartContext";
import { ShoppingBag } from "lucide-react";

export function AddToCartForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const isOutOfStock = product.stock_quantity <= 0;

  const handleAdd = () => {
    if (!isOutOfStock) {
      addToCart(product, quantity);
      // Optional: Add some toast notification here
    }
  };

  return (
    <div className="space-y-6 mb-10">
      {/* Quantity Selector */}
      <div>
        <h3 className="text-sm font-medium uppercase tracking-wider text-stone-900 mb-3">Quantity</h3>
        <div className="flex items-center w-32 border border-stone-300">
          <button 
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
          >
            -
          </button>
          <input 
            type="number" 
            value={quantity}
            readOnly
            className="w-full text-center py-2 focus:outline-none bg-transparent" 
          />
          <button 
            type="button"
            onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
            className="px-4 py-2 text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isOutOfStock ? 'bg-red-500' : 'bg-green-500'}`}></div>
        <span className={`text-sm font-medium ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
          {isOutOfStock ? 'Out of Stock' : `${product.stock_quantity} in stock`}
        </span>
      </div>

      {/* Add to Cart Button */}
      <button 
        onClick={handleAdd}
        disabled={isOutOfStock}
        className={`w-full flex items-center justify-center gap-2 py-4 font-medium uppercase tracking-wider text-sm transition-colors
          ${isOutOfStock 
            ? 'bg-stone-200 text-stone-500 cursor-not-allowed' 
            : 'bg-stone-900 text-white hover:bg-stone-800'
          }`}
      >
        <ShoppingBag className="w-4 h-4" />
        {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
      </button>
    </div>
  );
}
