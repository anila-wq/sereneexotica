import * as React from "react";

// Simplified navigation menu without Radix UI dependencies
export const NavigationMenu = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLElement>) => (
  <nav className={`relative flex max-w-max flex-1 items-center justify-center ${className}`} {...props}>
    {children}
  </nav>
);

export const NavigationMenuList = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className={`flex flex-1 list-none items-center justify-center gap-1 ${className}`} {...props}>
    {children}
  </ul>
);

export const NavigationMenuItem = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLLIElement>) => (
  <li className={`relative ${className}`} {...props}>
    {children}
  </li>
);

export const NavigationMenuTrigger = ({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium ${className}`} {...props}>
    {children}
  </button>
);

export const NavigationMenuContent = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`absolute left-0 top-full w-full ${className}`} {...props}>
    {children}
  </div>
);

export const NavigationMenuLink = ({ children, className = "", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a className={`block select-none rounded-md p-3 no-underline outline-none ${className}`} {...props}>
    {children}
  </a>
);

export const NavigationMenuIndicator = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={className} {...props} />
);

export const NavigationMenuViewport = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={className} {...props} />
);

export const navigationMenuTriggerStyle = () => "";
