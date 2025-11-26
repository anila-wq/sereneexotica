import { useEffect, useState } from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, any>) => void;
    dataLayer?: any[];
  }
}

export default function ThankYou() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get user name from localStorage
    const name = localStorage.getItem('thankYouName') || '';
    setUserName(name);

    // Scroll to top
    window.scrollTo(0, 0);

    // Track events in Google Analytics with a small delay to ensure gtag is loaded
    const trackingTimeout = setTimeout(() => {
      if (window.gtag) {
        console.log('📊 Tracking thank you page view with GA:', 'G-LCEHXQHJZV');
        
        // Track page view
        window.gtag('event', 'page_view', {
          page_title: 'Thank You - Serene Exotica',
          page_location: window.location.href,
          page_path: window.location.pathname + window.location.hash
        });

        // Track conversion event
        window.gtag('event', 'conversion', {
          'send_to': 'G-LCEHXQHJZV',
          'event_category': 'Form Submission',
          'event_label': 'Serene Exotica Inquiry'
        });

        // Track form submission completion
        window.gtag('event', 'generate_lead', {
          'event_category': 'engagement',
          'event_label': 'Form Submission Complete'
        });

        console.log('✅ Google Analytics tracking completed');
      } else {
        console.warn('⚠️ Google Analytics (gtag) not available');
      }
    }, 500);

    return () => clearTimeout(trackingTimeout);
  }, []);

  const handleGoBack = () => {
    // Clear the hash and reload to go back to main page
    window.location.hash = '';
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-3xl mb-2">
            Thank you{userName ? `, ${userName}` : ''}!
          </h1>

          {/* Decorative underline */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
          </div>

          {/* Success Message */}
          <div className="mb-4">
            <p className="text-green-600 flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Your enquiry has been submitted successfully
            </p>
          </div>

          {/* Follow-up Message */}
          <p className="text-gray-600 mb-8">
            We'll contact you shortly to discuss your requirements for Serene Exotica by Urbanest Realty
          </p>

          {/* Go Back Button */}
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-6 text-gray-600">
          Need immediate assistance? Call us at{' '}
          <a 
            href="tel:+919739113345" 
            className="hover:underline"
            style={{ color: '#ff9500' }}
          >
            +91 97391 13345
          </a>
        </div>
      </div>
    </div>
  );
}
