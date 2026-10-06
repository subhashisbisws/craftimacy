const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) envVars[match[1]] = match[2];
});

const supabase = createClient(envVars.NEXT_PUBLIC_SUPABASE_URL, envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const demoProducts = [
  {
    name: "Oxidised Silver Jhumkas",
    slug: "oxidised-silver-jhumkas",
    description: "Handcrafted oxidised silver jhumkas with intricate detailing. Perfect for ethnic wear and festive occasions.",
    short_description: "Traditional handcrafted oxidised silver earrings.",
    price: 899,
    sku: "CR-EAR-001",
    stock_quantity: 15,
    material: "German Silver / Oxidised Metal",
    care_instructions: "Store in a dry place. Keep away from water and perfume.",
    new_arrival: true,
    published: true,
  },
  {
    name: "Blue Beaded Necklace",
    slug: "blue-beaded-necklace",
    description: "A stunning bohemian necklace made with deep blue glass beads and silver accents.",
    short_description: "Bohemian style blue beaded glass necklace.",
    price: 1299,
    sale_price: 1099,
    sku: "CR-NEC-042",
    stock_quantity: 5,
    material: "Glass beads, Metal alloy",
    care_instructions: "Wipe with a soft cloth after use.",
    new_arrival: true,
    published: true,
  }
];

async function seed() {
  const { data, error } = await supabase.from('products').insert(demoProducts).select();
  if (error) console.error("Error seeding products:", error);
  else console.log("Seeded successfully:", data.map(d => d.id));
}
seed();
