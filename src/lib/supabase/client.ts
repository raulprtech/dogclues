import { createClient } from '@supabase/supabase-js';

// These would normally be loaded from environment variables.
// Using dummy values for the prototype to avoid crashing if env is missing.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
