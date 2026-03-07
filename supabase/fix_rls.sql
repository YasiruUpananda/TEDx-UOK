-- FIX RLS POLICIES FOR REGISTRATIONS AND PAYMENTS

-- 1. REGISTRATIONS TABLE
-- Enable RLS to be safe
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Remove potentially conflicting or incorrect policies for anon/insert
DROP POLICY IF EXISTS "Public can insert registrations" ON registrations;
DROP POLICY IF EXISTS "Anon can insert registrations" ON registrations;

-- Create the correct policy allowing anonymous inserts
CREATE POLICY "Public can insert registrations"
ON registrations
FOR INSERT
TO anon
WITH CHECK (true);

-- 2. PAYMENTS TABLE
-- Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Remove potentially conflicting or incorrect policies for anon/insert
DROP POLICY IF EXISTS "Public can insert payments" ON payments;
DROP POLICY IF EXISTS "Anon can insert payments" ON payments;

-- Create the correct policy allowing anonymous inserts
CREATE POLICY "Public can insert payments"
ON payments
FOR INSERT
TO anon
WITH CHECK (true);

-- 3. VERIFICATION (Optional - Run manually in SQL Editor)
-- You can verify by running:
-- SELECT count(*) FROM pg_policies WHERE tablename = 'registrations' OR tablename = 'payments';
