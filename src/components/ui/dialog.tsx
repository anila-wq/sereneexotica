import * as React from "react";
import { XIcon } from "./icons";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <DialogContext.Provider value={{ open: open || false, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

const DialogContext = React.createContext<{
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}>({ open: false });

function DialogTrigger({ children, ...props }: React.HTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  const { onOpenChange } = React.useContext(DialogContext);
  return (
    <button onClick={() => onOpenChange?.(true)} {...props}>
      {children}
    </button>
  );
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  const { open } = React.useContext(DialogContext);
  if (!open) return null;
  return <>{children}</>;
}

function DialogClose({ children, ...props }: React.HTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }) {
  const { onOpenChange } = React.useContext(DialogContext);
  return (
    <button onClick={() => onOpenChange?.(false)} {...props}>
      {children}
    </button>
  );
}

function DialogOverlay({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { onOpenChange } = React.useContext(DialogContext);
  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 ${className}`}
      onClick={() => onOpenChange?.(false)}
      {...props}
    />
  );
}

function DialogContent({ className = "", children, ...props }: DialogContentProps) {
  const { open, onOpenChange } = React.useContext(DialogContext);
  
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);
  
  if (!open) return null;
  
  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        className={`fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-gray-700 bg-gray-900 p-6 shadow-lg sm:max-w-lg ${className}`}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
        <button
          onClick={() => onOpenChange?.(false)}
          className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </DialogPortal>
  );
}

function DialogHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col gap-2 text-center sm:text-left ${className}`}
      {...props}
    />
  );
}

function DialogFooter({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col-reverse gap-2 sm:flex-row sm:justify-end ${className}`}
      {...props}
    />
  );
}

function DialogTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={`text-lg font-semibold leading-none ${className}`}
      {...props}
    />
  );
}

function DialogDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm text-gray-400 ${className}`}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
