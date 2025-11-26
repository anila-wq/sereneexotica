import * as React from "react";

interface ToasterProps {
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
  richColors?: boolean;
  closeButton?: boolean;
}

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

const ToastContext = React.createContext<{
  toasts: Toast[];
  addToast: (message: string, type: Toast["type"]) => void;
  removeToast: (id: string) => void;
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export const Toaster = ({ position = "top-center", richColors = true, closeButton = true }: ToasterProps) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  React.useEffect(() => {
    const handleToast = (e: CustomEvent) => {
      const { message, type } = e.detail;
      const id = Math.random().toString(36).substring(7);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), 5000);
    };

    window.addEventListener("show-toast" as any, handleToast);
    return () => window.removeEventListener("show-toast" as any, handleToast);
  }, []);

  const positionStyles = {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
  };

  const typeStyles = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
    warning: "bg-yellow-600 text-white",
  };

  return (
    <div className={`fixed z-[100] ${positionStyles[position]} flex flex-col gap-2`}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`min-w-[300px] rounded-lg px-4 py-3 shadow-lg flex items-center justify-between ${typeStyles[toast.type]}`}
        >
          <span>{toast.message}</span>
          {closeButton && (
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

// Helper function to show toasts
export const toast = {
  success: (message: string) => {
    window.dispatchEvent(new CustomEvent("show-toast", { detail: { message, type: "success" } }));
  },
  error: (message: string) => {
    window.dispatchEvent(new CustomEvent("show-toast", { detail: { message, type: "error" } }));
  },
  info: (message: string) => {
    window.dispatchEvent(new CustomEvent("show-toast", { detail: { message, type: "info" } }));
  },
  warning: (message: string) => {
    window.dispatchEvent(new CustomEvent("show-toast", { detail: { message, type: "warning" } }));
  },
};
