-- CLEANUP AND UPDATE TICKET TYPE
-- Run this in Supabase Dashboard > SQL Editor

-- 1. CLEANUP: Delete rows that violate the NEW constraint
-- (Since these are likely partial/failed test rows, it's safe to clear them)
DELETE FROM registrations 
WHERE ticket_type NOT IN ('standard', 'vip', 'student', 'early_bird');

-- OR Update them to a valid default if you prefer keeping them:
-- UPDATE registrations SET ticket_type = 'standard' 
-- WHERE ticket_type NOT IN ('standard', 'vip', 'student', 'early_bird');


-- 2. NOW Drop the old constraint
ALTER TABLE registrations DROP CONSTRAINT IF EXISTS registrations_ticket_type_check;


-- 3. Add the new constraint
ALTER TABLE registrations
ADD CONSTRAINT registrations_ticket_type_check
CHECK (ticket_type IN ('standard', 'vip', 'student', 'early_bird'));
