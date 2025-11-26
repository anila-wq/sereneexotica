import * as React from "react";

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className = "", variant = "default", size = "default", pressed, onPressedChange, ...props }, ref) => {
    const [isPressed, setIsPressed] = React.useState(pressed || false);
    
    React.useEffect(() => {
      if (pressed !== undefined) {
        setIsPressed(pressed);
      }
    }, [pressed]);
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newPressed = !isPressed;
      setIsPressed(newPressed);
      onPressedChange?.(newPressed);
      props.onClick?.(e);
    };
    
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";
    
    const variantStyles = {
      default: `bg-transparent hover:bg-gray-100 ${isPressed ? "bg-gray-200 text-gray-900" : ""}`,
      outline: `border border-gray-300 bg-transparent hover:bg-gray-100 ${isPressed ? "bg-gray-200 text-gray-900" : ""}`,
    };
    
    const sizeStyles = {
      default: "h-9 px-2 min-w-9",
      sm: "h-8 px-1.5 min-w-8",
      lg: "h-10 px-2.5 min-w-10",
    };
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        onClick={handleClick}
        aria-pressed={isPressed}
        data-state={isPressed ? "on" : "off"}
        {...props}
      />
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle };
export const toggleVariants = () => "";
