-- COMPREHENSIVE RLS FIX
-- Run this in Supabase Dashboard > SQL Editor

-- 0. EVENTS TABLE (Fixes "No Active Event Found")
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can select events" ON events;
CREATE POLICY "Public can select events" ON events FOR SELECT TO anon USING (true);


-- 1. REGISTRATIONS TABLE
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow Anonymous Inserts
DROP POLICY IF EXISTS "Public can insert registrations" ON registrations;
CREATE POLICY "Public can insert registrations"
ON registrations FOR INSERT
TO anon
WITH CHECK (true);

-- Allow Anonymous Selects (Required to return the registration_id after insert)
-- NOTE: In production, you might want to restrict this further (e.g., by session ID), 
-- but for a public form getting a return ID, this is necessary if using .select().
DROP POLICY IF EXISTS "Public can select registrations" ON registrations;
CREATE POLICY "Public can select registrations"
ON registrations FOR SELECT
TO anon
USING (true);


-- 2. PAYMENTS TABLE
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Allow Anonymous Inserts
DROP POLICY IF EXISTS "Public can insert payments" ON payments;
CREATE POLICY "Public can insert payments"
ON payments FOR INSERT
TO anon
WITH CHECK (true);

-- Allow Anonymous Selects (To return payment_id)
DROP POLICY IF EXISTS "Public can select payments" ON payments;
CREATE POLICY "Public can select payments"
ON payments FOR SELECT
TO anon
USING (true);
