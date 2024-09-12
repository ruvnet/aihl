import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

let supabase;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase configuration is missing. Please set VITE_SUPABASE_PROJECT_URL and VITE_SUPABASE_API_KEY in your .env file.');
  supabase = {
    auth: {
      signInWithPassword: () => Promise.reject(new Error('Supabase is not configured')),
      signOut: () => Promise.reject(new Error('Supabase is not configured')),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      getSession: () => Promise.resolve({ data: { session: null } }),
    },
    from: () => ({
      select: () => Promise.reject(new Error('Supabase is not configured')),
      insert: () => Promise.reject(new Error('Supabase is not configured')),
      update: () => Promise.reject(new Error('Supabase is not configured')),
      delete: () => Promise.reject(new Error('Supabase is not configured')),
    }),
  };
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export { supabase };