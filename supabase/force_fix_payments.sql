-- FORCE FIX PAYMENTS RLS
-- Run this in Supabase Dashboard > SQL Editor

-- 1. Reset RLS on payments table
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- 2. DROP ALL existing policies on payments to be safe
DROP POLICY IF EXISTS "Public can insert payments" ON payments;
DROP POLICY IF EXISTS "Public can select payments" ON payments;
DROP POLICY IF EXISTS "Enable insert for everyone" ON payments;
DROP POLICY IF EXISTS "Enable select for everyone" ON payments;

-- 3. Create permissive INSERT policy for Anon users
CREATE POLICY "Public can insert payments"
ON payments FOR INSERT
TO anon
WITH CHECK (true);

-- 4. Create permissive SELECT policy for Anon users (needed to return ID)
CREATE POLICY "Public can select payments"
ON payments FOR SELECT
TO anon
USING (true);


-- 5. Force schema cache reload
NOTIFY pgrst, 'reload config';
