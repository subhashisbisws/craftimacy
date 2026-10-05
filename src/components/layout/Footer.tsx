import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <Link href="/" className="font-serif text-2xl tracking-widest font-bold text-white mb-4 block">
            CRAFTIMACY
          </Link>
          <p className="text-sm leading-relaxed text-stone-400 mb-6">
            Crafted with intention. Made to be cherished. An independent artisan brand bringing you beautiful, handmade products.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/craftimacy" target="_blank" rel="noreferrer" className="text-stone-400 hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Shop</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/shop/jewellery" className="hover:text-white transition-colors">Jewellery</Link></li>
            <li><Link href="/shop/bags" className="hover:text-white transition-colors">Bags</Link></li>
            <li><Link href="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Help</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact / WhatsApp</Link></li>
            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Stay in Touch</h4>
          <p className="text-sm text-stone-400 mb-4">Subscribe for updates on new artisan collections.</p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-stone-800 border border-stone-700 text-white px-4 py-2 w-full focus:outline-none focus:border-stone-500 text-sm"
            />
            <button type="submit" className="bg-white text-stone-900 px-4 py-2 text-sm font-medium hover:bg-stone-200 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 mt-12 pt-8 border-t border-stone-800 text-sm text-stone-500 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Craftimacy. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Based in India</p>
      </div>
    </footer>
  );
}
