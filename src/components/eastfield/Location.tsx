import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from '../ui/sonner';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { 
  MapPin, 
  Clock, 
  School, 
  Calendar, 
  Heart,
  Plane,
  ShoppingBag,
  Building2,
  X,
  Car,
  Navigation
} from '../ui/icons';

const locationAdvantages = [
  { location: "Whitefield", time: "43 mins", icon: <Building2 className="w-5 h-5" /> },
  { location: "Sarjapur", time: "45 mins", icon: <Building2 className="w-5 h-5" /> },
  { location: "Aerospace", time: "50 mins", icon: <Plane className="w-5 h-5" /> },
  { location: "Airport", time: "55 mins", icon: <Plane className="w-5 h-5" /> },
  { location: "E-City", time: "59 mins", icon: <Building2 className="w-5 h-5" /> },
  { location: "Narsapura", time: "28 mins", icon: <Building2 className="w-5 h-5" /> }
];

const Location = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: ''
  });

  // Mobile keyboard detection
  useEffect(() => {
    const handleResize = () => {
      const vh = window.visualViewport?.height || window.innerHeight;
      const isKeyboardOpen = vh < window.screen.height * 0.75;
      setKeyboardVisible(isKeyboardOpen);
    };

    if (typeof window !== 'undefined' && window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      return () => window.visualViewport.removeEventListener('resize', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSiteVisitClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.number || !formData.email) {
      toast.error('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Phone number validation - Accept Indian format (+91 prefix)
    const digitsOnly = formData.number.replace(/\D/g, '');
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
      number: formData.number,
      email: formData.email,
      message: 'Site Visit Request - Serene Exotica'
    });
    
    if (result.success) {
      toast.success(result.message, { duration: 5000 });
      setFormData({ name: '', number: '', email: '' });
      setIsModalOpen(false);
    } else {
      toast.error(result.message, { duration: 6000 });
    }
  }, [formData]);

  return (
    <section id="location" className="pt-6 pb-16 lg:pt-10 bg-black" style={{ scrollMarginTop: '80px' }}>
      <div className="container mx-auto px-4 lg:px-6 text-white">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-normal mb-4">
            Location Advantage
          </h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Enjoy easy access to STRR, Bengaluru-Chennai Expressway, Narsapura Industrial Hubs, 
            IT parks, Sarjapur Road, Electronic City, and BIA within 30–45 minutes.
          </p>
        </div>

        {/* Location Advantages Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {locationAdvantages.map((item, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800 hover:border-[#c9980b]/40 transition-colors duration-300">
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-3 text-[#c9980b]">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{item.location}</h3>
                <p className="text-gray-400 text-xs">{item.time}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Address */}
        <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <MapPin className="w-6 h-6 text-[#c9980b] mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Project Address</h3>
              <p className="text-gray-300 leading-relaxed">
                📍 Serene Exotica, near Benaka Cinema, Harohalli Road, Malur, Karnataka - 563130
              </p>
            </div>
          </div>
          
          {/* Google Maps Embed */}
          <div className="w-full h-[400px] rounded-xl overflow-hidden border border-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.2805859485266!2d77.94060887513511!3d13.017795687301863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bade3de6c604959%3A0xd2d3c8693e4bc341!2sSerene%20Exotica!5e0!3m2!1sen!2sin!4v1763034267050!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Serene Exotica Location Map"
            />
          </div>
        </div>

        {/* Connectivity Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Easy Access */}
          <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              <Car className="w-6 h-6 text-[#c9980b]" />
              Connectivity Highlights
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-[#c9980b] rounded-full"></div>
                Direct access to STRR (Satellite Town Ring Road)
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-[#c9980b] rounded-full"></div>
                Close to Bengaluru-Chennai Expressway
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-[#c9980b] rounded-full"></div>
                Narsapura Industrial Hubs nearby
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-[#c9980b] rounded-full"></div>
                IT parks and tech corridors within reach
              </li>
            </ul>
          </div>

          {/* Strategic Location */}
          <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              <Navigation className="w-6 h-6 text-[#c9980b]" />
              Strategic Benefits
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-[#c9980b] rounded-full"></div>
                Prime location in Malur's growing corridor
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-[#c9980b] rounded-full"></div>
                Excellent appreciation potential
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-[#c9980b] rounded-full"></div>
                Peaceful environment away from city chaos
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-[#c9980b] rounded-full"></div>
                Future infrastructure development zone
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            size="lg"
            onClick={handleSiteVisitClick}
            className="bg-gradient-to-r from-[#5133c0] to-[#4528a0] hover:from-[#5133c0]/90 hover:to-[#4528a0]/90 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 transform hover:scale-105"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Your Site Visit
          </Button>
        </div>
      </div>

      {/* Site Visit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent 
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-[#c9980b]/30 max-w-md mx-auto shadow-2xl w-[95vw] sm:w-full p-0 overflow-hidden"
          style={{
            maxHeight: keyboardVisible ? '35vh' : '90vh',
            height: keyboardVisible ? '35vh' : 'auto'
          }}
        >
          {/* Fixed Header */}
          <DialogHeader className={`relative flex-shrink-0 border-b border-gray-700/50 ${keyboardVisible ? 'p-2 pb-2' : 'p-4 pb-3'}`}>
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-3 top-3 rounded-full p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200 z-10"
              aria-label="Close form"
            >
              <X className="w-4 h-4" />
            </button>
            
            <DialogTitle className={`text-white font-bold text-center pr-8 ${keyboardVisible ? 'text-base' : 'text-lg'}`}>
              Book Your Site Visit
            </DialogTitle>
            {!keyboardVisible && (
              <DialogDescription className="text-gray-300 text-center mt-1 text-xs">
                Schedule a visit to Serene Exotica and explore your future villa plot.
              </DialogDescription>
            )}
          </DialogHeader>
          
          {/* Scrollable Form Content */}
          <div 
            className={`overflow-y-auto custom-scrollbar pb-3 ${keyboardVisible ? 'px-3' : 'px-4 pb-4'}`}
            style={{ 
              height: keyboardVisible ? 'calc(35vh - 60px)' : 'calc(90vh - 120px)',
              maxHeight: keyboardVisible ? 'calc(35vh - 60px)' : 'calc(90vh - 120px)'
            }}
          >
            <form onSubmit={handleFormSubmit} className={`${keyboardVisible ? 'space-y-2 pt-2' : 'space-y-4 pt-3'}`}>
              <div className={keyboardVisible ? 'space-y-2' : 'space-y-3'}>
                <div>
                  <Label htmlFor="visit-name" className={`text-white font-medium block ${keyboardVisible ? 'mb-1 text-xs' : 'mb-1.5 text-sm'}`}>
                    Name *
                  </Label>
                  <div className="relative">
                    <Input
                      id="visit-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`!bg-black border-2 border-gray-600 !text-white placeholder:text-gray-400 focus:border-[#c9980b] focus:ring-2 focus:ring-[#c9980b]/20 rounded-lg px-3 pr-10 transition-all duration-200 hover:!bg-gray-900 ${keyboardVisible ? 'h-9 text-sm' : 'h-11 text-base'}`}
                      style={{ backgroundColor: '#000000', color: '#ffffff' }}
                      required
                    />
                    {formData.name && (
                      <button
                        type="button"
                        onClick={() => handleInputChange('name', '')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        aria-label="Clear name"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="visit-number" className={`text-white font-medium block ${keyboardVisible ? 'mb-1 text-xs' : 'mb-1.5 text-sm'}`}>
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Input
                      id="visit-number"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.number}
                      onChange={(e) => handleInputChange('number', e.target.value)}
                      className={`!bg-black border-2 border-gray-600 !text-white placeholder:text-gray-400 focus:border-[#c9980b] focus:ring-2 focus:ring-[#c9980b]/20 rounded-lg px-3 pr-10 transition-all duration-200 hover:!bg-gray-900 ${keyboardVisible ? 'h-9 text-sm' : 'h-11 text-base'}`}
                      style={{ backgroundColor: '#000000', color: '#ffffff' }}
                      required
                    />
                    {formData.number && (
                      <button
                        type="button"
                        onClick={() => handleInputChange('number', '')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        aria-label="Clear phone number"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="visit-email" className={`text-white font-medium block ${keyboardVisible ? 'mb-1 text-xs' : 'mb-1.5 text-sm'}`}>
                    Email ID *
                  </Label>
                  <div className="relative">
                    <Input
                      id="visit-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`!bg-black border-2 border-gray-600 !text-white placeholder:text-gray-400 focus:border-[#c9980b] focus:ring-2 focus:ring-[#c9980b]/20 rounded-lg px-3 pr-10 transition-all duration-200 hover:!bg-gray-900 ${keyboardVisible ? 'h-9 text-sm' : 'h-11 text-base'}`}
                      style={{ backgroundColor: '#000000', color: '#ffffff' }}
                      required
                    />
                    {formData.email && (
                      <button
                        type="button"
                        onClick={() => handleInputChange('email', '')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        aria-label="Clear email"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Consent Note */}
              {!keyboardVisible && (
                <div className="text-xs text-gray-400 text-center">
                  <p>By submitting this form, you consent to be contacted by Urbanest Realty regarding Serene Exotica, even if you are registered under DNC/NDNC.</p>
                </div>
              )}
              
              {/* Submit Button */}
              <div className={`border-t border-gray-700/30 ${keyboardVisible ? 'pt-2' : 'pt-4'}`}>
                <Button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-[#c9980b] to-[#b8860b] hover:from-[#c9980b]/90 hover:to-[#b8860b]/90 text-black font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-[#c9980b]/25 ${keyboardVisible ? 'py-2 text-xs' : 'py-3 text-sm'}`}
                >
                  Book Site Visit
                </Button>
              </div>
              
              {/* Extra space for better scrolling */}
              <div className={keyboardVisible ? 'h-8' : 'h-16'}></div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Location;