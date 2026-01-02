import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
// Prefer the new publishable key, fall back to older env name if present
const supabaseAnonKey = (import.meta.env
  .VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY) as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase env vars are missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
