-- Production RLS Setup for Contact Submissions
-- Run this in your Supabase SQL Editor after testing with RLS disabled

-- Step 1: Clean up any existing policies
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON contact_submissions;
DROP POLICY IF EXISTS "Allow all inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Enable anonymous inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public inserts" ON contact_submissions;
DROP POLICY IF EXISTS "contact_form_inserts" ON contact_submissions;
DROP POLICY IF EXISTS "api_contact_inserts" ON contact_submissions;
DROP POLICY IF EXISTS "allow_all_contact_inserts" ON contact_submissions;
DROP POLICY IF EXISTS "simple_inserts" ON contact_submissions;

-- Step 2: Re-enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Step 3: Create a simple, working policy for contact form submissions
CREATE POLICY "contact_form_submissions" ON contact_submissions
    FOR INSERT 
    TO public
    WITH CHECK (
        -- Allow inserts for contact form data
        name IS NOT NULL AND 
        email IS NOT NULL AND 
        service IS NOT NULL AND 
        message IS NOT NULL
    );

-- Step 4: Create a policy for reading submissions (admin access)
CREATE POLICY "admin_read_submissions" ON contact_submissions
    FOR SELECT 
    TO authenticated
    USING (true);

-- Step 5: Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON TABLE contact_submissions TO anon;
GRANT INSERT ON TABLE contact_submissions TO public;
GRANT SELECT ON TABLE contact_submissions TO authenticated;

-- Step 6: Ensure sequence permissions for UUID generation
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO public;

-- Verification queries (run these to check the setup)
-- 1. Check policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    with_check
FROM pg_policies 
WHERE tablename = 'contact_submissions'
ORDER BY cmd, policyname;

-- 2. Check permissions
SELECT 
    grantee,
    privilege_type,
    is_grantable
FROM information_schema.role_table_grants 
WHERE table_name = 'contact_submissions'
AND grantee IN ('anon', 'public', 'authenticated')
ORDER BY grantee, privilege_type;

-- 3. Test insert (should work)
INSERT INTO contact_submissions (name, email, company, service, message) 
VALUES ('Production Test', 'production@test.com', 'Test Company', 'General Inquiry', 'Testing production RLS setup');

-- 4. Verify the test record
SELECT id, name, email, service, created_at 
FROM contact_submissions 
WHERE email = 'production@test.com';

-- 5. Clean up test record
DELETE FROM contact_submissions WHERE email = 'production@test.com';

-- Expected results:
-- - Policies: Should show "contact_form_submissions" for INSERT and "admin_read_submissions" for SELECT
-- - Permissions: anon and public should have INSERT, authenticated should have SELECT
-- - Test insert: Should succeed without errors
-- - Contact form from browser: Should work after running this script
