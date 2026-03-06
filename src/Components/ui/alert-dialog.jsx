import React from "react";
import { cn } from "./utils";
import { Button } from "./button";

export const AlertDialog = ({ children, open, onOpenChange, ...props }) => {
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

export const AlertDialogTrigger = ({ children, onClick, ...props }) => {
  return React.cloneElement(children, {
    onClick,
    ...props,
  });
};

export const AlertDialogOverlay = ({ className, onClick, ...props }) => {
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

export const AlertDialogContent = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-background fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border p-6 shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertDialogHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertDialogFooter = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertDialogTitle = ({ children, className, ...props }) => {
  return (
    <h2 className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </h2>
  );
};

export const AlertDialogDescription = ({ children, className, ...props }) => {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props}>
      {children}
    </p>
  );
};

export const AlertDialogAction = ({ children, className, ...props }) => {
  return (
    <Button className={className} {...props}>
      {children}
    </Button>
  );
};

export const AlertDialogCancel = ({ children, className, ...props }) => {
  return (
    <Button variant="outline" className={className} {...props}>
      {children}
    </Button>
  );
};
