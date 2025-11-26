// Simplified icon components to replace lucide-react
import * as React from "react";

interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number;
}

const createIcon = (path: string, viewBox = "0 0 24 24") => {
  return React.forwardRef<SVGSVGElement, IconProps>(({ size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {typeof path === 'string' ? <path d={path} /> : path}
    </svg>
  ));
};

export const XIcon = createIcon("M18 6 6 18M6 6l12 12");
export const Download = createIcon("M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3");
export const Map = createIcon("M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0zM15 5.764v15M9 3.236v15");
export const FileText = createIcon("M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5zM14 2v6h6M16 13H8M16 17H8M10 9H8");
export const ChevronDown = createIcon("m6 9 6 6 6-6");
export const ChevronUp = createIcon("m18 15-6-6-6 6");
export const ChevronLeft = createIcon("m15 18-6-6 6-6");
export const ChevronRight = createIcon("m9 18 6-6-6-6");
export const CheckCircle = createIcon("M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3");
export const Phone = createIcon("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z");
export const Mail = createIcon("M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6");
export const Calendar = createIcon("M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z");
export const MapPin = createIcon("M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z");
export const Home = createIcon("m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z");
export const ArrowRight = createIcon("M5 12h14M12 5l7 7-7 7");
export const ArrowLeft = createIcon("m12 19-7-7 7-7M5 12h14");
export const Menu = createIcon("M4 6h16M4 12h16M4 18h16");
export const X = createIcon("M18 6 6 18M6 6l12 12");
export const MessageCircle = createIcon("M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z");
export const Star = createIcon("M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z");
export const Quote = createIcon("M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z");
export const Award = createIcon("M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89 7 23l5-3 5 3-1.21-9.12");
export const Building = createIcon("M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18ZM6 12H4a2 2 0 0 0-2 2v8h4M18 12h2a2 2 0 0 1 2 2v8h-4");
export const Building2 = createIcon("M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18ZM6 12H4a2 2 0 0 0-2 2v8h4M18 9h2a2 2 0 0 1 2 2v11h-4M10 6h4M10 10h4M10 14h4M10 18h4");
export const Clock = createIcon("M12 2v20M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20M12 6v6l4 2");
export const Users = createIcon("M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75");
export const Plane = createIcon("M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z");
export const TreePine = createIcon("M17 14h.01M17 10h.01M17 6h.01M12 2v6l-4-2-4 6h8M12 8l4-2 4 6h-8M12 14v8");
export const BookOpen = createIcon("M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z");
export const Loader2 = createIcon("M21 12a9 9 0 1 1-6.219-8.56");
export const Volume2 = createIcon("M11 5 6 9H2v6h4l5 4zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14");
export const VolumeX = createIcon("M11 5 6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6");
export const MoreHorizontal = createIcon("M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z");

// Additional icons
export const CheckIcon = createIcon("m20 6-11 11-5-5");
export const ChevronRightIcon = ChevronRight;
export const ChevronDownIcon = ChevronDown;
export const CircleIcon = createIcon("M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z");
export const SearchIcon = createIcon("m21 21-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0z");
export const MinusIcon = createIcon("M5 12h14");
export const GripVerticalIcon = createIcon("M9 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM9 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM9 20a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM15 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM15 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM15 20a1 1 0 1 1 0-2 1 1 0 0 1 0 2z");

// Additional icons that might be needed
export const Facebook = createIcon("M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z");
export const Instagram = createIcon("M16 4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM17 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z");
export const Linkedin = createIcon("M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z");
export const Twitter = createIcon("M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z");
export const Youtube = createIcon("M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z");
export const Shield = createIcon("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z");
export const Sparkles = createIcon("M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0z");
export const Target = createIcon("M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z");
export const Leaf = createIcon("M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10ZM2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12");
export const TrendingUp = createIcon("M22 7 13.5 15.5 8.5 10.5 2 17M16 7h6v6");
export const Zap = createIcon("M13 2 3 14h9l-1 8 10-12h-9l1-8z");
export const School = createIcon("M3 21h18M6 21V7M10 21V7M14 21V7M18 21V7M2 7l10-5 10 5M6 7v.01M10 7v.01M14 7v.01M18 7v.01");
export const Heart = createIcon("M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z");
export const ShoppingBag = createIcon("M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0");
export const Car = createIcon("M14 16H9m10 0h3l-3.447-6.894A2 2 0 0 0 16.764 8H7.236a2 2 0 0 0-1.789 1.106L2 16h3m9 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0 4 0m-4 0H9m0 0a2 2 0 1 1-4 0");
export const Navigation = createIcon("M3 11l19-9-9 19-2-8-8-2z");
export const Coffee = createIcon("M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4zM6 1v3M10 1v3M14 1v3");
export const Droplet = createIcon("M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z");
