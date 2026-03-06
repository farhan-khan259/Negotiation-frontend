import React from "react";
import { cn } from "./utils";

export const Label = ({ children, className, htmlFor, ...props }) => {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};
