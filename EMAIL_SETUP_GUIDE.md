# Email Integration Setup Guide

## Current Status
✅ **Enrollment form is connected to Supabase**
✅ **Form submissions are saved to database**
✅ **Email notifications are logged to console**
⚠️ **Email service needs to be configured for production**

## What's Working
- Enrollment form submissions are saved to Supabase database
- Form validation and error handling
- Loading states and user feedback
- Console logging of email notifications

## Email Service Integration Options

### Option 1: Resend (Recommended)
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Update `app/api/send-enrollment-email/route.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { to, subject, content } = await request.json();
    
    const { data, error } = await resend.emails.send({
      from: 'noreply@qualifyitsolutions.com',
      to: [to || 'info@qualifyitsolutions.com'],
      subject: subject || 'New Enrollment Submission',
      html: `<pre>${content}</pre>`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ success: false, error: error.message });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to send email' });
  }
}
```

### Option 2: Zapier Webhook
1. Create a Zapier account
2. Create a new Zap with "Webhooks by Zapier" as trigger
3. Add "Email by Zapier" as action
4. Copy the webhook URL
5. Update the webhook URL in the code

### Option 3: SendGrid
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Update the API route to use SendGrid

### Option 4: Nodemailer with SMTP
1. Configure SMTP settings
2. Use Nodemailer to send emails

## Database Setup Required

You need to create the `enrollment_submissions` table in Supabase:

```sql
CREATE TABLE enrollment_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  organization TEXT NOT NULL,
  role TEXT NOT NULL,
  interests TEXT[] NOT NULL,
  start_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE enrollment_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts
CREATE POLICY "Allow public inserts" ON enrollment_submissions
  FOR INSERT WITH CHECK (true);
```

## Testing
1. Fill out the enrollment form
2. Check Supabase dashboard for new records
3. Check console logs for email notifications
4. Configure email service for production

## Current Features
- ✅ Form validation
- ✅ Loading states
- ✅ Error handling
- ✅ Success confirmation
- ✅ Database storage
- ⚠️ Email notifications (needs service configuration)
