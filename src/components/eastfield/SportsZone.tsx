import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { useState, useEffect, useCallback } from 'react';
import { toast } from '../ui/sonner';
import { X } from '../ui/icons';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import basketballImage from 'figma:asset/409037d364f014a1beaac42c0c22377f79224d4a.png';
import basketballImage2 from 'figma:asset/d683c1596a92dd1246855623fa6094159c0f42ca.png';
import basketballImage3 from 'figma:asset/6673a3afe1782cfafcc5eca35b4e5d72ca47d9eb.png';
import basketballImage4 from 'figma:asset/96abbf551544da9b07d7cfad1093c6e25a450cac.png';
import tennisCourtImage from 'figma:asset/3ab542868c810632f73afa78a4b94c5707a0ef4b.png';
import cricketBadmintonImage from 'figma:asset/037d9f0f5c499a4f67800e54d42adc96ecc06e06.png';
import swimmingPoolImage from 'figma:asset/767ad0369df8c45bb22ee76738d72d838e9a1ebc.png';
import swimmingPoolImage2 from 'figma:asset/b345935fdb12c32a05716925bf0bc5258e86addd.png';
import swimmingPoolImage3 from 'figma:asset/2a038649db4a73a9b25f7b80ed4b59752d8bcd9d.png';
import swimmingPoolImage4 from 'figma:asset/cacc7d0542330c66e3ec96e4dd0de6bf4fa060f6.png';
import tennisCourtImage1 from 'figma:asset/491d2f06bbb98eadad1edf6a512b5777c9350945.png';
import tennisCourtImage2 from 'figma:asset/fe5a93e203aa683ae79a832416c0646eda144a00.png';
import tennisCourtImage3 from 'figma:asset/aefd01755bcc94eb5e730f0e50889481a27bd42a.png';
import tennisCourtPeopleImage from 'figma:asset/bf1f0cb769d6e9f362c867512752cffc588e2af8.png';
import tennisCourtAerialImage from 'figma:asset/6c641de1bda39e1e2c9fc822ceba4ce8ddfb4ae1.png';
import cricketImage1 from 'figma:asset/2f5a5f1bd9202e90357f53636c8004782754b141.png';
import cricketImage2 from 'figma:asset/5e215f73d8c86a180c868639e0588a44769c3f33.png';
import cricketImage3 from 'figma:asset/6c641de1bda39e1e2c9fc822ceba4ce8ddfb4ae1.png';
import badmintonImage1 from 'figma:asset/0b042088bc4dfb7b2a86c50b13f785bda2f8e0c9.png';
import badmintonImage2 from 'figma:asset/60c2606964035b83c3c9065a1a28e897d408353e.png';
import badmintonImage3 from 'figma:asset/3ab542868c810632f73afa78a4b94c5707a0ef4b.png';

const SportsZone = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [tennisCarouselApi, setTennisCarouselApi] = useState<any>(null);
  const [basketballCarouselApi, setBasketballCarouselApi] = useState<any>(null);
  const [cricketCarouselApi, setCricketCarouselApi] = useState<any>(null);
  const [badmintonCarouselApi, setBadmintonCarouselApi] = useState<any>(null);

  // Swimming pool images for carousel
  const swimmingPoolImages = [
    {
      src: swimmingPoolImage,
      alt: "Swimming Pool - Shot On-Site at Serene Exotica",
      title: "Swimming Pool",
      subtitle: "Love Swimming? Swim & Shine Today!"
    },
    {
      src: swimmingPoolImage2,
      alt: "Swimming Pool - Shot On-Site at Serene Exotica",
      title: "Swimming Pool",
      subtitle: "Love Swimming? Swim & Shine Today!"
    },
    {
      src: swimmingPoolImage4,
      alt: "Swimming Pool - Shot On-Site at Serene Exotica",
      title: "Swimming Pool",
      subtitle: "Love Swimming? Swim & Shine Today!"
    }
  ];

  // Tennis court images for carousel
  const tennisCourtImages = [
    {
      src: tennisCourtImage1,
      alt: "Tennis Court - Shot On-Site at Serene Exotica",
      title: "Tennis Court",
      subtitle: "Love Tennis? Grab & Swing Today!"
    },
    {
      src: tennisCourtImage2,
      alt: "Tennis Court Action - Shot On-Site at Serene Exotica",
      title: "Tennis Court",
      subtitle: "Love Tennis? Grab & Swing Today!"
    },
    {
      src: tennisCourtImage3,
      alt: "Tennis Court Aerial View - Shot On-Site at Serene Exotica",
      title: "Tennis Court",
      subtitle: "Love Tennis? Grab & Swing Today!"
    }
  ];

  // Basketball court images for carousel
  const basketballCourtImages = [
    {
      src: basketballImage,
      alt: "Basketball Court - Shot On-Site at Serene Exotica",
      title: "Basketball Court",
      subtitle: "Love Basketball? Grab & Shoot Today!"
    },
    {
      src: basketballImage2,
      alt: "Basketball Players - Shot On-Site at Serene Exotica",
      title: "Basketball Court",
      subtitle: "Love Basketball? Grab & Shoot Today!"
    },
    {
      src: basketballImage3,
      alt: "Basketball Action - Shot On-Site at Serene Exotica",
      title: "Basketball Court",
      subtitle: "Love Basketball? Grab & Shoot Today!"
    },
    {
      src: basketballImage4,
      alt: "Basketball Court Aerial - Shot On-Site at Serene Exotica",
      title: "Basketball Court",
      subtitle: "Love Basketball? Grab & Shoot Today!"
    }
  ];

  // Cricket pitch images for carousel
  const cricketPitchImages = [
    {
      src: cricketBadmintonImage,
      alt: "Cricket Pitch - Shot On-Site at Serene Exotica",
      title: "Cricket Pitch",
      subtitle: "Love Cricket? Pitch Ready, Play Today!"
    },
    {
      src: cricketImage1,
      alt: "Cricket Action - Shot On-Site at Serene Exotica",
      title: "Cricket Pitch",
      subtitle: "Love Cricket? Pitch Ready, Play Today!"
    },
    {
      src: cricketImage2,
      alt: "Cricket Players - Shot On-Site at Serene Exotica",
      title: "Cricket Pitch",
      subtitle: "Love Cricket? Pitch Ready, Play Today!"
    },
    {
      src: cricketImage3,
      alt: "Cricket Aerial View - Shot On-Site at Serene Exotica",
      title: "Cricket Pitch",
      subtitle: "Love Cricket? Pitch Ready, Play Today!"
    }
  ];

  // Badminton court images for carousel
  const badmintonCourtImages = [
    {
      src: badmintonImage1,
      alt: "Badminton Court - Shot On-Site at Serene Exotica",
      title: "Badminton Court",
      subtitle: "Love Badminton? Train & Smash Today!"
    },
    {
      src: badmintonImage2,
      alt: "Badminton Players - Shot On-Site at Serene Exotica",
      title: "Badminton Court",
      subtitle: "Love Badminton? Train & Smash Today!"
    },
    {
      src: badmintonImage3,
      alt: "Badminton Action - Shot On-Site at Serene Exotica",
      title: "Badminton Court",
      subtitle: "Love Badminton? Train & Smash Today!"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dynamic import for form submission
    const { submitFormData } = await import('../../utils/formSubmission');
    
    // Submit form data to webhook and Google Form
    const result = await submitFormData({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: 'Sports Zone Site Visit Request - Serene Exotica'
    });
    
    if (result.success) {
      toast.success(result.message, { duration: 5000 });
      setIsDialogOpen(false);
      setFormData({ name: '', email: '', phone: '' });
    } else {
      toast.error(result.message, { duration: 6000 });
    }
  };

  const sportsAmenities = [
    { title: 'Cricket Ground', description: 'Full-size cricket ground with professional turf' },
    { title: 'Football Field', description: 'FIFA standard football field with natural grass' },
    { title: 'Tennis Courts', description: 'Multiple tennis courts with all-weather surface' },
    { title: 'Basketball Court', description: 'Professional basketball court with modern flooring' },
    { title: 'Badminton Courts', description: 'Indoor badminton courts with proper lighting' },
    { title: 'Swimming Pool', description: 'Olympic-size swimming pool with lap lanes' },
    { title: 'Jogging Track', description: '1.5 km jogging track around the sports zone' },
    { title: 'Gymnasium', description: 'Fully equipped modern gymnasium with latest equipment' }
  ];

  return (
    <section id="sports-zone" className="pt-18 pb-12 lg:pt-20 lg:pb-16 bg-black">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
            Ready-to-Use <span className="text-[#c9980b]">2 Acres</span> of Sports Zone
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience world-class sports facilities at your doorstep. Our dedicated 2-acre sports zone 
            offers premium amenities for all age groups and fitness levels.
          </p>
        </div>

        {/* On-Site Photos Gallery */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-5xl font-light text-white mb-4">
              Actual <span className="text-[#c9980b]">On-Site</span> Amenities
            </h3>
            <p className="text-gray-300">Shot On-Site - Experience the premium sports infrastructure</p>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-4 sports-gallery-scroll snap-x snap-mandatory">
            {/* Swimming Pool Images */}
            {swimmingPoolImages.map((image, index) => (
              <div key={`swimming-${index}`} className="relative overflow-hidden rounded-lg border-2 border-gray-700 hover:border-[#c9980b] transition-all duration-300 flex-shrink-0 w-full md:w-[400px] snap-start">
                <div className="relative group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
                    <h4 className="text-white font-semibold mb-1">{image.title}</h4>
                    <p className="text-[#c9980b] text-sm font-medium">{image.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Tennis Court Images */}
            {tennisCourtImages.map((image, index) => (
              <div key={`tennis-${index}`} className="relative overflow-hidden rounded-lg border-2 border-gray-700 hover:border-[#c9980b] transition-all duration-300 flex-shrink-0 w-full md:w-[400px] snap-start">
                <div className="relative group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
                    <h4 className="text-white font-semibold mb-1">{image.title}</h4>
                    <p className="text-[#c9980b] text-sm font-medium">{image.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Basketball Court Images */}
            {basketballCourtImages.map((image, index) => (
              <div key={`basketball-${index}`} className="relative overflow-hidden rounded-lg border-2 border-gray-700 hover:border-[#c9980b] transition-all duration-300 flex-shrink-0 w-full md:w-[400px] snap-start">
                <div className="relative group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
                    <h4 className="text-white font-semibold mb-1">{image.title}</h4>
                    <p className="text-[#c9980b] text-sm font-medium">{image.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Cricket Pitch Images */}
            {cricketPitchImages.map((image, index) => (
              <div key={`cricket-${index}`} className="relative overflow-hidden rounded-lg border-2 border-gray-700 hover:border-[#c9980b] transition-all duration-300 flex-shrink-0 w-full md:w-[400px] snap-start">
                <div className="relative group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
                    <h4 className="text-white font-semibold mb-1">{image.title}</h4>
                    <p className="text-[#c9980b] text-sm font-medium">{image.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Badminton Court Images */}
            {badmintonCourtImages.map((image, index) => (
              <div key={`badminton-${index}`} className="relative overflow-hidden rounded-lg border-2 border-gray-700 hover:border-[#c9980b] transition-all duration-300 flex-shrink-0 w-full md:w-[400px] snap-start">
                <div className="relative group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
                    <h4 className="text-white font-semibold mb-1">{image.title}</h4>
                    <p className="text-[#c9980b] text-sm font-medium">{image.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-light text-white mb-6">
            Ready to Experience <span className="text-[#c9980b]">Premium Sports Lifestyle Living?</span>
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Book your visit to explore our state-of-the-art sports facilities and secure your villa plot today.
          </p>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-[#5133c0] hover:bg-[#4528a0] text-white px-8 py-3 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Schedule Site Visit
          </Button>
        </div>

        {/* Contact Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-light text-center mb-2">
                Schedule Your <span className="text-[#c9980b]">Site Visit</span>
              </DialogTitle>
              <DialogDescription className="text-gray-400 text-center">
                Experience our premium sports zone facilities in person
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div>
                <Label htmlFor="name" className="text-white mb-2 block">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white focus:border-[#c9980b] pr-10"
                    style={{ backgroundColor: '#1f2937', color: '#ffffff' }}
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
                <Label htmlFor="email" className="text-white mb-2 block">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white focus:border-[#c9980b] pr-10"
                    style={{ backgroundColor: '#1f2937', color: '#ffffff' }}
                    required
                  />
                  {formData.email && (
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, email: ''})}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      aria-label="Clear email"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="phone" className="text-white mb-2 block">Phone Number</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white focus:border-[#c9980b] pr-10"
                    style={{ backgroundColor: '#1f2937', color: '#ffffff' }}
                    required
                  />
                  {formData.phone && (
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, phone: ''})}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      aria-label="Clear phone"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#c9980b] hover:bg-[#b8860b] text-black font-semibold py-3"
              >
                Schedule Visit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default SportsZone;