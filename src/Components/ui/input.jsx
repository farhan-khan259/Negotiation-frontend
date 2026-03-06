import React from "react";
import { cn } from "./utils";

export const Input = ({ className, type = "text", ...props }) => {
  return (
    <input
      type={type}
      className={cn(
        "placeholder:text-muted-foreground flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm bg-input-background transition-all outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};
