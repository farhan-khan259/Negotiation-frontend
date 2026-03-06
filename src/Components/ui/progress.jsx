import React from "react";
import { cn } from "./utils";

export const Progress = ({ className, value = 0, max = 100, ...props }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <div
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
};
