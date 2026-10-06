"use server";

import { createClient } from "@supabase/supabase-js";

export async function placeOrder(formData: FormData, items: any[], totalAmount: number) {
  
  // Use service role key to bypass RLS securely on the server
  // We use the basic supabase-js client so we don't attach user cookies,
  // which would override the service role permissions.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const orderId = crypto.randomUUID();

  // Validate that all cart items have valid UUIDs (real DB products)
  const isUUID = (str: string) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(str);
  for (const item of items) {
    if (!isUUID(item.product.id)) {
      return { 
        error: `Cannot process checkout: "${item.product.name}" is a static demo product. Please remove it from your cart.` 
      };
    }
  }

  const orderData = {
    id: orderId,
    customer_name: formData.get("fullName") as string,
    phone: formData.get("phone") as string,
    email: (formData.get("email") as string) || null,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    pin_code: formData.get("pinCode") as string,
    total_amount: totalAmount,
    payment_status: "Pending",
    order_status: "Pending"
  };

  // 1. Insert Order
  const { error: orderError } = await supabase
    .from("orders")
    .insert([orderData]);

  if (orderError) {
    console.error("Failed to insert order", orderError);
    return { error: orderError.message };
  }

  // 2. Prepare Order Items Data
  const orderItemsData = items.map(item => ({
    order_id: orderId,
    product_id: item.product.id,
    quantity: item.quantity,
    price_at_time: item.product.sale_price || item.product.price,
  }));

  // 3. Insert Order Items
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemsData);

  if (itemsError) {
    console.error("Failed to insert order items", itemsError);
    return { error: itemsError.message }; // Not perfectly transactional, but fine for V1
  }
  
  // 4. Update Stock Levels
  for (const item of items) {
    const newStock = Math.max(0, item.product.stock_quantity - item.quantity);
    await supabase
      .from("products")
      .update({ stock_quantity: newStock })
      .eq("id", item.product.id);
  }

  return { success: true, orderId };
}
