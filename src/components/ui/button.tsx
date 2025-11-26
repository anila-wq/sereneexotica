import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50";
    
    const variantStyles = {
      default: "bg-[#5133c0] text-white hover:bg-[#5133c0]/90",
      destructive: "bg-red-600 text-white hover:bg-red-600/90",
      outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-200/80",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      link: "text-[#5133c0] underline-offset-4 hover:underline",
    };
    
    const sizeStyles = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3",
      lg: "h-10 rounded-md px-6",
      icon: "h-9 w-9 rounded-md",
    };
    
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
    
    return (
      <button
        ref={ref}
        className={combinedClassName}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
export const buttonVariants = () => "";
