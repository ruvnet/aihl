import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL || 'https://example.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY || 'your-anon-key';

console.warn(
  'Supabase client created with default or missing credentials. ' +
  'Please set VITE_SUPABASE_PROJECT_URL and VITE_SUPABASE_API_KEY ' +
  'environment variables for proper configuration.'
);

export const supabase = createClient(supabaseUrl, supabaseKey);