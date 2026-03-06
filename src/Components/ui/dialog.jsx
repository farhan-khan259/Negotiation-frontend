import React from "react";
import { XIcon } from "lucide-react";
import { cn } from "./utils";

export const Dialog = ({ children, open, onOpenChange, ...props }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      {...props}
    >
      {children}
    </div>
  );
};

export const DialogTrigger = ({ children, onClick, ...props }) => {
  return React.cloneElement(children, {
    onClick,
    ...props,
  });
};

export const DialogOverlay = ({ className, onClick, ...props }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/50 animate-in fade-in-0",
        className,
      )}
      onClick={onClick}
      {...props}
    />
  );
};

export const DialogContent = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-background fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border p-6 shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
      <button
        className="absolute top-4 right-4 rounded-xs opacity-70 hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          // Close logic would go here
        }}
      >
        <XIcon className="size-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
};

export const DialogHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const DialogTitle = ({ children, className, ...props }) => {
  return (
    <h2 className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </h2>
  );
};

export const DialogDescription = ({ children, className, ...props }) => {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props}>
      {children}
    </p>
  );
};
