import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSupabaseStorageUrl(bucket: string, fileName: string): string {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  if (!supabaseUrl) {
    throw new Error("VITE_SUPABASE_URL is not defined");
  }
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${fileName}`;
}
