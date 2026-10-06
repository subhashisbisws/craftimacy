import { Package, ShoppingCart, AlertCircle, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Dashboard Overview</h1>
        <p className="text-stone-500 mt-1">Welcome back, Adrija. Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-stone-500 font-medium text-sm">Total Products</h3>
            <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-semibold text-stone-900">42</div>
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +3 this week
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-stone-500 font-medium text-sm">Recent Orders</h3>
            <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-semibold text-stone-900">12</div>
          <p className="text-sm text-stone-500 mt-2">In the last 7 days</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-stone-500 font-medium text-sm">Low Stock Items</h3>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-semibold text-stone-900">5</div>
          <p className="text-sm text-amber-600 mt-2">Needs your attention</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-stone-500 font-medium text-sm">Out of Stock</h3>
            <div className="p-2 bg-red-50 rounded-lg text-red-600">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-semibold text-stone-900">2</div>
          <p className="text-sm text-red-600 mt-2">Currently unavailable</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-stone-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors text-left flex flex-col gap-2">
            <span className="text-2xl">+</span>
            Add New Product
          </button>
          <button className="p-4 bg-white border border-stone-200 text-stone-900 rounded-lg font-medium hover:bg-stone-50 transition-colors text-left flex flex-col gap-2">
            <span className="text-xl">📦</span>
            Update Inventory
          </button>
        </div>
      </div>
    </div>
  );
}
