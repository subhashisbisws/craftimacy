"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { placeOrder } from "@/app/actions/orderActions";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const result = await placeOrder(formData, items, cartTotal);
    
    if (result.error) {
      setErrorMsg(result.error);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }
  };

  if (!mounted) return null;

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-xl">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-serif text-stone-900 mb-4">Order Received!</h1>
        <p className="text-stone-600 mb-8 leading-relaxed">
          Thank you for shopping with Craftimacy. Your order has been placed successfully. We'll send you an email or WhatsApp message with tracking details once it ships.
        </p>
        <Link 
          href="/shop"
          className="inline-flex items-center justify-center px-8 py-3 bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors uppercase tracking-wider text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-serif text-stone-900 mb-4">Checkout unavailable</h1>
        <p className="text-stone-500 mb-8 max-w-md mx-auto">
          You don't have any items in your cart to checkout.
        </p>
        <Link href="/shop" className="text-amber-700 font-medium hover:underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Return to Cart
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
        {/* Checkout Form */}
        <div className="flex-1">
          <h1 className="text-3xl font-serif text-stone-900 mb-8">Checkout</h1>
          
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-10">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
                {errorMsg}
              </div>
            )}
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-medium text-stone-900 mb-4 border-b border-stone-200 pb-2">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Email <span className="text-stone-400 font-normal">(Optional)</span></label>
                  <input name="email" type="email" placeholder="you@example.com" className="w-full px-4 py-2 rounded-none border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Phone Number *</label>
                  <input name="phone" required type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-2 rounded-none border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white" />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-medium text-stone-900 mb-4 border-b border-stone-200 pb-2">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Full Name *</label>
                  <input name="fullName" required type="text" className="w-full px-4 py-2 rounded-none border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Street Address *</label>
                  <input name="address" required type="text" placeholder="House number and street name" className="w-full px-4 py-2 rounded-none border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">City *</label>
                    <input name="city" required type="text" className="w-full px-4 py-2 rounded-none border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">State *</label>
                    <select name="state" required className="w-full px-4 py-2 rounded-none border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white">
                      <option value="">Select State</option>
                      <option>Maharashtra</option>
                      <option>Delhi</option>
                      <option>Karnataka</option>
                      <option>Tamil Nadu</option>
                      <option>Gujarat</option>
                      {/* ... other states ... */}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">PIN Code *</label>
                    <input name="pinCode" required type="text" className="w-full px-4 py-2 rounded-none border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Country</label>
                    <input type="text" value="India" readOnly className="w-full px-4 py-2 rounded-none border border-stone-200 bg-stone-50 text-stone-500 focus:outline-none cursor-not-allowed" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method - Simplified for V1 */}
            <div>
              <h2 className="text-xl font-medium text-stone-900 mb-4 border-b border-stone-200 pb-2">Payment</h2>
              <div className="bg-stone-50 p-4 border border-stone-200 text-sm text-stone-600 rounded">
                <p className="font-medium text-stone-900 mb-1">Offline Payment / Cash on Delivery</p>
                <p>For V1, payments will be coordinated via WhatsApp after placing the order.</p>
              </div>
            </div>
            
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-stone-50 p-6 md:p-8 border border-stone-200 sticky top-24">
            <h2 className="text-lg font-medium text-stone-900 mb-6 border-b border-stone-200 pb-2">Your Order</h2>
            
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3 text-sm">
                  <div className="w-12 h-16 bg-stone-200 shrink-0 relative">
                    <span className="absolute -top-2 -right-2 bg-stone-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-stone-900 line-clamp-1">{item.product.name}</p>
                    <p className="text-stone-500 text-xs mt-0.5">{item.product.category}</p>
                  </div>
                  <div className="font-medium text-stone-900">
                    ₹{(item.product.sale_price || item.product.price) * item.quantity}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 py-4 border-t border-b border-stone-200 mb-6 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="text-stone-500">Free</span>
              </div>
            </div>
            
            <div className="flex justify-between text-xl font-serif text-stone-900 mb-8">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
            
            <button 
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center py-4 bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors uppercase tracking-wider text-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
