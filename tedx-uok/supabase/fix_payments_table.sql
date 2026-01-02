-- FIX PAYMENTS TABLE SCHEMA
-- Run this in Supabase Dashboard > SQL Editor

-- 1. Ensure 'amount' column exists
ALTER TABLE payments 
ADD COLUMN IF NOT EXISTS amount NUMERIC(10, 2);

-- 2. Ensure 'currency' column exists
ALTER TABLE payments 
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'LKR';

-- 3. Force PostgREST Schema Cache Reload
-- (Sometimes the API cache gets stale even after structure changes)
NOTIFY pgrst, 'reload config';
