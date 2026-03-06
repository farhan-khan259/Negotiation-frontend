import React, { useState } from "react";
import { cn } from "./utils";

export const ResizablePanelGroup = ({
  children,
  className,
  direction = "horizontal",
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex h-full w-full",
        direction === "vertical" && "flex-col",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const ResizablePanel = ({ children, className, ...props }) => {
  return (
    <div className={cn("flex-1", className)} {...props}>
      {children}
    </div>
  );
};
