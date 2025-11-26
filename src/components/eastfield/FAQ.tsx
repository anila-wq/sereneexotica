import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ChevronDown, ChevronUp, X } from '../ui/icons';
import { toast } from '../ui/sonner';

const faqData = [
  {
    question: "Where is Serene Exotica located?",
    answer: "serene exotica is strategically located near benaka cinema, harohalli road, malur, karnataka - 563130. it's positioned in the vibrant heart of malur town with excellent connectivity to major hubs including whitefield (40 mins), sarjapur (40 mins), electronic city (60 mins), and bangalore international airport (50 mins)."
  },
  {
    question: "What is the total project area?",
    answer: "serene exotica spans across 40+ acres, making it a spacious township with ample green spaces. the project includes a dedicated 2+ acres sports zone with facilities like swimming pool, badminton court, cricket pitch, tennis court, basketball court, and an open amphitheatre."
  },
  {
    question: "What are the key amenities?",
    answer: "the project features a ready-to-use 2+ acres sports zone with swimming pool, badminton court, cricket pitch, tennis court, basketball court, and open amphitheatre. additionally, it offers premium villa plots with concrete roads, underground cabling, and top-class infrastructure in malur's prime location."
  },
  {
    question: "Is it approved & ready for registration?",
    answer: "yes, serene exotica is both rera approved and mpa approved, ensuring complete legal compliance and buyer protection. the plots are ready for construction, making it an ideal choice for those looking to build their dream villa immediately."
  },
  {
    question: "Are loan options available?",
    answer: "yes, we assist with loan arrangements through leading banks and financial institutions. our team can help you with documentation and connect you with pre-approved loan partners for smooth financing of your villa plot purchase."
  },
  {
    question: "Why buy villa plots in Malur at Serene Exotica?",
    answer: "serene exotica offers premium villa plots in malur's emerging growth hub with excellent appreciation potential. the location provides perfect balance of peaceful living and smart investment, with easy access to strr, bengaluru-chennai expressway, it parks, and industrial hubs. the 40+ acres township with ready sports zone and top-class infrastructure makes it an unmatched opportunity."
  }
];

const FAQ = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: ''
  });

  const toggleExpanded = (index: number) => {
    setExpandedItem(prev => prev === index ? null : index);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      message: 'FAQ Inquiry - Serene Exotica'
    });
    
    if (result.success) {
      toast.success(result.message, { duration: 5000 });
      setFormData({ name: '', number: '', email: '' });
      setIsModalOpen(false);
    } else {
      toast.error(result.message, { duration: 6000 });
    }
  };

  return (
    <section id="faqs" className="pt-6 pb-10 lg:pt-10 bg-gray-900" style={{ scrollMarginTop: '50px' }}>
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-normal mb-4 text-white">
            FAQ's
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Get answers to common questions about Serene Exotica villa plots in Malur
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-lg mx-auto space-y-4 mb-12">
          {faqData.map((item, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 hover:border-[#c9980b]/40 transition-colors duration-300 rounded-none">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full px-3 py-2 text-left flex justify-between items-start hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <h3 className="text-sm font-normal text-white leading-snug flex items-start pr-2">
                    <span className="text-[#c9980b] mr-1.5 font-normal">{index + 1}.</span>
                    <span className="pt-0.5">{item.question}</span>
                  </h3>
                  {expandedItem === index ? (
                    <ChevronUp className="w-4 h-4 text-[#c9980b] flex-shrink-0 mt-0.5" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#c9980b] flex-shrink-0 mt-0.5" />
                  )}
                </button>
                
                {expandedItem === index && (
                  <div className="px-3 pb-2">
                    <div className="border-t border-gray-700 pt-2 pl-5">
                      <p className="text-gray-300 text-sm leading-snug">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Still Have Questions?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our villa plot specialists are here to help you with any additional questions about Serene Exotica. 
            Get personalized assistance and detailed project information.
          </p>
          <Button 
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-[#5133c0] to-[#4528a0] hover:from-[#5133c0]/90 hover:to-[#4528a0]/90 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 transform hover:scale-105"
          >
            Contact our Experts
          </Button>
        </div>
      </div>

      {/* Inquiry Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-[#c9980b]/30 max-w-md mx-auto shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold text-center">
              Contact our Experts
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center">
              Get personalized answers about Serene Exotica villa plots from our experts.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="faq-name" className="text-white font-medium block mb-1.5">
                Full Name *
              </Label>
              <div className="relative">
                <Input
                  id="faq-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="!bg-black border-2 border-gray-600 !text-white placeholder:text-gray-400 focus:border-[#c9980b] focus:ring-2 focus:ring-[#c9980b]/20 rounded-lg px-3 pr-10 h-11 transition-all duration-200 hover:!bg-gray-900"
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
              <Label htmlFor="faq-number" className="text-white font-medium block mb-1.5">
                Phone Number *
              </Label>
              <div className="relative">
                <Input
                  id="faq-number"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                  className="!bg-black border-2 border-gray-600 !text-white placeholder:text-gray-400 focus:border-[#c9980b] focus:ring-2 focus:ring-[#c9980b]/20 rounded-lg px-3 pr-10 h-11 transition-all duration-200 hover:!bg-gray-900"
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
              <Label htmlFor="faq-email" className="text-white font-medium block mb-1.5">
                Email Address *
              </Label>
              <div className="relative">
                <Input
                  id="faq-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="!bg-black border-2 border-gray-600 !text-white placeholder:text-gray-400 focus:border-[#c9980b] focus:ring-2 focus:ring-[#c9980b]/20 rounded-lg px-3 pr-10 h-11 transition-all duration-200 hover:!bg-gray-900"
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

            {/* Consent Note */}
            <div className="text-xs text-gray-400 text-center">
              <p>By submitting this form, you consent to be contacted by Urbanest Realty regarding Serene Exotica, even if you are registered under DNC/NDNC.</p>
            </div>
            
            <div className="border-t border-gray-700/30 pt-4">
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#c9980b] to-[#b8860b] hover:from-[#c9980b]/90 hover:to-[#b8860b]/90 text-black font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-[#c9980b]/25"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FAQ;