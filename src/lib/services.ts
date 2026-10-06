import { supabase } from './supabase';
import { demoProducts, Product as DemoProduct } from './demo-data';

// Determine if Supabase has been properly configured
const isSupabaseConfigured = 
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url' &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== '';

export async function getProducts(): Promise<DemoProduct[]> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name), product_images(url, is_primary, display_order)')
      .eq('published', true)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching products from Supabase:', error);
      return demoProducts;
    }

    if (!data || data.length === 0) {
      return demoProducts; // Use demo products if DB is empty
    }
    
    // Transform Supabase structure to match our frontend Product type
    return data.map((item: any) => {
      // Sort images by display_order
      const sortedImages = item.product_images?.sort((a: any, b: any) => a.display_order - b.display_order) || [];
      const imageUrls = sortedImages.length > 0 ? sortedImages.map((img: any) => img.url) : ['/placeholder.jpg'];
      
      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description || '',
        short_description: item.short_description || '',
        category: item.categories?.name || 'Uncategorized',
        price: item.price,
        sale_price: item.sale_price,
        sku: item.sku || '',
        stock_quantity: item.stock_quantity,
        material: item.material || '',
        care_instructions: item.care_instructions || '',
        images: imageUrls,
        is_new: item.new_arrival,
      };
    });
  }
  
  // Fallback to demo data
  return demoProducts;
}

export async function getProductBySlug(slug: string): Promise<DemoProduct | null> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name), product_images(url, is_primary, display_order)')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      // Fallback to demo products if not found in db or error
      return demoProducts.find(p => p.slug === slug) || null;
    }

    const sortedImages = data.product_images?.sort((a: any, b: any) => a.display_order - b.display_order) || [];
    const imageUrls = sortedImages.length > 0 ? sortedImages.map((img: any) => img.url) : ['/placeholder.jpg'];

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description || '',
      short_description: data.short_description || '',
      category: data.categories?.name || 'Uncategorized',
      price: data.price,
      sale_price: data.sale_price,
      sku: data.sku || '',
      stock_quantity: data.stock_quantity,
      material: data.material || '',
      care_instructions: data.care_instructions || '',
      images: imageUrls,
      is_new: data.new_arrival,
    };
  }

  return demoProducts.find(p => p.slug === slug) || null;
}
