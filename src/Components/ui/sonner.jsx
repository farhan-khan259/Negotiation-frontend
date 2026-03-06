import React, { useState, useEffect, createContext, useContext } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "./utils";

// Create a global context for toasts
const ToastContext = createContext(null);

// Toast Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = {
      id,
      title: toast.title,
      description: toast.description,
      type: toast.type || "default",
      duration: toast.duration || 4000,
      position: toast.position || "bottom-right",
      ...toast,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove toast after duration
    if (newToast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const toastFunctions = {
    success: (title, description, options) =>
      addToast({ title, description, type: "success", ...options }),
    error: (title, description, options) =>
      addToast({ title, description, type: "error", ...options }),
    warning: (title, description, options) =>
      addToast({ title, description, type: "warning", ...options }),
    info: (title, description, options) =>
      addToast({ title, description, type: "info", ...options }),
    default: (title, description, options) =>
      addToast({ title, description, type: "default", ...options }),
  };

  return (
    <ToastContext.Provider value={toastFunctions}>
      {children}
      <Toaster toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Main Toaster Component
export const Toaster = ({ toasts = [], onRemove, className, ...props }) => {
  // Group toasts by position
  const groupedToasts = {
    "top-left": [],
    "top-right": [],
    "top-center": [],
    "bottom-left": [],
    "bottom-right": [],
    "bottom-center": [],
  };

  toasts.forEach((toast) => {
    const position = toast.position || "bottom-right";
    if (groupedToasts[position]) {
      groupedToasts[position].push(toast);
    }
  });

  return (
    <>
      {Object.entries(groupedToasts).map(
        ([position, positionToasts]) =>
          positionToasts.length > 0 && (
            <div
              key={position}
              className={cn(
                "fixed z-50 flex flex-col gap-2 p-4 pointer-events-none",
                getPositionClasses(position),
                className,
              )}
              style={{
                "--normal-bg": "var(--popover)",
                "--normal-text": "var(--popover-foreground)",
                "--normal-border": "var(--border)",
              }}
              {...props}
            >
              {positionToasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
              ))}
            </div>
          ),
      )}
    </>
  );
};

// Individual Toast Item
const ToastItem = ({ toast, onRemove }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 300);
  };

  useEffect(() => {
    if (toast.duration !== Infinity) {
      const timer = setTimeout(() => {
        handleRemove();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration]);

  const typeConfig = {
    success: {
      icon: CheckCircle,
      className: "bg-success/10 border-success/20 text-success",
    },
    error: {
      icon: AlertCircle,
      className: "bg-destructive/10 border-destructive/20 text-destructive",
    },
    warning: {
      icon: AlertTriangle,
      className: "bg-warning/10 border-warning/20 text-warning",
    },
    info: {
      icon: Info,
      className: "bg-primary/10 border-primary/20 text-primary",
    },
    default: {
      icon: Info,
      className: "bg-popover border-border text-foreground",
    },
  };

  const { icon: Icon, className: typeClassName } =
    typeConfig[toast.type] || typeConfig.default;

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex items-start gap-3 rounded-lg border p-4 shadow-lg",
        "animate-in fade-in-0 slide-in-from-right-full",
        isExiting && "animate-out fade-out-0 slide-out-to-right-full",
        typeClassName,
        toast.className,
      )}
    >
      <Icon className="size-5 shrink-0 mt-0.5" />
      <div className="flex-1 space-y-1 min-w-0">
        {toast.title && (
          <h4 className="font-semibold leading-none tracking-tight truncate">
            {toast.title}
          </h4>
        )}
        {toast.description && (
          <p className="text-sm opacity-90 line-clamp-2">{toast.description}</p>
        )}
        {toast.action && <div className="mt-2">{toast.action}</div>}
      </div>
      <button
        onClick={handleRemove}
        className="ml-2 rounded-sm opacity-70 hover:opacity-100 transition-opacity shrink-0"
      >
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
};

// Helper function for position classes
const getPositionClasses = (position) => {
  const classes = {
    "top-left": "top-0 left-0 items-start",
    "top-right": "top-0 right-0 items-end",
    "top-center": "top-0 left-1/2 -translate-x-1/2 items-center",
    "bottom-left": "bottom-0 left-0 items-start",
    "bottom-right": "bottom-0 right-0 items-end",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center",
  };
  return classes[position] || classes["bottom-right"];
};

// Export convenience functions
export const toast = {
  success: (title, description, options) => ({
    title,
    description,
    type: "success",
    ...options,
  }),
  error: (title, description, options) => ({
    title,
    description,
    type: "error",
    ...options,
  }),
  warning: (title, description, options) => ({
    title,
    description,
    type: "warning",
    ...options,
  }),
  info: (title, description, options) => ({
    title,
    description,
    type: "info",
    ...options,
  }),
  default: (title, description, options) => ({
    title,
    description,
    type: "default",
    ...options,
  }),
};

// Example of how to use:

/*
// 1. Wrap your app with ToastProvider
import { ToastProvider } from './components/ui/sonner';

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}

// 2. Use in components
import { useToast } from './components/ui/sonner';

function MyComponent() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success('Success!', 'Your action was completed successfully.', {
      duration: 3000,
      position: 'top-right'
    });
  };

  const handleError = () => {
    toast.error('Error!', 'Something went wrong. Please try again.', {
      duration: 5000,
    });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success Toast</button>
      <button onClick={handleError}>Show Error Toast</button>
    </div>
  );
}
*/
