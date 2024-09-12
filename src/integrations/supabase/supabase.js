import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_PROJECT_URL is not set in the environment variables');
}

if (!supabaseKey) {
  throw new Error('VITE_SUPABASE_API_KEY is not set in the environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);