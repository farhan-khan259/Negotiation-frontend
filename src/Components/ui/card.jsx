import React from "react";
import { cn } from "./utils";

export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h4 className={cn("leading-none", className)} {...props}>
      {children}
    </h4>
  );
};

export const CardDescription = ({ children, className, ...props }) => {
  return (
    <p className={cn("text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={cn("px-6 pb-6", className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className, ...props }) => {
  return (
    <div className={cn("flex items-center px-6 pb-6", className)} {...props}>
      {children}
    </div>
  );
};
