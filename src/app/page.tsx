import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getProducts } from "@/lib/services";

export default async function Home() {
  const allProducts = await getProducts();
  const newArrivals = allProducts.filter(p => p.is_new).slice(0, 4);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-stone-200">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-stone-300 animate-pulse"></div>
          {/* We'll use a placeholder colored div or an actual image later if provided. For now, a subtle gradient. */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-900/60 z-10" />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 drop-shadow-md">
            Crafted with intention. <br className="hidden md:block" />
            <span className="italic">Made to be cherished.</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-100 mb-10 max-w-2xl font-light drop-shadow">
            Discover our collection of independent artisan jewellery, handcrafted bags, and carefully curated accessories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop" className="bg-white text-stone-900 px-8 py-4 rounded-none font-medium hover:bg-stone-100 transition-colors flex items-center justify-center gap-2">
              Explore the Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Shop by Category</h2>
            <div className="w-16 h-0.5 bg-amber-700 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Jewellery', 'Bags', 'Diaries', 'Accessories'].map((category) => (
              <Link key={category} href={`/shop/${category.toLowerCase()}`} className="group block relative h-80 overflow-hidden bg-stone-200">
                <div className="absolute inset-0 bg-stone-300 transition-transform duration-700 group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-serif text-white drop-shadow-md tracking-wide">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">New Arrivals</h2>
              <div className="w-16 h-0.5 bg-amber-700"></div>
            </div>
            <Link href="/new-arrivals" className="hidden md:flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {newArrivals.map((item) => (
              <Link href={`/product/${item.slug}`} key={item.id} className="group cursor-pointer block">
                <div className="relative aspect-[4/5] bg-stone-100 mb-4 overflow-hidden">
                  <div className="absolute inset-0 bg-stone-200 group-hover:scale-105 transition-transform duration-700"></div>
                  {item.is_new && (
                    <div className="absolute top-4 left-4 bg-amber-700 text-white text-xs px-2 py-1 uppercase tracking-wider z-10">
                      New
                    </div>
                  )}
                </div>
                <p className="text-stone-500 text-xs uppercase tracking-wider mb-1">{item.category}</p>
                <h3 className="text-lg text-stone-900 mb-1 group-hover:text-amber-700 transition-colors">{item.name}</h3>
                <div className="flex items-center gap-2">
                  {item.sale_price ? (
                    <>
                      <span className="font-medium text-stone-900">₹{item.sale_price}</span>
                      <span className="text-stone-400 line-through text-sm">₹{item.price}</span>
                    </>
                  ) : (
                    <span className="font-medium text-stone-900">₹{item.price}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link href="/new-arrivals" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 border-b border-stone-300 pb-1">
              View all new arrivals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-stone-900 text-stone-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-serif mb-8 text-white">The Craftimacy Philosophy</h2>
            <p className="text-lg md:text-xl text-stone-300 leading-relaxed mb-10 font-light">
              We believe in the beauty of handmade. In a world of mass production, 
              we curate and create pieces that have a soul. From traditional Tibetan 
              and Naga jewellery to contemporary handmade bags, every item in our 
              collection tells a story of craftsmanship and intention.
            </p>
            <Link href="/about" className="inline-block border border-white text-white px-8 py-3 hover:bg-white hover:text-stone-900 transition-colors uppercase tracking-widest text-sm">
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif text-stone-900 mb-4">Prefer to order via WhatsApp?</h2>
          <p className="text-stone-600 mb-8 max-w-xl mx-auto">
            We love talking to our customers. Send us a message with the products you love, and we'll handle your order personally.
          </p>
          <a 
            href={`https://wa.me/${process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER || '919876543210'}`} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 font-medium hover:bg-[#1ebd5a] transition-colors rounded-full shadow-lg shadow-green-200"
          >
            <MessageCircle className="w-5 h-5" /> Message us on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
