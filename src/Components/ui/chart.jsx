import React from "react";
import { cn } from "./utils";

export const ChartContainer = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("flex aspect-video justify-center text-xs", className)}
      {...props}
    >
      {children}
    </div>
  );
};
