import { useState, memo, useCallback, useRef, useEffect, Suspense } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ArrowRight, Download, Clock, Star, Award, X, Volume2, VolumeX } from '../ui/icons';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import heroImage from 'figma:asset/2d730b41dab0c9b9877a156bdbc4f6cd6cf7df35.png';
import heroBackgroundImage from 'figma:asset/d726ef5382533eec5ec0b0fb5d032a4a48add6a1.png';
import poolBackgroundImage from 'figma:asset/bde6211a5a025c4912b2e13b6b6ac5d256dda9a4.png';
import logoImage from 'figma:asset/d7788d35b331724c9e1f531250267ac1472498e4.png';

const Hero = memo(function Hero() {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: ''
  });
  
  const desktopVideoRef = useRef<HTMLIFrameElement>(null);
  const mobileVideoRef = useRef<HTMLIFrameElement>(null);

  // Load video after component mounts to prevent blocking
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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

  // Listen for YouTube API ready events
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return;
      
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'video-ready') {
          console.log('YouTube video is ready for API commands');
        }
      } catch (error) {
        // Ignore non-JSON messages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔵 Hero form submit handler called');
    console.log('📋 Form data:', formData);
    
    try {
      // Dynamic imports
      const { toast } = await import('../ui/sonner');
      const { submitFormData } = await import('../../utils/formSubmission');
      
      console.log('✅ Imports loaded, calling submitFormData...');
      
      // Submit form data to webhook and Google Form
      const result = await submitFormData({
        name: formData.name,
        number: formData.number,
        email: formData.email,
        message: 'Pre-Launch Registration - Serene Exotica'
      });
      
      console.log('📨 Submit result:', result);
      
      if (result.success) {
        toast.success(result.message, { duration: 5000 });
        setShowEnquiryForm(false);
        setFormData({ name: '', number: '', email: '' });
      } else {
        toast.error(result.message, { duration: 6000 });
      }
    } catch (error) {
      console.error('❌ Form submission error:', error);
      const { toast } = await import('../ui/sonner');
      toast.error('An error occurred. Please try again.');
    }
  }, [formData]);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const toggleMute = useCallback(() => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Send proper YouTube iframe API commands with retry mechanism
    const sendCommand = (command: string) => {
      const message = {
        event: 'command',
        func: command,
        args: ''
      };
      
      const messageStr = JSON.stringify(message);
      
      try {
        if (desktopVideoRef.current?.contentWindow) {
          desktopVideoRef.current.contentWindow.postMessage(messageStr, 'https://www.youtube.com');
        }
        if (mobileVideoRef.current?.contentWindow) {
          mobileVideoRef.current.contentWindow.postMessage(messageStr, 'https://www.youtube.com');
        }
      } catch (error) {
        console.log('YouTube API control not available:', error);
      }
    };

    const command = newMutedState ? 'mute' : 'unMute';
    
    // Send command immediately
    sendCommand(command);
    
    // Retry after a short delay in case the API wasn't ready
    setTimeout(() => sendCommand(command), 100);
  }, [isMuted]);

  return (
    <>
    {/* Desktop Layout - Full Screen Cover Page Design */}
    <section id="hero-section" className="hidden md:block relative w-full h-screen overflow-hidden bg-black" style={{ marginTop: '0px', paddingTop: '80px' }}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-no-repeat bg-black"
        style={{ 
          backgroundImage: `url(${poolBackgroundImage})`,
          opacity: 1,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom'
        }}
      />
      
      {/* Gradient Overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
      
      {/* Content Overlay - Centered */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="absolute bottom-4 left-0 right-0 px-8">
          <div className="max-w-6xl mx-auto">
            {/* Horizontal Layout Container */}
            <div className="flex flex-col gap-4 bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10 max-w-2xl mx-auto mt-8">
              
              {/* Top Section - Three Column Layout with Centered Heading */}
              <div className="grid grid-cols-3 items-center">
                {/* Left Section - Premium Badge */}
                <div className="flex justify-start">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#c9980b]/20 to-[#c9980b]/10 border border-[#c9980b]/30 rounded-lg backdrop-blur-sm">
                    <div className="flex flex-col">
                      <span className="text-[#c9980b] font-semibold text-sm">Premium Villa</span>
                      <div>
                        <span className="text-white text-sm">Plots</span> <span className="text-gray-300 text-sm">At Malur</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Section - Main Heading */}
                <div className="text-center flex flex-col items-center">
                  <ImageWithFallback
                    src={logoImage}
                    alt="Serene Exotica by Urbanest Realty"
                    className="h-24 w-auto object-contain mb-2"
                  />
                  <span className="block text-base text-gray-300">
                    by Urbanest Realty
                  </span>
                </div>

                {/* Right Section - Pre-Launch Offer */}
                <div className="flex justify-end">
                  <div 
                    className="flex items-center gap-4 cursor-pointer bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10 hover:border-[#c9980b]/40 hover:bg-[#c9980b]/5 group transition-all duration-300"
                    onClick={() => setShowEnquiryForm(true)}
                  >
                    <div className="text-center">
                      <span className="block text-sm text-white group-hover:text-[#c9980b] transition-colors duration-300">Pre-Launch</span>
                      <span className="block text-sm font-bold text-[#c9980b] group-hover:text-[#c9980b]/80 transition-colors duration-300">OFFER</span>
                    </div>

                  </div>
                </div>
              </div>
              
              {/* Bottom Section - Center Aligned CTA Button */}
              <div className="flex justify-center items-end">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[#5133c0] to-[#5133c0] hover:from-[#5133c0]/80 hover:to-[#5133c0]/80 text-white px-8 py-3 text-sm font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
                  onClick={() => setShowEnquiryForm(true)}
                >
                  <span>REGISTER HERE TO AVAIL PRE-LAUNCH OFFER!</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <div className="w-0.5 h-8 bg-white/50"></div>
        </div>
      </div>
    </section>

    {/* Mobile Layout - Stacked Design */}
    <section id="hero-section-mobile" className="md:hidden w-full" style={{backgroundColor: '#000000', marginTop: '0px', paddingTop: '64px'}}>
      
      {/* Background Image Section */}
      <div className="relative w-full" style={{marginTop: '0px'}}>
        <ImageWithFallback 
          src={poolBackgroundImage}
          alt="Serene Exotica Pool"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Content Section Below Image */}
      <div className="px-4 pt-4 pb-4 mt-4 relative" style={{backgroundColor: '#000000'}}>
        <div className="max-w-lg mx-auto text-center text-white">
          
          {/* Premium Badge */}


          {/* Main Heading */}
          <div className="relative mb-6">
            <div className="flex flex-col items-center sm:items-start">
              <ImageWithFallback
                src={logoImage}
                alt="Serene Exotica by Urbanest Realty"
                className="-mt-2 h-20 sm:h-24 w-auto object-contain"
              />
              <span className="block text-lg sm:text-xl text-gray-300 mt-2">
                by Urbanest Realty
              </span>
            </div>
            
            {/* Decorative Line */}
            <p className="text-center text-gray-300 mt-4 font-light">Premium Villa <span className="font-bold">Plots</span> At Malur</p>
            <p className="text-center text-gray-300 mt-2 text-sm">Thoughtfully designed plotted development project located in the vibrant heart of Malur Town.</p>
          </div>

          {/* Subtitle and Pricing */}
          <div className="mb-6">
            
            {/* Enquire Now Button */}
            <div className="mt-6">
              <Button 
                size="sm" 
                className="-mt-2 bg-gradient-to-r from-[#5133c0] to-[#5133c0] hover:from-[#5133c0]/80 hover:to-[#5133c0]/80 text-white px-3 py-1.5 font-bold rounded-lg transition-colors duration-200 text-xs"
                onClick={() => setShowEnquiryForm(true)}
              >
                <span>REGISTER FOR PRE-LAUNCH OFFER!</span>
              </Button>
            </div>
          </div>



        </div>
      </div>
    </section>

    {/* Fixed Position Buttons for Mobile */}
    <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
      <div className="fixed bottom-0 left-0 w-full flex gap-3 justify-start items-end p-3 pb-4 z-50">
        <Button 
          size="lg" 
          className="bg-black hover:bg-[#5133c0]/10 text-white hover:text-white px-6 py-4 font-bold rounded-full flex-1 border-2 border-[#5133c0] transition-colors duration-200"
          onClick={() => setShowEnquiryForm(true)}
        >
          <span>Enquire Now</span>
        </Button>
        <Button 
          size="lg" 
          className="bg-black hover:bg-[#5133c0]/10 text-white hover:text-white px-4 py-4 font-semibold rounded-full flex-1 border-2 border-[#5133c0] transition-colors duration-200"
          onClick={() => window.open('tel:+919742200899', '_self')}
        >
          Call Now
        </Button>
      </div>
    </div>



    {/* Enquiry Form Modal - Mobile Keyboard Optimized */}
    <Dialog open={showEnquiryForm} onOpenChange={setShowEnquiryForm}>
      <DialogContent 
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-[#5133c0]/30 max-w-md mx-auto shadow-2xl w-[95vw] sm:w-full p-0 overflow-hidden"
        style={{
          maxHeight: keyboardVisible ? '35vh' : '90vh',
          height: keyboardVisible ? '35vh' : 'auto'
        }}
      >
        
        {/* Fixed Header */}
        <DialogHeader className={`relative flex-shrink-0 border-b border-gray-700/50 ${keyboardVisible ? 'p-2 pb-2' : 'p-4 pb-3'}`}>
          {/* Close Button */}
          <button
            onClick={() => setShowEnquiryForm(false)}
            className="absolute right-3 top-3 rounded-full p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200 z-10"
            aria-label="Close form"
          >
            <X className="w-4 h-4" />
          </button>
          
          <DialogTitle className={`text-white font-bold text-center pr-8 ${keyboardVisible ? 'text-base' : 'text-lg'}`}>
            Register for Pre-Launch Offer
          </DialogTitle>
          {!keyboardVisible && (
            <DialogDescription className="text-gray-300 text-center mt-1 text-xs">
              Get exclusive access to Serene Exotica villa plots at special pre-launch pricing.
            </DialogDescription>
          )}
        </DialogHeader>
        
        {/* Scrollable Form Content */}
        <div 
          className={`overflow-y-auto custom-scrollbar pb-2 ${keyboardVisible ? 'px-3' : 'px-3 pb-3'}`}
          style={{ 
            height: keyboardVisible ? 'calc(30vh - 50px)' : 'calc(65vh - 100px)',
            maxHeight: keyboardVisible ? 'calc(30vh - 50px)' : 'calc(65vh - 100px)'
          }}
        >
          <form onSubmit={handleFormSubmit} className={`${keyboardVisible ? 'space-y-2 pt-2' : 'space-y-4 pt-3'}`}>
            <div className={keyboardVisible ? 'space-y-2' : 'space-y-3'}>
              <div>
                <Label htmlFor="name" className={`text-white font-medium block ${keyboardVisible ? 'mb-1 text-xs' : 'mb-1.5 text-sm'}`}>
                  Name *
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`!bg-black border-2 border-gray-600 !text-white placeholder:text-gray-400 focus:border-[#5133c0] focus:ring-2 focus:ring-[#5133c0]/20 rounded-lg px-3 pr-10 transition-all duration-200 hover:!bg-gray-900 ${keyboardVisible ? 'h-9 text-sm' : 'h-11 text-base'}`}
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
                <Label htmlFor="number" className={`text-white font-medium block ${keyboardVisible ? 'mb-1 text-xs' : 'mb-1.5 text-sm'}`}>
                  Phone Number *
                </Label>
                <div className="relative">
                  <Input
                    id="number"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    className={`!bg-black border-2 border-gray-600 !text-white placeholder:text-gray-400 focus:border-[#5133c0] focus:ring-2 focus:ring-[#5133c0]/20 rounded-lg px-3 pr-10 transition-all duration-200 hover:!bg-gray-900 ${keyboardVisible ? 'h-9 text-sm' : 'h-11 text-base'}`}
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
                <Label htmlFor="email" className={`text-white font-medium block ${keyboardVisible ? 'mb-1 text-xs' : 'mb-1.5 text-sm'}`}>
                  Email ID *
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`!bg-black border-2 border-gray-600 !text-white placeholder:text-gray-400 focus:border-[#5133c0] focus:ring-2 focus:ring-[#5133c0]/20 rounded-lg px-3 pr-10 transition-all duration-200 hover:!bg-gray-900 ${keyboardVisible ? 'h-9 text-sm' : 'h-11 text-base'}`}
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
                className={`w-full bg-gradient-to-r from-[#5133c0] to-[#4528a0] hover:from-[#5133c0]/90 hover:to-[#4528a0]/90 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-[#5133c0]/25 ${keyboardVisible ? 'py-2 text-xs' : 'py-3 text-sm'}`}
              >
                Register for Pre-Launch Offer
              </Button>
            </div>
            
            {/* Extra space for better scrolling */}
            <div className={keyboardVisible ? 'h-8' : 'h-16'}></div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
});

export default Hero;