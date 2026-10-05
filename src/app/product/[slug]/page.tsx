import { getProductBySlug, getProducts } from "@/lib/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Heart, Share2, MessageCircle } from "lucide-react";
import { AddToCartForm } from "@/components/ui/AddToCartForm";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} | Craftimacy`,
    description: product.short_description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  const isOutOfStock = product.stock_quantity <= 0;
  
  // WhatsApp pre-fill message
  const whatsappNumber = process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER || "919876543210";
  const whatsappMessage = encodeURIComponent(
    `Hi Craftimacy, I would like to order:\n\n*${product.name}*\nSKU: ${product.sku}\nQuantity: 1\nPrice: ₹${product.sale_price || product.price}`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-stone-500 mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <Link href="/shop" className="hover:text-stone-900 transition-colors">Shop</Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <Link href={`/shop/${product.category.toLowerCase()}`} className="hover:text-stone-900 transition-colors">{product.category}</Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-stone-900 font-medium" aria-current="page">{product.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-stone-100 relative overflow-hidden group">
            {/* Placeholder for primary image */}
            <div className="absolute inset-0 bg-stone-200 animate-pulse"></div>
            {product.is_new && (
              <span className="absolute top-4 left-4 z-10 bg-amber-700 text-white text-xs px-2 py-1 uppercase tracking-wider">
                New Arrival
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {/* Thumbnails placeholders */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-stone-200 cursor-pointer hover:opacity-80 transition-opacity"></div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            {product.sale_price ? (
              <>
                <span className="text-2xl font-medium text-amber-700">₹{product.sale_price}</span>
                <span className="text-lg text-stone-400 line-through">₹{product.price}</span>
              </>
            ) : (
              <span className="text-2xl font-medium text-stone-900">₹{product.price}</span>
            )}
          </div>

          <p className="text-stone-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <AddToCartForm product={product} />

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mb-10">
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

          {/* Extra Actions */}
          <div className="flex items-center gap-6 border-t border-b border-stone-200 py-4 mb-8">
            <button className="flex items-center gap-2 text-sm text-stone-600 hover:text-amber-700 transition-colors">
              <Heart className="w-4 h-4" /> Add to Wishlist
            </button>
            <button className="flex items-center gap-2 text-sm text-stone-600 hover:text-amber-700 transition-colors">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>

          {/* Accordion Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-stone-900 mb-2">Product Details</h3>
              <ul className="text-sm text-stone-600 space-y-2">
                <li><span className="font-medium text-stone-900">SKU:</span> {product.sku}</li>
                <li><span className="font-medium text-stone-900">Category:</span> {product.category}</li>
                <li><span className="font-medium text-stone-900">Material:</span> {product.material}</li>
              </ul>
            </div>
            
            {product.care_instructions && (
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-stone-900 mb-2">Care Instructions</h3>
                <p className="text-sm text-stone-600">
                  {product.care_instructions}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
