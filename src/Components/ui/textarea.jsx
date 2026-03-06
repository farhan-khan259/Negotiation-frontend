import React from "react";
import { cn } from "./utils";

export const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={cn(
        "flex min-h-16 w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};
