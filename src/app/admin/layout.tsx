import Link from "next/link";
import { LayoutDashboard, Package, Tag, ShoppingCart, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-stone-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-stone-300 flex flex-col">
        <div className="p-6">
          <h2 className="text-white font-serif tracking-widest font-bold text-xl">CRAFTIMACY</h2>
          <p className="text-xs text-stone-500 mt-1 uppercase tracking-wider">Admin Portal</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-md bg-stone-800 text-white">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-stone-800 hover:text-white transition-colors">
            <Package className="w-5 h-5" />
            Products
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-stone-800 hover:text-white transition-colors">
            <Tag className="w-5 h-5" />
            Categories
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-stone-800 hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5" />
            Orders
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-stone-800 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t border-stone-800 mt-auto">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-md hover:bg-stone-800 hover:text-white transition-colors text-stone-400">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-stone-200 h-16 flex items-center px-8 shrink-0">
          <h1 className="font-medium text-stone-800">Admin Dashboard</h1>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
