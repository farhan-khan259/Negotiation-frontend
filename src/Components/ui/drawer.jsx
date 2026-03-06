import React from "react";
import { XIcon } from "lucide-react";
import { cn } from "./utils";

export const Drawer = ({ children, open, onOpenChange, ...props }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" {...props}>
      {children}
    </div>
  );
};

export const DrawerTrigger = ({ children, onClick, ...props }) => {
  return React.cloneElement(children, {
    onClick,
    ...props,
  });
};

export const DrawerOverlay = ({ className, onClick, ...props }) => {
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

export const DrawerContent = ({
  children,
  className,
  side = "right",
  ...props
}) => {
  const sideClasses = {
    right: "inset-y-0 right-0 h-full w-3/4 border-l",
    left: "inset-y-0 left-0 h-full w-3/4 border-r",
    top: "inset-x-0 top-0 h-auto border-b",
    bottom: "inset-x-0 bottom-0 h-auto border-t",
  };

  return (
    <>
      <DrawerOverlay />
      <div
        className={cn(
          "bg-background fixed z-50 flex flex-col gap-4 shadow-lg",
          sideClasses[side],
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
    </>
  );
};
