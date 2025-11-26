import { useState, useEffect } from 'react';
import { MessageCircle, X } from '../ui/icons';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from '../ui/sonner';

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  // Hide button during scrolling and navigation
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsVisible(true);
      }, 150);
    };

    // Handle navigation link clicks
    const handleNavigationClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      if (link) {
        setIsVisible(false);
        setTimeout(() => {
          setIsVisible(true);
        }, 800);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleNavigationClick);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleNavigationClick);
      clearTimeout(scrollTimer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Phone number validation - Accept Indian format (+91 prefix)
    const digitsOnly = formData.phone.replace(/\D/g, '');
    const isValid10Digit = /^[0-9]{10}$/.test(digitsOnly);
    const isValid12DigitWithCountryCode = /^91[0-9]{10}$/.test(digitsOnly);
    
    if (!isValid10Digit && !isValid12DigitWithCountryCode) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    // Dynamic import for form submission
    const { submitFormData } = await import('../../utils/formSubmission');
    
    // Submit form data to webhook and Google Form
    const result = await submitFormData({
      name: formData.name,
      phone: formData.phone,
      email: 'noemail@provided.com', // WhatsApp form doesn't collect email
      message: formData.message || 'WhatsApp Inquiry - Serene Exotica'
    });
    
    // WhatsApp business number - replace with actual number
    const whatsappNumber = '919876543210'; // Replace with your actual WhatsApp business number
    
    // Construct WhatsApp message
    const message = `Hello, I'm ${formData.name}.\nPhone: ${formData.phone}\n\n${formData.message || 'I am interested in Serene Exotica villa plots. Please contact me.'}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    if (result.success) {
      toast.success('Your inquiry has been submitted and WhatsApp is opening...', { duration: 4000 });
    } else {
      toast.success('Opening WhatsApp...', { duration: 3000 });
    }
    
    // Reset form and close dialog
    setFormData({ name: '', phone: '', message: '' });
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => window.open('https://wa.me/919972505291', '_blank')}
        className={`fixed bottom-24 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full p-4 shadow-2xl transition-all duration-300 transform hover:scale-110 group ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
        }`}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          1
        </span>
        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat with us on WhatsApp
        </span>
      </button>

      {/* WhatsApp Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-light text-center mb-2 flex items-center justify-center gap-2">
              <MessageCircle className="w-6 h-6 text-[#25D366]" />
              <span>Connect on <span className="text-[#25D366]">WhatsApp</span></span>
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-center">
              Share your details and we'll connect with you instantly
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div>
              <Label htmlFor="whatsapp-name" className="text-white mb-2 block">
                Full Name *
              </Label>
              <div className="relative">
                <Input
                  id="whatsapp-name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="!bg-black border-gray-600 !text-white placeholder:text-gray-400 focus:border-[#25D366] pr-10"
                  style={{ backgroundColor: '#000000', color: '#ffffff' }}
                  required
                />
                {formData.name && (
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, name: ''})}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Clear name"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="whatsapp-phone" className="text-white mb-2 block">
                Phone Number *
              </Label>
              <div className="relative">
                <Input
                  id="whatsapp-phone"
                  type="tel"
                  placeholder="Enter your 10-digit phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="!bg-black border-gray-600 !text-white placeholder:text-gray-400 focus:border-[#25D366] pr-10"
                  style={{ backgroundColor: '#000000', color: '#ffffff' }}
                  required
                />
                {formData.phone && (
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, phone: ''})}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Clear phone number"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="whatsapp-message" className="text-white mb-2 block">
                Message (Optional)
              </Label>
              <Textarea
                id="whatsapp-message"
                placeholder="Tell us how we can help you..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="!bg-black border-gray-600 !text-white placeholder:text-gray-400 focus:border-[#25D366] min-h-[100px]"
                style={{ backgroundColor: '#000000', color: '#ffffff' }}
                rows={4}
              />
            </div>

            <div className="text-xs text-gray-400 text-center">
              <p>By clicking "Start Chat", you'll be redirected to WhatsApp</p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Start Chat on WhatsApp
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WhatsAppButton;
