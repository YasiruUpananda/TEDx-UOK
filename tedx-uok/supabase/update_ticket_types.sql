-- UPDATE TICKET TYPE CHECK CONSTRAINT
-- Run this in Supabase Dashboard > SQL Editor

-- 1. Drop the existing constraint
ALTER TABLE registrations DROP CONSTRAINT IF EXISTS registrations_ticket_type_check;

-- 2. Add the new constraint with UI values
ALTER TABLE registrations
ADD CONSTRAINT registrations_ticket_type_check
CHECK (ticket_type IN ('standard', 'vip', 'student', 'early_bird'));
