import React from "react";
import { cn } from "./utils";

export const Button = ({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
  disabled = false,
  type = "button",
  ...props
}) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-white hover:bg-destructive/90",
    outline:
      "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3",
    lg: "h-10 rounded-md px-6",
    icon: "size-9 rounded-md",
  };

  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const buttonVariants = ({ variant = "default", size = "default" }) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-white hover:bg-destructive/90",
    outline:
      "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3",
    lg: "h-10 rounded-md px-6",
    icon: "size-9 rounded-md",
  };

  return cn(variantClasses[variant], sizeClasses[size]);
};
