import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
  asChild?: boolean;
}

function Badge({
  className = "",
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap";
  
  const variantStyles = {
    default: "border-transparent bg-[#5133c0] text-white hover:bg-[#5133c0]/90",
    secondary: "border-transparent bg-gray-200 text-gray-900 hover:bg-gray-200/90",
    destructive: "border-transparent bg-red-600 text-white hover:bg-red-600/90",
    outline: "text-gray-900 hover:bg-gray-100",
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  const Comp = asChild ? "div" : "span";
  
  return (
    <Comp
      className={combinedClassName}
      {...props}
    />
  );
}

export { Badge };
export const badgeVariants = () => "";
