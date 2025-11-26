import { useEffect, useState } from 'react';

interface ThankYouProps {
  onClose?: () => void;
}

// SVG Icons defined inline to avoid import issues
const CheckCircleIcon = ({ className = "", strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />
  </svg>
);

const ArrowLeftIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 19-7-7 7-7M5 12h14" />
  </svg>
);

export default function ThankYou({ onClose }: ThankYouProps) {
  const [userName, setUserName] = useState('');

  // Auto-scroll to top when component mounts
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Get user name from URL params or localStorage
      const params = new URLSearchParams(window.location.search);
      const name = params.get('name') || localStorage.getItem('thankYouName') || '';
      setUserName(name);
      
      // Clean up localStorage
      if (localStorage.getItem('thankYouName')) {
        localStorage.removeItem('thankYouName');
      }
    } catch (error) {
      console.error('ThankYou component error:', error);
    }
  }, []);

  const handleGoBack = () => {
    if (window.opener) {
      window.close();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full">
        {/* White Card */}
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-[#5133c0] rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-12 h-12 text-[#5133c0]" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl mb-6 text-gray-900">
            Thank you{userName ? `, ${userName}` : ''}!
          </h1>
          
          <div className="mb-6">
            <p className="text-[#5133c0] mb-4 flex items-center justify-center gap-2">
              <CheckCircleIcon className="w-5 h-5" strokeWidth={2} />
              <span>Your enquiry has been submitted successfully</span>
            </p>
            
            <p className="text-gray-600">
              We'll contact you shortly to discuss your requirements for Serene Exotica by Urbanest Realty
            </p>
          </div>

          {/* Go Back Button */}
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-[#5133c0] hover:text-[#5133c0] transition-colors rounded-lg"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-8 space-y-2">
          <div className="text-gray-600">
            Need immediate assistance? Call us at{' '}
            <a 
              href="tel:+919742200899" 
              className="text-[#5133c0] hover:underline"
            >
              +91 97422 00899
            </a>
          </div>
          <div className="text-gray-600">
            Visit our website:{' '}
            <a 
              href="https://urbanestrealty.in" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5133c0] hover:underline"
            >
              urbanestrealty.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
