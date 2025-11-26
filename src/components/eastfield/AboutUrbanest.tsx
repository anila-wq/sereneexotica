import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Users, 
  Building, 
  MapPin,
  Clock
} from '../ui/icons';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const achievements = [
  {
    icon: <Building className="w-8 h-8" />,
    number: "50+",
    label: "Projects Delivered",
    description: "Successfully completed residential projects across Bangalore"
  },
  {
    icon: <Users className="w-8 h-8" />,
    number: "5000+",
    label: "Happy Families",
    description: "Families enjoying their dream homes with Urbanest"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    number: "25+",
    label: "Years Experience",
    description: "Decades of expertise in real estate development"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    number: "15+",
    label: "Prime Locations",
    description: "Strategic locations across Bangalore's growth corridors"
  }
];



export default function AboutUrbanest() {
  return (
    <section id="about-urbanest" className="pt-18 pb-6 lg:pt-20 lg:pb-8 bg-gray-900">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Desktop Horizontal Layout */}
        <div className="hidden md:block">
          {/* Centered Main Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-normal mb-3 text-white">
              ABOUT URBANEST REALTY
            </h2>
          </div>

          <div className="w-full">
            <div className="space-y-6">
              <div className="text-center">

                <div className="space-y-3 text-gray-300 leading-relaxed">
                  <p>
                    At Urbanest Realty, we are committed to deliver the highest quality of construction and upholding our promises. 
                    Our primary goal is to ensure complete customer satisfaction and foster lasting relationships. Through our 
                    innovative approach, we have redefined the real estate industry in Bengaluru, enabling people to enjoy comfortable living.
                  </p>
                  <p>
                    Each project embodies perfection, precision and quality, striking the perfect balance between aesthetics and functionality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stacked Layout */}
        <div className="md:hidden">
          {/* About Urbanest Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-normal mb-3 text-white">
              ABOUT URBANEST REALTY
            </h2>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-white text-center">Our Legacy</h3>
            <div className="space-y-3 text-gray-300 leading-relaxed text-center">
              <p>
                At Urbanest Realty, we are committed to deliver the highest quality of construction and upholding our promises. 
                Our primary goal is to ensure complete customer satisfaction and foster lasting relationships. Through our 
                innovative approach, we have redefined the real estate industry in Bengaluru, enabling people to enjoy comfortable living.
              </p>
              <p>
                Each project embodies perfection, precision and quality, striking the perfect balance between aesthetics and functionality. 
                Over the years, we have successfully delivered 50+ residential projects across Bangalore's prime locations, 
                housing over 5,000 happy families with our unwavering commitment to excellence.
              </p>
            </div>
          </div>

          {/* RERA Section */}
          <div className="text-center">
            <div className="bg-black border border-gray-800 rounded-lg p-4 max-w-md mx-auto">
              <h5 className="text-lg font-semibold text-white mb-2">RERA Registration</h5>
              <p className="text-sm text-gray-300">
                PRM/KA/RERA/1250/304/PR/131224/007290
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}