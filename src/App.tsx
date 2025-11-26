import { Suspense, lazy, useState, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import ThankYou from './components/sereneexotica/ThankYou';

// Prevent browser from scrolling to hash on page load
if (typeof window !== 'undefined') {
  // Save the current hash before clearing it
  const currentHash = window.location.hash;
  
  // Only preserve #thankyou hash, clear all others immediately
  if (currentHash && currentHash !== '#thankyou') {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  
  // Disable scroll restoration
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  
  // Force immediate scroll to top
  window.scrollTo(0, 0);
}

// Lazy load all components to reduce initial bundle
const Toaster = lazy(() => import('./components/ui/sonner').then(m => ({ default: m.Toaster })));
const Header = lazy(() => import('./components/eastfield/Header'));
const Hero = lazy(() => import('./components/eastfield/Hero'));
const DocumentsSection = lazy(() => import('./components/eastfield/DocumentsSection'));
const SectionNavigation = lazy(() => import('./components/eastfield/SectionNavigation'));
const ProjectOverview = lazy(() => import('./components/eastfield/ProjectOverview'));
const SportsZone = lazy(() => import('./components/eastfield/SportsZone'));
const AboutUrbanest = lazy(() => import('./components/eastfield/AboutUrbanest'));
const WhatsAppButton = lazy(() => import('./components/eastfield/WhatsAppButton'));
const Location = lazy(() => import('./components/eastfield/Location'));
const FAQ = lazy(() => import('./components/eastfield/FAQ'));
const Footer = lazy(() => import('./components/eastfield/Footer'));

// Simple loading fallback
const LoadingDiv = () => <div className="h-20 bg-gray-900 animate-pulse" />;

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, any>) => void;
    dataLayer?: any[];
  }
}

function App() {
  const [showThankYou, setShowThankYou] = useState(false);

  // Check URL on mount and listen for hash changes
  useEffect(() => {
    const checkThankYouPage = () => {
      try {
        // Check both hash and query params
        const hash = window.location.hash;
        const params = new URLSearchParams(window.location.search);
        const isThankYouPage = hash === '#thankyou' || params.get('thankyou') === 'true';
        
        console.log('Hash:', hash);
        console.log('Search params:', window.location.search);
        console.log('Is thank you page:', isThankYouPage);
        
        if (isThankYouPage) {
          setShowThankYou(true);
          console.log('✅ Thank you page detected - will show ThankYou component');
        } else {
          setShowThankYou(false);
        }
      } catch (error) {
        console.error('Error checking URL params:', error);
      }
    };

    // Check on mount
    checkThankYouPage();

    // Listen for hash changes
    window.addEventListener('hashchange', checkThankYouPage);

    return () => {
      window.removeEventListener('hashchange', checkThankYouPage);
    };
  }, []);

  // Scroll to top on initial page load and prevent scroll restoration
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Immediately scroll to top to prevent any hash-based scrolling
    window.scrollTo(0, 0);

    // Clear any hash in the URL on initial load (unless it's thankyou)
    if (window.location.hash && window.location.hash !== '#thankyou') {
      console.log('🔵 Clearing hash from URL:', window.location.hash);
      window.history.replaceState(null, '', window.location.pathname);
      // Force scroll to top again after clearing hash
      window.scrollTo(0, 0);
    }

    // Force scroll to top on initial load with multiple attempts
    if (!showThankYou) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.scrollTo(0, 0);
        console.log('✅ Forced scroll to top on page load');
      }, 0);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 300);
    }
  }, []);

  // Keep scroll at top when showThankYou changes
  useEffect(() => {
    if (!showThankYou) {
      window.scrollTo(0, 0);
    }
  }, [showThankYou]);

  // Load Google Analytics
  useEffect(() => {
    try {
      console.log('📊 Initializing Google Analytics with ID: G-LCEHXQHJZV');
      
      // Load gtag.js script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-LCEHXQHJZV';
      script1.onload = () => {
        console.log('✅ Google Analytics script loaded');
      };
      script1.onerror = () => {
        console.error('❌ Failed to load Google Analytics script');
      };
      document.head.appendChild(script1);

      // Initialize gtag
      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-LCEHXQHJZV', {
          'send_page_view': true
        });
        console.log('✅ Google Analytics initialized with ID: G-LCEHXQHJZV');
      `;
      document.head.appendChild(script2);

      return () => {
        // Cleanup scripts on unmount
        try {
          if (document.head.contains(script1)) document.head.removeChild(script1);
          if (document.head.contains(script2)) document.head.removeChild(script2);
        } catch (e) {
          console.error('Error cleaning up scripts:', e);
        }
      };
    } catch (error) {
      console.error('Error loading Google Analytics:', error);
    }
  }, []);

  // Show thank you page if URL parameter is present
  if (showThankYou) {
    console.log('Rendering ThankYou component');
    return <ThankYou onClose={() => {
      setShowThankYou(false);
      window.location.hash = '';
      window.history.pushState({}, '', '/');
    }} />;
  }

  console.log('Rendering main app');
  return (
    <div className="min-h-screen bg-black text-white">
      <ErrorBoundary>
        <Suspense fallback={<LoadingDiv />}>
          <Header />
        </Suspense>
      </ErrorBoundary>
      
      <main>
        <ErrorBoundary>
          <Suspense fallback={<LoadingDiv />}>
            <Hero />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<LoadingDiv />}>
            <DocumentsSection />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<LoadingDiv />}>
            <SectionNavigation />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<LoadingDiv />}>
            <ProjectOverview />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<LoadingDiv />}>
            <SportsZone />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<LoadingDiv />}>
            <Location />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<LoadingDiv />}>
            <FAQ />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<LoadingDiv />}>
            <AboutUrbanest />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<LoadingDiv />}>
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </main>
      
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
      <Suspense fallback={null}>
        <Toaster position="top-center" richColors closeButton />
      </Suspense>
    </div>
  );
}

export default App;
