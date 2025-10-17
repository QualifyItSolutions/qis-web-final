import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, content, formData } = await request.json();

    // For now, we'll log the email content and return success
    // In production, you should integrate with a real email service
    console.log('=== ENROLLMENT EMAIL NOTIFICATION ===');
    console.log('To:', to || 'info@qualifyitsolutions.com');
    console.log('Subject:', subject || 'New Enrollment Submission - Qualify IT Solutions');
    console.log('Content:', content);
    console.log('Form Data:', JSON.stringify(formData, null, 2));
    console.log('=====================================');

    // TODO: Integrate with your preferred email service:
    // - Resend (recommended for Next.js)
    // - SendGrid
    // - Mailgun
    // - Nodemailer with SMTP
    // - Zapier webhook
    // - Make.com webhook

    // For now, we'll simulate success
    return NextResponse.json({ 
      success: true, 
      message: 'Email notification logged (integrate with email service for production)' 
    });

  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send email notification' 
    }, { status: 500 });
  }
}
