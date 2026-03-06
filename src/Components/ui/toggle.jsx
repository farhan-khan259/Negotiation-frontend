import React from "react";
import { cn } from "./utils";

export const Toggle = ({
  children,
  className,
  pressed,
  onPressedChange,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 rounded-md px-2 text-sm font-medium",
        pressed
          ? "bg-accent text-accent-foreground"
          : "hover:bg-muted hover:text-muted-foreground",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      onClick={() => onPressedChange && !disabled && onPressedChange(!pressed)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
