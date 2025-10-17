# Database Setup Guide - Fix Enrollment Form

## 🚨 Current Issue
The enrollment form is failing because the `enrollment_submissions` table doesn't exist in your Supabase database.

## ✅ Quick Fix (Temporary)
The form will now work temporarily by logging data to console, but you should set up the database for production.

## 🔧 Permanent Solution

### Step 1: Access Supabase Dashboard
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in to your account
3. Select your project (the one with URL: `https://pkgybbdijmrxsgdskggb.supabase.co`)

### Step 2: Create Database Table
1. In the Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire contents of `database/enrollment_submissions_table.sql`
4. Click **Run** to execute the SQL

### Step 3: Verify Setup
Run this command to test the connection:
```bash
node test-supabase-connection.js
```

You should see:
```
✅ Supabase connection successful!
✅ enrollment_submissions table exists
✅ Test enrollment submitted successfully!
```

## 📋 SQL Script Contents
The `database/enrollment_submissions_table.sql` file contains:
- Table creation with all required fields
- Row Level Security (RLS) policies
- Indexes for performance
- Triggers for automatic timestamp updates

## 🧪 Testing
1. **Test the form:** Go to `http://localhost:3001/enroll` or `http://localhost:3002/enroll`
2. **Fill out the form** with test data
3. **Submit** - Should show success message
4. **Check Supabase dashboard** - Should see new record in `enrollment_submissions` table
5. **Check console logs** - Should see email notification logs

## 📧 Email Notifications
- Currently logged to console
- Follow `EMAIL_SETUP_GUIDE.md` to set up real email service
- Notifications sent to `info@qualifyitsolutions.com`

## 🔍 Troubleshooting
If you still get errors:
1. Check Supabase project URL and API key
2. Verify table was created successfully
3. Check RLS policies are set correctly
4. Run the test script to verify connection

## 📊 Database Schema
```sql
enrollment_submissions:
- id (UUID, Primary Key)
- full_name (TEXT)
- email (TEXT)
- phone (TEXT)
- organization (TEXT)
- role (TEXT)
- interests (TEXT[])
- start_date (DATE)
- notes (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## ✅ Success Indicators
- Form submission shows success message
- No error messages in browser console
- New records appear in Supabase dashboard
- Email notifications logged to console
