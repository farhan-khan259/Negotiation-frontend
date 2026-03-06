import React, { useState } from "react";
import { cn } from "./utils";

export const DropdownMenu = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export const DropdownMenuTrigger = ({ children, onClick, ...props }) => {
  return React.cloneElement(children, {
    onClick,
    ...props,
  });
};

export const DropdownMenuContent = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem = ({
  children,
  className,
  onClick,
  ...props
}) => {
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
