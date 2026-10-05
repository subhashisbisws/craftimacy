"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, X, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function NewProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // This is a UI prototype. In the real app, this form will submit to Supabase.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    
    // Check if Supabase is actually configured
    const isSupabaseConfigured = 
      process.env.NEXT_PUBLIC_SUPABASE_URL && 
      process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url' &&
      process.env.NEXT_PUBLIC_SUPABASE_URL !== '';

    if (isSupabaseConfigured) {
      // In a real app, you would upload images to Storage first, get URLs, then insert product
      // Here we just insert the textual data to demonstrate the connection
      
      const newProduct = {
        name: formData.get("name") as string,
        slug: (formData.get("name") as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        description: formData.get("description") as string,
        price: parseFloat(formData.get("price") as string),
        sale_price: formData.get("sale_price") ? parseFloat(formData.get("sale_price") as string) : null,
        stock_quantity: parseInt(formData.get("stock_quantity") as string, 10),
        sku: formData.get("sku") as string,
        material: formData.get("material") as string,
        care_instructions: formData.get("care_instructions") as string,
        published: true, // Auto publish for this demo
        new_arrival: formData.get("new_arrival") === "on",
        featured: formData.get("featured") === "on",
      };

      const { error } = await supabase.from('products').insert([newProduct]);

      if (error) {
        console.error("Error adding product:", error);
        setErrorMsg("Failed to add product to database: " + error.message);
        setIsSubmitting(false);
        return;
      }
    } else {
      // Simulate API call for demo mode
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsSubmitting(false);
    setSuccess(true);
    e.currentTarget.reset(); // Reset form
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 text-stone-400 hover:text-stone-900 transition-colors bg-white rounded-full border border-stone-200 shadow-sm">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Add New Product</h1>
          <p className="text-stone-500 text-sm mt-1">Create a new product listing in your store.</p>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <p>{errorMsg}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p>Product published successfully! It is now visible on the website.</p>
          <button className="ml-auto underline text-sm" onClick={() => setSuccess(false)}>Add another</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Content - 2/3 width */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Basic Info */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-lg font-medium text-stone-900 border-b border-stone-100 pb-2">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Product Name</label>
                <input name="name" required type="text" placeholder="e.g. Blue Beaded Jhumkas" className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                <textarea name="description" required rows={4} placeholder="Describe the product, its story, and why customers will love it..." className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm resize-y"></textarea>
              </div>
            </div>

            {/* Media/Photos */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-lg font-medium text-stone-900 border-b border-stone-100 pb-2">Product Photos</h2>
              
              <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-stone-50 transition-colors">
                <div className="w-12 h-12 bg-stone-100 text-stone-500 rounded-full flex items-center justify-center mb-3">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="font-medium text-stone-900 text-sm">Click to upload photos</p>
                <p className="text-xs text-stone-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-lg font-medium text-stone-900 border-b border-stone-100 pb-2">Additional Details</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Material</label>
                  <input name="material" type="text" placeholder="e.g. German Silver" className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Care Instructions</label>
                  <input name="care_instructions" type="text" placeholder="e.g. Wipe with dry cloth" className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm" />
                </div>
              </div>
            </div>
            
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="md:col-span-1 space-y-6">
            
            {/* Organization */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-lg font-medium text-stone-900 border-b border-stone-100 pb-2">Organization</h2>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                <select name="category" className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm bg-white">
                  <option value="">Select Category...</option>
                  <option value="Jewellery">Jewellery</option>
                  <option value="Bags">Bags</option>
                  <option value="Diaries">Diaries</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Subcategory (Optional)</label>
                <select className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm bg-white">
                  <option>Select Subcategory...</option>
                  <option>Earrings</option>
                  <option>Necklaces</option>
                  <option>Bracelets</option>
                </select>
              </div>
              
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input name="new_arrival" type="checkbox" className="w-4 h-4 text-stone-900 rounded border-stone-300 focus:ring-stone-900" />
                  <span className="text-sm text-stone-700">Mark as New Arrival</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input name="featured" type="checkbox" className="w-4 h-4 text-stone-900 rounded border-stone-300 focus:ring-stone-900" />
                  <span className="text-sm text-stone-700">Mark as Featured</span>
                </label>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-lg font-medium text-stone-900 border-b border-stone-100 pb-2">Pricing & Inventory</h2>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Price (₹)</label>
                <input name="price" required type="number" min="0" placeholder="0" className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Sale Price (₹) <span className="text-stone-400 font-normal">Optional</span></label>
                <input name="sale_price" type="number" min="0" placeholder="0" className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm" />
              </div>
              
              <div className="border-t border-stone-100 pt-4 mt-4">
                <label className="block text-sm font-medium text-stone-700 mb-1">Stock Quantity</label>
                <input name="stock_quantity" required type="number" min="0" defaultValue="1" className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">SKU</label>
                <input name="sku" type="text" placeholder="e.g. CR-EAR-001" className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm" />
              </div>
            </div>

          </div>
        </div>

        {/* Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white border-t border-stone-200 p-4 flex items-center justify-end gap-3 z-20 px-8">
          <button type="button" className="px-6 py-2 text-sm font-medium text-stone-700 bg-white border border-stone-300 rounded-md hover:bg-stone-50 transition-colors">
            Save Draft
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2 text-sm font-medium text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Publishing...
              </>
            ) : 'Publish Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
