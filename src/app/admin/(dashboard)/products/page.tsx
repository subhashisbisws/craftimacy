import Link from "next/link";
import { Plus, Search, MoreHorizontal, Edit, Trash, Image as ImageIcon } from "lucide-react";
import { demoProducts } from "@/lib/demo-data";

export default function AdminProductsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Products</h1>
          <p className="text-stone-500 mt-1">Manage your catalogue, inventory, and pricing.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-md hover:bg-stone-800 transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search products by name, SKU..." 
            className="w-full pl-9 pr-4 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm"
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <select className="w-full sm:w-auto border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 text-stone-700 bg-white">
            <option>All Categories</option>
            <option>Jewellery</option>
            <option>Bags</option>
            <option>Diaries</option>
          </select>
          <select className="w-full sm:w-auto border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 text-stone-700 bg-white">
            <option>Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500 font-medium">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {demoProducts.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-stone-200 flex items-center justify-center text-stone-400 shrink-0">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-stone-900">{product.name}</p>
                        <p className="text-xs text-stone-500">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4">
                    {product.stock_quantity > 0 ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        {product.stock_quantity} in stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                        Out of stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-900 font-medium">
                    ₹{product.sale_price || product.price}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-stone-100 text-stone-700">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-stone-400 hover:text-red-600 transition-colors" title="Delete">
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-stone-200 flex items-center justify-between text-sm text-stone-500">
          <p>Showing 1 to {demoProducts.length} of {demoProducts.length} entries</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-stone-200 rounded text-stone-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 border border-stone-200 rounded text-stone-900 hover:bg-stone-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
