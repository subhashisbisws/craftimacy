"use client";

import Link from "next/link";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { useCart } from "@/lib/CartContext";

export function Header() {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-stone-600 hover:text-stone-900">
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo */}
        <Link href="/" className="font-serif text-2xl tracking-widest font-bold text-stone-900">
          CRAFTIMACY
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <Link href="/shop" className="hover:text-stone-900 transition-colors">Shop</Link>
          <Link href="/shop/jewellery" className="hover:text-stone-900 transition-colors">Jewellery</Link>
          <Link href="/shop/bags" className="hover:text-stone-900 transition-colors">Bags</Link>
          <Link href="/new-arrivals" className="hover:text-stone-900 transition-colors text-amber-700">New Arrivals</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-stone-600 hover:text-stone-900 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/cart" className="p-2 text-stone-600 hover:text-stone-900 transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-amber-700 text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
