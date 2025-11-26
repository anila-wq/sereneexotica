import image_d7788d35b331724c9e1f531250267ac1472498e4 from 'figma:asset/d7788d35b331724c9e1f531250267ac1472498e4.png';
import image_eae075123418c2f6b24913ac633abc96778773bf from 'figma:asset/eae075123418c2f6b24913ac633abc96778773bf.png';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Linkedin,
  ArrowRight,
  Home
} from '../ui/icons';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Main Footer Content */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Company Info */}
          <div className="text-left">
            <div className="flex items-center justify-start mb-6">
              <ImageWithFallback
                src={image_d7788d35b331724c9e1f531250267ac1472498e4}
                alt="Serene Exotica by Urbanest Realty"
                className="h-20 md:h-24 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              Creating exceptional residential experiences with modern design, premium amenities, 
              and sustainable living for over 25 years.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg mb-3 text-white font-bold">Quick Links</h4>
            <ul className="space-y-2 -mt-2">
              <li><a href="#overview" className="text-gray-300 hover:text-[#c9980b] transition-colors duration-200">Project Overview</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-[#c9980b] transition-colors duration-200">Gallery</a></li>
              <li><a href="#location" className="text-gray-300 hover:text-[#c9980b] transition-colors duration-200">Location</a></li>
              <li><a href="#faqs" className="text-gray-300 hover:text-[#c9980b] transition-colors duration-200">FAQ's</a></li>
              <li><a href="#about-urbanest" className="text-gray-300 hover:text-[#c9980b] transition-colors duration-200">About Urbanest</a></li>
            </ul>
            <div className="flex space-x-4 pt-6 justify-center">
              <a 
                href="https://www.instagram.com/urbanest_realty?igsh=MTM5bWNpdjM4ZmY2dA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#c9980b] hover:text-black transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/share/1GDdMW9MHq/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#c9980b] hover:text-black transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/urbanest-realty-669997303/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#c9980b] hover:text-black transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-left">
            <h4 className="text-lg mb-3 text-white font-bold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c9980b] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Serene Exotica, near Benaka Cinema</p>
                  <p className="text-gray-300">Harohalli Road, Malur</p>
                  <p className="text-gray-300">Karnataka - 563130</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#c9980b]" />
                <a 
                  href="tel:9739113345" 
                  className="text-gray-300 hover:text-[#c9980b] transition-colors duration-200"
                >
                  +91 97391 13345
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#c9980b]" />
                <a 
                  href="mailto:sem@urbanestrealty.in" 
                  className="text-gray-300 hover:text-[#c9980b] transition-colors duration-200"
                >
                  sem@urbanestrealty.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RERA Compliance */}
        <div className="border-t border-gray-800 py-6">
          <div className="text-center mb-4">
            <h4 className="text-lg mb-3 text-white font-bold">RERA Compliance</h4>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-semibold">RERA Number:</span> PRM/KA/RERA/1265/347/PR/131224/007288
              </p>
              <p className="text-gray-300">
                <a 
                  href="https://rera.karnataka.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#c9980b] hover:text-[#c9980b]/80 transition-colors duration-200 underline"
                >
                  Visit RERA Karnataka Portal
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-1 bg-black flex justify-center items-center">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Urbanest Realty. All rights reserved. | Serene Exotica
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}