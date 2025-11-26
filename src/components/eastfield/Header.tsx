import image_d7788d35b331724c9e1f531250267ac1472498e4 from 'figma:asset/d7788d35b331724c9e1f531250267ac1472498e4.png';
import image_0c1e9899896b786103246b29b6b25c9fbfdc5fa9 from 'figma:asset/0c1e9899896b786103246b29b6b25c9fbfdc5fa9.png';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Download } from '../ui/icons';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Simple logic: if scrolled more than hero section height, show background
      const heroSection = document.getElementById('hero-section'); // Desktop hero
      const heroSectionMobile = document.getElementById('hero-section-mobile'); // Mobile hero
      
      let heroHeight = 0;
      
      if (window.innerWidth >= 768) {
        // Desktop: use hero-section height or fallback to viewport height
        heroHeight = heroSection?.offsetHeight || window.innerHeight;
      } else {
        // Mobile: use mobile hero section height  
        heroHeight = heroSectionMobile?.offsetHeight || window.innerHeight;
      }
      
      // Show background when scrolled past 90% of hero section
      const threshold = heroHeight * 0.9;
      setIsScrolled(scrollPosition > threshold);
    };

    // Throttled scroll handler for better performance
    let ticking = false;
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', optimizedScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Set initial state - start transparent
    setIsScrolled(false);
    
    // Check initial state after DOM is ready
    const timer = setTimeout(handleScroll, 300);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', optimizedScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-black border-b border-gray-800 shadow-xl' 
          : 'bg-black/90 backdrop-blur-sm border-b border-gray-800/50'
      }`}
      style={{
        width: '100vw',
        height: '60px',
        left: 0,
        right: 0,
        position: 'fixed'
      }}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
        isScrolled ? 'relative' : ''
      }`}>
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo Section */}
          <div className="flex-shrink-0 relative z-[100]">
            <a 
              href="https://urbanestrealty.in/"
              className="cursor-pointer hover:opacity-80 transition-opacity select-none block"
              rel="noopener noreferrer"
              style={{ 
                position: 'relative',
                zIndex: 100,
                display: 'block',
                width: 'fit-content',
                textDecoration: 'none'
              }}
            >
              <ImageWithFallback
                src={image_0c1e9899896b786103246b29b6b25c9fbfdc5fa9}
                alt="Eastfield by Urbanest Realty"
                className="h-10 w-auto object-contain select-none"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              />
            </a>
          </div>

          {/* Menu Button Section */}
          <div className="flex-shrink-0">
            <button
              className="flex items-center justify-center w-12 h-12 text-white hover:bg-white/10 rounded-xl transition-all duration-200 border border-white/20 hover:border-[#5133c0]/60 hover:shadow-lg hover:shadow-[#5133c0]/20 mr-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 transition-transform duration-200 rotate-0 hover:rotate-90" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Full Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800/50 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-6 space-y-4">
                {/* Navigation Links */}
                <nav className="space-y-1">
                  <a
                    href="https://urbanestrealty.in"
                    className="block px-3 py-2 text-lg font-medium text-white hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Home</span>
                  </a>
                  <a
                    href="#overview"
                    className="block px-3 py-2 text-lg font-medium text-white hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Overview</span>
                  </a>
                  <a
                    href="#sports-zone"
                    className="block px-3 py-2 text-lg font-medium text-white hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Sports Zone</span>
                  </a>
                  <a
                    href="#location"
                    className="block px-3 py-2 text-lg font-medium text-white hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Location</span>
                  </a>
                  <a
                    href="#faqs"
                    className="block px-3 py-2 text-lg font-medium text-white hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>FAQ's</span>
                  </a>
                  <a
                    href="#about-urbanest"
                    className="block px-3 py-2 text-lg font-medium text-white hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>About Urbanest</span>
                  </a>
                  <a
                    href="https://urbanestrealty.in/blogs"
                    className="block px-3 py-2 text-lg font-medium text-white hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Blogs</span>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}