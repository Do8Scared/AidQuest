import { createClient } from '@supabase/supabase-js';

// These environment variables will need to be provided by the user in a .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Add a quick check to see if the .env variables loaded properly
console.log("Supabase URL loaded:", import.meta.env.VITE_SUPABASE_URL ? "Yes" : "No");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);