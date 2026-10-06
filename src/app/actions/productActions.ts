"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // We use the service role key to bypass RLS for admin insertions securely.
    // Pure supabase-js client avoids user cookies overriding these privileges.
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const name = formData.get("name") as string;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  const newProduct = {
    name,
    slug,
    description: formData.get("description") as string,
    price: parseFloat(formData.get("price") as string),
    sale_price: formData.get("sale_price") ? parseFloat(formData.get("sale_price") as string) : null,
    stock_quantity: parseInt(formData.get("stock_quantity") as string, 10),
    sku: formData.get("sku") as string,
    material: formData.get("material") as string,
    care_instructions: formData.get("care_instructions") as string,
    published: true,
    new_arrival: formData.get("new_arrival") === "on",
    featured: formData.get("featured") === "on",
  };

  const { data: product, error } = await supabase
    .from("products")
    .insert([newProduct])
    .select()
    .single();

  if (error) {
    console.error("Error inserting product:", error);
    return { error: error.message };
  }

  // Handle Images (Just file processing)
  const imageFiles = formData.getAll("images") as File[];
  
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    if (file.size === 0) continue;

    const fileExt = file.name.split(".").pop();
    const fileName = `${product.id}/${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      continue;
    }

    const { data: publicUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    await supabase.from("product_images").insert([
      {
        product_id: product.id,
        url: publicUrlData.publicUrl,
        is_primary: i === 0,
        display_order: i,
      },
    ]);
  }

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin/products");

  return { success: true, product };
}
