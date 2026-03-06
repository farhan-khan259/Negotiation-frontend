import React from "react";
import { cn } from "./utils";

export const Form = ({ children, onSubmit, ...props }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
};

export const FormItem = ({ children, className, ...props }) => {
  return (
    <div className={cn("grid gap-2", className)} {...props}>
      {children}
    </div>
  );
};

export const FormLabel = ({ children, className, htmlFor, ...props }) => {
  return (
    <label
      className={cn("text-sm font-medium", className)}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

export const FormControl = ({ children, ...props }) => {
  return React.cloneElement(children, props);
};

export const FormDescription = ({ children, className, ...props }) => {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props}>
      {children}
    </p>
  );
};

export const FormMessage = ({ children, className, ...props }) => {
  return (
    <p className={cn("text-destructive text-sm", className)} {...props}>
      {children}
    </p>
  );
};
