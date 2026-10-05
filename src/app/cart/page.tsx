"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { Trash2, ArrowRight, MessageCircle, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch on initial render

  const whatsappNumber = process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER || "919876543210";
  
  const generateWhatsAppMessage = () => {
    let message = "Hi Craftimacy, I would like to order the following items from my cart:\n\n";
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   SKU: ${item.product.sku}\n`;
      message += `   Qty: ${item.quantity}\n`;
      message += `   Price: ₹${item.product.sale_price || item.product.price}\n\n`;
    });
    message += `*Total: ₹${cartTotal}*\n`;
    return encodeURIComponent(message);
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage()}`;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-serif text-stone-900 mb-4">Your cart is empty</h1>
        <p className="text-stone-500 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our artisan collections to find something beautiful.
        </p>
        <Link 
          href="/shop"
          className="inline-flex items-center justify-center px-8 py-3 bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors"
        >
          Explore the Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-10">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-6 py-6 border-b border-stone-200">
              <div className="w-24 h-32 bg-stone-100 shrink-0">
                {/* Image Placeholder */}
                <div className="w-full h-full bg-stone-200"></div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <Link href={`/product/${item.product.slug}`} className="font-medium text-stone-900 hover:text-amber-700 transition-colors text-lg">
                      {item.product.name}
                    </Link>
                    <p className="text-stone-500 text-sm mt-1">{item.product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-stone-900">₹{(item.product.sale_price || item.product.price) * item.quantity}</p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-stone-500 mt-1">₹{item.product.sale_price || item.product.price} each</p>
                    )}
                  </div>
                </div>

                <div className="mt-auto flex justify-between items-center">
                  <div className="flex items-center w-28 border border-stone-300">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1 text-stone-500 hover:text-stone-900 hover:bg-stone-50"
                    >-</button>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      readOnly 
                      className="w-full text-center py-1 focus:outline-none bg-transparent text-sm" 
                    />
                    <button 
                      onClick={() => updateQuantity(item.product.id, Math.min(item.product.stock_quantity, item.quantity + 1))}
                      className="px-3 py-1 text-stone-500 hover:text-stone-900 hover:bg-stone-50"
                    >+</button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-sm text-stone-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-4 flex justify-between items-center">
            <Link href="/shop" className="text-sm font-medium text-stone-600 hover:text-stone-900 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
            </Link>
            <button 
              onClick={clearCart}
              className="text-sm text-stone-500 hover:text-stone-900 underline"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-stone-50 p-6 md:p-8 border border-stone-200">
            <h2 className="text-xl font-serif text-stone-900 mb-6 border-b border-stone-200 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="flex justify-between text-lg font-medium text-stone-900 mb-8 border-t border-stone-200 pt-4">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
            
            <div className="space-y-3">
              <Link 
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-4 bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors uppercase tracking-wider text-sm"
              >
                Proceed to Checkout
              </Link>
              
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-stone-300"></div>
                <span className="flex-shrink-0 mx-4 text-stone-400 text-xs uppercase">or</span>
                <div className="flex-grow border-t border-stone-300"></div>
              </div>
              
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 font-medium uppercase tracking-wider text-sm border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Order via WhatsApp
              </a>
            </div>
            
            <p className="text-xs text-center text-stone-500 mt-6 leading-relaxed">
              Taxes and shipping calculated at checkout. WhatsApp orders are processed manually by our team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
