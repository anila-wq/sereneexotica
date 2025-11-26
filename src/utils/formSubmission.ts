/**
 * Form submission utility for handling form data submissions
 * Submits to both webhook and Google Form
 */

export interface FormData {
  name: string;
  number?: string;
  phone?: string;
  email: string;
  message?: string;
}

const WEBHOOK_URL = 'https://apps.cratiocrm.com/Customize/Webhooks/webhook.php?id=312374';
const GOOGLE_FORM_BASE = 'https://docs.google.com/forms/d/e/1FAIpQLSc4DVYaKTvX46uziCD2QlWDKEIBGVrVi0O_RPRI8LOOJBtIJg/formResponse';

/**
 * Submit form data to webhook and Google Form
 */
export async function submitFormData(data: FormData): Promise<{ success: boolean; message: string }> {
  console.log('🚀 FORM SUBMISSION STARTED');
  console.log('📝 Received data:', data);
  
  try {
    const phoneNumber = data.number || data.phone || '';
    
    console.log('📞 Phone number extracted:', phoneNumber);
    
    // Validate basic required fields
    if (!data.name || data.name.trim() === '') {
      console.error('❌ Name is missing!');
      return {
        success: false,
        message: 'Name is required. Please fill in all fields.'
      };
    }
    
    if (!data.email || data.email.trim() === '') {
      console.error('❌ Email is missing!');
      return {
        success: false,
        message: 'Email is required. Please fill in all fields.'
      };
    }
    
    // Validate that we have a phone number
    if (!phoneNumber || phoneNumber.trim() === '') {
      console.error('❌ Phone number is missing!', data);
      return {
        success: false,
        message: 'Phone number is required. Please fill in all fields.'
      };
    }
    
    // Format phone number - Cratio might expect without +91 prefix
    let formattedPhone = phoneNumber.trim();
    // Remove any existing country code
    formattedPhone = formattedPhone.replace(/^\+91/, '').replace(/^91/, '');
    // Remove any non-digit characters
    formattedPhone = formattedPhone.replace(/\D/g, '');
    
    // Validate phone number length (should be 10 digits for Indian numbers)
    if (formattedPhone.length < 10) {
      console.error('❌ Phone number too short:', formattedPhone);
      return {
        success: false,
        message: 'Please enter a valid 10-digit phone number.'
      };
    }
    
    console.log('✅ Formatted phone (digits only):', formattedPhone);
    console.log('✅ All validations passed');

    // Store user name in localStorage for thank you page
    try {
      localStorage.setItem('thankYouName', data.name);
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }

    // Submit to Cratio CRM webhook and Google Forms
    console.log('🚀 Submitting to CRM webhook and Google Forms...');

    // Prepare webhook payload - Cratio expects JSON format
    const webhookPayload = {
      id: "7312374",
      Client_Name: data.name.trim(),
      Mobile_Number: formattedPhone,
      Email_Address: data.email.trim(),
      Project: "Serene Exotica"
    };
    
    console.log('📤 Sending webhook data (JSON):', webhookPayload);
    console.log('📤 JSON stringified:', JSON.stringify(webhookPayload));

    const webhookPromise = fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
      mode: 'no-cors', // Bypass CORS restrictions like Google Forms
    }).then(r => {
      console.log('✅ Webhook submitted (no-cors mode)');
      return { service: 'webhook', status: 'submitted' };
    }).catch(e => {
      console.error('⚠️ Webhook error (continuing anyway):', e);
      // Don't fail the submission - user experience is priority
      return { service: 'webhook', error: e.message };
    });

    // Submit to Google Form
    const googleFormData = new URLSearchParams();
    googleFormData.append('entry.1501491234', data.name.trim());
    googleFormData.append('entry.1434566618', formattedPhone);
    googleFormData.append('entry.1598682861', data.email.trim());

    const googleFormPromise = fetch(GOOGLE_FORM_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: googleFormData.toString(),
      mode: 'no-cors', // Google Forms requires no-cors
    }).then(r => {
      console.log('✅ Google Form submitted (no-cors mode)');
      return { service: 'google', status: 'submitted' };
    }).catch(e => {
      console.error('⚠️ Google Form error (continuing anyway):', e);
      return { service: 'google', error: e.message };
    });

    // Wait for both submissions - don't let errors stop us
    try {
      const results = await Promise.allSettled([webhookPromise, googleFormPromise]);
      console.log('📊 Submission results:', results);
    } catch (e) {
      console.warn('⚠️ Some submissions may have failed, but continuing:', e);
    }

    // Navigate to thank you page using hash
    console.log('🎉 Navigating to thank you page');
    window.location.hash = 'thankyou';

    console.log('✅ FORM SUBMISSION COMPLETED SUCCESSFULLY');
    return {
      success: true,
      message: 'Thank you! Your request has been submitted successfully. Our team will contact you shortly.'
    };
  } catch (error) {
    console.error('❌ FORM SUBMISSION ERROR:', error);
    return {
      success: false,
      message: 'There was an error submitting your request. Please try again or contact us directly at +91 97391 13345'
    };
  }
}

/**
 * Alternative: Open mailto link as fallback
 */
export function openMailto(data: FormData): void {
  const subject = encodeURIComponent('Inquiry from Serene Exotica Website');
  const body = encodeURIComponent(
    `Name: ${data.name}\n` +
    `Phone: ${data.number || data.phone || 'Not provided'}\n` +
    `Email: ${data.email}\n` +
    `Message: ${data.message || 'No message provided'}\n\n` +
    `Submitted on: ${new Date().toLocaleString()}`
  );
  
  window.location.href = `mailto:sales@urbanestrealty.in?subject=${subject}&body=${body}`;
}
