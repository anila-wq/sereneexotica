import { useState, memo, useCallback } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Download, FileText, Map, Loader2, Building2, BookOpen, TreePine, Award, CheckCircle, MapPin, Users, Clock, X } from '../ui/icons';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from '../ui/sonner';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import swimmingPoolImage from 'figma:asset/cacc7d0542330c66e3ec96e4dd0de6bf4fa060f6.png';
import badmintonCourtImage from 'figma:asset/037d9f0f5c499a4f67800e54d42adc96ecc06e06.png';
import tennisCourtImage from 'figma:asset/0b042088bc4dfb7b2a86c50b13f785bda2f8e0c9.png';
import basketballImage from 'figma:asset/6673a3afe1782cfafcc5eca35b4e5d72ca47d9eb.png';
import tennisPlayersImage from 'figma:asset/fe5a93e203aa683ae79a832416c0646eda144a00.png';
import basketballCourtImage from 'figma:asset/d683c1596a92dd1246855623fa6094159c0f42ca.png';
import swimmingPoolSunsetImage from 'figma:asset/767ad0369df8c45bb22ee76738d72d838e9a1ebc.png';
import tennisCourtPlayersImage from 'figma:asset/3ab542868c810632f73afa78a4b94c5707a0ef4b.png';
import brochureImage from 'figma:asset/7bf553adee2ade1463374c3dae514556211be97d.png';
import masterPlanImage from 'figma:asset/a5226a073fbf4a7dc7ab709262e39926a2fe2742.png';

const ProjectOverview = memo(function ProjectOverview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: ''
  });

  const handleIconClick = useCallback((actionType: string) => {
    setSelectedAction(actionType);
    setIsModalOpen(true);
  }, []);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.number || !formData.email) {
      toast.error('Please fill in all fields');
      return;
    }

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

    setIsSubmitting(true);
    
    // Dynamic import for form submission
    const { submitFormData } = await import('../../utils/formSubmission');
    
    // Submit form data to webhook and Google Form
    const result = await submitFormData({
      name: formData.name,
      number: formData.number,
      email: formData.email,
      message: `${selectedAction} - Serene Exotica`
    });
    
    if (result.success) {
      toast.success(result.message, { duration: 5000 });
      setFormData({ name: '', number: '', email: '' });
      setIsModalOpen(false);
    } else {
      toast.error(result.message, { duration: 6000 });
    }
    
    setIsSubmitting(false);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setFormData({ name: '', number: '', email: '' });
  }, []);

  return (
    <section id="overview" className="pt-18 pb-12 lg:pt-20 lg:pb-16 bg-gray-900">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-normal mb-3 text-white">
            THE ADVANTAGE OF SERENE EXOTICA
          </h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Premium villa plots with concrete roads, underground cabling, top-class infrastructure in Malur's prime location. 
            Perfect for peaceful living & smart investment.
          </p>

          {/* Key Highlights Grid - 4 Column Icons */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-[#5133c0]/40 transition-colors duration-300">
              <div className="flex flex-col items-center text-center">
                <TreePine className="w-10 h-10 text-[#5133c0] mb-2" />
                <h3 className="text-white font-semibold mb-2">40+ Acres</h3>
                <p className="text-gray-300 text-sm">Township</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-[#5133c0]/40 transition-colors duration-300">
              <div className="flex flex-col items-center text-center">
                <Users className="w-10 h-10 text-[#5133c0] mb-2" />
                <h3 className="text-white font-semibold mb-2">2+ Acres</h3>
                <p className="text-gray-300 text-sm">Sports Zone</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-[#5133c0]/40 transition-colors duration-300">
              <div className="flex flex-col items-center text-center">
                <MapPin className="w-10 h-10 text-[#5133c0] mb-2" />
                <h3 className="text-white font-semibold mb-2">MPA</h3>
                <p className="text-gray-300 text-sm">Approved</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-[#5133c0]/40 transition-colors duration-300">
              <div className="flex flex-col items-center text-center">
                <Award className="w-10 h-10 text-[#5133c0] mb-2" />
                <h3 className="text-white font-semibold mb-2">RERA</h3>
                <p className="text-gray-300 text-sm">Approved</p>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-8 flex justify-center max-w-2xl mx-auto">
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-[#5133c0]/40 transition-colors duration-300 max-w-md w-full">
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="w-16 h-16 text-[#5133c0] mb-3" />
                <h3 className="text-white font-semibold mb-2">Ready for</h3>
                <p className="text-gray-300 text-sm">Registration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Documents Section */}
        <div className="mt-16">
          <div className="flex flex-row gap-4 justify-center items-stretch -mt-8 -mb-8 py-0">
            <div className="w-40 sm:w-48">
              <div 
                onClick={() => handleIconClick('Brochure')}
                className="w-full bg-gray-800/30 border border-gray-700 text-white transition-all duration-300 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-800/50 hover:border-[#5133c0]/40"
              >
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 overflow-hidden">
                  <ImageWithFallback
                    src={brochureImage}
                    alt="Serene Exotica Brochure Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-2 right-2">
                    <Download className="w-4 h-4 text-[#5133c0]" />
                  </div>
                </div>
                <div className="p-2 sm:p-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#5133c0]" />
                    <h4 className="font-light text-xs sm:text-sm">Brochure</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-40 sm:w-48">
              <div 
                onClick={() => handleIconClick('Master Plan')}
                className="w-full bg-gray-800/30 border border-gray-700 text-white transition-all duration-300 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-800/50 hover:border-[#5133c0]/40"
              >
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 overflow-hidden">
                  <ImageWithFallback
                    src={masterPlanImage}
                    alt="Serene Exotica Master Plan Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-2 right-2">
                    <Download className="w-4 h-4 text-[#5133c0]" />
                  </div>
                </div>
                <div className="p-2 sm:p-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#5133c0]" />
                    <h4 className="font-light text-xs sm:text-sm">Master Plan</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Modal */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-[#5133c0]/30 max-w-md mx-auto shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold text-center">
              Download {selectedAction}
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center">
              Fill in your details to get instant access to {selectedAction.toLowerCase()} for Serene Exotica villa plots.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="modal-name" className="text-white font-medium block mb-1.5">
                Full Name *
              </Label>
              <div className="relative">
                <Input
                  id="modal-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="!bg-black border-2 border-gray-600 !text-white placeholder:text-gray-400 focus:border-[#5133c0] focus:ring-2 focus:ring-[#5133c0]/20 rounded-lg px-3 pr-10 h-11 transition-all duration-200 hover:!bg-gray-900"
                  style={{ backgroundColor: '#000000', color: '#ffffff' }}
                  required
                  disabled={isSubmitting}
                />
                {formData.name && !isSubmitting && (
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
              <Label htmlFor="modal-number" className="text-white font-medium block mb-1.5">
                Phone Number *
              </Label>
              <div className="relative">
                <Input
                  id="modal-number"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                  className="!bg-black border-2 border-gray-600 !text-white placeholder:text-gray-400 focus:border-[#5133c0] focus:ring-2 focus:ring-[#5133c0]/20 rounded-lg px-3 pr-10 h-11 transition-all duration-200 hover:!bg-gray-900"
                  style={{ backgroundColor: '#000000', color: '#ffffff' }}
                  required
                  disabled={isSubmitting}
                />
                {formData.number && !isSubmitting && (
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
              <Label htmlFor="modal-email" className="text-white font-medium block mb-1.5">
                Email Address *
              </Label>
              <div className="relative">
                <Input
                  id="modal-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="!bg-black border-2 border-gray-600 !text-white placeholder:text-gray-400 focus:border-[#5133c0] focus:ring-2 focus:ring-[#5133c0]/20 rounded-lg px-3 pr-10 h-11 transition-all duration-200 hover:!bg-gray-900"
                  style={{ backgroundColor: '#000000', color: '#ffffff' }}
                  required
                  disabled={isSubmitting}
                />
                {formData.email && !isSubmitting && (
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

            {/* Consent Note */}
            <div className="text-xs text-gray-400 text-center">
              <p>By submitting this form, you consent to be contacted by Urbanest Realty regarding Serene Exotica, even if you are registered under DNC/NDNC.</p>
            </div>
            
            <div className="border-t border-gray-700/30 pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#5133c0] to-[#4528a0] hover:from-[#5133c0]/90 hover:to-[#4528a0]/90 text-white font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-[#5133c0]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  `Download ${selectedAction}`
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
});

export default ProjectOverview;