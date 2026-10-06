import { createClient } from '@supabase/supabase-js';

// Use dummy values to prevent crash when env isn't configured yet
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummyproject.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
