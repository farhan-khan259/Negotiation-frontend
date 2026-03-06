import React from "react";
import { cn } from "./utils";

export const ScrollArea = ({ children, className, ...props }) => {
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <div className="size-full overflow-auto">{children}</div>
    </div>
  );
};
