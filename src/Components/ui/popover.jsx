import React, { useState } from "react";
import { cn } from "./utils";

export const Popover = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export const PopoverTrigger = ({ children, onClick, ...props }) => {
  return React.cloneElement(children, {
    onClick,
    ...props,
  });
};

export const PopoverContent = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
