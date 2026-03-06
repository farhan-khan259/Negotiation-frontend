import React from "react";
import { cn } from "./utils";

export const Menubar = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const MenubarTrigger = ({ children, className, onClick, ...props }) => {
  return (
    <button
      className={cn(
        "hover:bg-accent hover:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const MenubarContent = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-popover text-popover-foreground z-50 min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const MenubarItem = ({ children, className, onClick, ...props }) => {
  return (
    <div
      className={cn(
        "hover:bg-accent hover:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
