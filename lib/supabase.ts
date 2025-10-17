import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://pkgybbdijmrxsgdskggb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZ3liYmRpam1yeHNnZHNrZ2diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NzUwNzIsImV4cCI6MjA3MTQ1MTA3Mn0.eOTtIOFNK3MBRTC_0kU2ZTUC2MZtOlBskhHZVEmHqbY'

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration. Please check your environment variables.');
}

// Create Supabase client with authentication enabled
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'qualify-it-solutions'
    }
  }
})

// Types for database tables
export interface ContactFormSubmission {
  id?: string
  name: string
  email: string
  company?: string
  service: string
  message: string
  created_at?: string
  updated_at?: string
}

export interface EnrollmentSubmission {
  id?: string
  full_name: string
  email: string
  phone: string
  organization: string
  role: string
  interests: string[]
  start_date: string
  notes: string
  created_at?: string
  updated_at?: string
}

// Contact form submission function
export async function submitContactForm(formData: Omit<ContactFormSubmission, 'id' | 'created_at' | 'updated_at'>) {
  try {
    console.log('📧 Submitting contact form:', formData.email);

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          service: formData.service,
          message: formData.message,
        }
      ])
      .select()

    if (error) {
      console.error('❌ Contact form submission error:', error);
      throw new Error(`Failed to submit contact form: ${error.message}`);
    }

    console.log('✅ Contact form submitted successfully');
    return { success: true, data }
  } catch (error) {
    console.error('❌ Contact form submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// Enrollment form submission function
export async function submitEnrollmentForm(formData: Omit<EnrollmentSubmission, 'id' | 'created_at' | 'updated_at'>) {
  console.log('🚀 ENROLLMENT FUNCTION CALLED!');
  console.log('📋 Form data received:', JSON.stringify(formData, null, 2));
  
  try {
    console.log('🚀 Starting enrollment submission...');
    console.log('📋 Form data:', JSON.stringify(formData, null, 2));
    
    // Always log the enrollment data first
    console.log('📝 ENROLLMENT SUBMISSION RECEIVED:');
    console.log('Name:', formData.full_name);
    console.log('Email:', formData.email);
    console.log('Phone:', formData.phone);
    console.log('Organization:', formData.organization);
    console.log('Role:', formData.role);
    console.log('Interests:', formData.interests.join(', '));
    console.log('Start Date:', formData.start_date);
    console.log('Notes:', formData.notes);
    console.log('Timestamp:', new Date().toISOString());
    console.log('=====================================');
    
    // Submit to Supabase database
    console.log('💾 Saving to Supabase database...');
    console.log('🔗 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('🔑 Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    
    const { data, error } = await supabase
      .from('enrollment_submissions')
      .insert([
        {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          role: formData.role,
          interests: formData.interests,
          start_date: formData.start_date,
          notes: formData.notes,
        }
      ])
      .select()
    
    console.log('📊 Database response - data:', data);
    console.log('📊 Database response - error:', error);

    if (error) {
      console.error('❌ Supabase submission failed:', error.message);
      console.error('❌ Error details:', error);
      throw new Error(`Database error: ${error.message}`);
    } else {
      console.log('✅ Successfully saved to Supabase database!');
      console.log('📊 Database ID:', data[0]?.id);
      console.log('📊 Saved data:', data[0]);
    }

    // Always send email notification
    console.log('📧 Sending email notification...');
    await sendEnrollmentEmailNotification(formData);
    console.log('✅ Email notification sent!');

    // Always return success
    return { 
      success: true, 
      data: { 
        message: 'Enrollment submitted successfully!',
        timestamp: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9) // Generate a temporary ID
      }
    };
    
  } catch (error) {
    console.error('❌ Enrollment submission error:', error);
    
    // Log the data for debugging
    console.log('📝 FALLBACK: Logging enrollment data due to error:');
    console.log('Form Data:', JSON.stringify(formData, null, 2));
    console.log('Error:', error);
    
    // Return error so user knows something went wrong
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// Email notification function for enrollment
async function sendEnrollmentEmailNotification(formData: Omit<EnrollmentSubmission, 'id' | 'created_at' | 'updated_at'>) {
  try {
    // Create email content
    const emailContent = `
New Enrollment Submission

Name: ${formData.full_name}
Email: ${formData.email}
Phone: ${formData.phone}
Organization: ${formData.organization}
Role: ${formData.role}
Interests: ${formData.interests.join(', ')}
Preferred Start Date: ${formData.start_date}
Additional Notes: ${formData.notes}

Submitted at: ${new Date().toLocaleString()}
    `.trim();

    // For now, we'll use a simple approach with a webhook
    // You can replace this with your preferred email service
    // const webhookUrl = 'https://hooks.zapier.com/hooks/catch/your-webhook-url-here';
    
    const emailPayload = {
      to: 'info@qualifyitsolutions.com',
      subject: 'New Enrollment Submission - Qualify IT Solutions',
      content: emailContent,
      formData: formData,
      timestamp: new Date().toISOString()
    };

    // Try to send email notification
    try {
      const response = await fetch('/api/send-enrollment-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload)
      });

      if (!response.ok) {
        console.warn('Email notification failed, but enrollment was saved');
      }
    } catch (emailError) {
      console.warn('Email notification error:', emailError);
      // Don't fail the enrollment if email fails
    }

    return { success: true };
  } catch (error) {
    console.warn('Email notification error:', error);
    // Don't fail the enrollment if email fails
    return { success: false, error: 'Email notification failed' };
  }
}

// Authentication functions
export async function signUp(email: string, password: string) {
  try {
    console.log('🔐 Attempting sign up for:', email);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error('❌ Sign up error:', error);
      throw new Error(error.message);
    }

    console.log('✅ Sign up successful');
    return { success: true, data }
  } catch (error) {
    console.error('❌ Sign up error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Sign up failed'
    }
  }
}

export async function signIn(email: string, password: string) {
  try {
    console.log('🔐 Attempting sign in for:', email);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('❌ Sign in error:', error);
      throw new Error(error.message);
    }

    console.log('✅ Sign in successful');
    return { success: true, data }
  } catch (error) {
    console.error('❌ Sign in error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Sign in failed'
    }
  }
}

export async function signOut() {
  try {
    console.log('🔐 Attempting sign out');

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('❌ Sign out error:', error);
      throw new Error(error.message);
    }

    console.log('✅ Sign out successful');
    return { success: true }
  } catch (error) {
    console.error('❌ Sign out error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Sign out failed'
    }
  }
}

export async function getCurrentUser() {
  try {
    console.log('🔐 Fetching current user');

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      console.error('❌ Get user error:', error);
      throw new Error(error.message);
    }

    console.log('✅ Current user fetched');
    return { success: true, user }
  } catch (error) {
    console.error('❌ Get user error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get user'
    }
  }
}

// Brochure download function
export async function downloadBrochure() {
  try {
    const brochureUrl = 'https://pkgybbdijmrxsgdskggb.supabase.co/storage/v1/object/public/Boucher/brochure.pdf'

    // Test if the URL is accessible first
    const response = await fetch(brochureUrl, { method: 'HEAD' });

    if (!response.ok) {
      throw new Error(`Brochure file not accessible (Status: ${response.status})`);
    }

    // Create a temporary link element to trigger download
    const link = document.createElement('a')
    link.href = brochureUrl
    link.download = 'QIS-Brochure.pdf'
    link.target = '_blank'

    // Append to body, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    return { success: true }
  } catch (error) {
    console.error('Error downloading brochure:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Download failed' }
  }
}
