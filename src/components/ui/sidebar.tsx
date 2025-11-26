import * as React from "react";

// Simplified sidebar without class-variance-authority
export const Sidebar = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <aside className={`flex flex-col ${className}`} {...props}>
    {children}
  </aside>
);

export const SidebarHeader = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

export const SidebarContent = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex-1 overflow-auto ${className}`} {...props}>
    {children}
  </div>
);

export const SidebarFooter = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

export const SidebarTrigger = ({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={`inline-flex items-center justify-center ${className}`} {...props}>
    {children}
  </button>
);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const useSidebar = () => ({
  open: true,
  setOpen: () => {},
  toggle: () => {},
});
