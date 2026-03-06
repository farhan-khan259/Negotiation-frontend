import React from "react";
import { cn } from "./utils";

export const Alert = ({
  children,
  className,
  variant = "default",
  ...props
}) => {
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-lg border px-4 py-3 text-sm grid items-start gap-3",
        variant === "default" && "bg-card text-card-foreground",
        variant === "destructive" && "text-destructive bg-card",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertTitle = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertDescription = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "text-muted-foreground grid justify-items-start gap-1 text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
