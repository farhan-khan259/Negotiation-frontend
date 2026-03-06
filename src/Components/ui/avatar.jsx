import React from "react";
import { cn } from "./utils";

export const Avatar = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const AvatarImage = ({ src, alt, className, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
};

export const AvatarFallback = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
