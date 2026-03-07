-- FORCE FIX REGISTRATIONS RLS
-- Run this in Supabase Dashboard > SQL Editor

-- 1. REGISTRATIONS TABLE (Resetting Policies)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Drop ALL potential policies to ensure a clean slate
DROP POLICY IF EXISTS "Public can insert registrations" ON registrations;
DROP POLICY IF EXISTS "Anon can insert registrations" ON registrations;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON registrations;
DROP POLICY IF EXISTS "Enable read access for all users" ON registrations;
DROP POLICY IF EXISTS "Public can select registrations" ON registrations;

-- Re-create the specific policies we need
-- A. Allow Insert
CREATE POLICY "Public can insert registrations"
ON registrations
FOR INSERT
TO anon
WITH CHECK (true);

-- B. Allow Select (Crucial for returning the ID)
CREATE POLICY "Public can select registrations"
ON registrations
FOR SELECT
TO anon
USING (true);

-- 2. VERIFY
-- After running this, the "new row violates row-level security policy" error MUST disappear.
