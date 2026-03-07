-- ADD ADDRESS AND CITY TO REGISTRATIONS
-- Run this in Supabase Dashboard > SQL Editor

-- 1. Add 'address' column
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS address TEXT;

-- 2. Add 'city' column
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS city TEXT;

-- 3. Force Cache Reload
NOTIFY pgrst, 'reload config';
