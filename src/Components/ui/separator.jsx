import React from "react";
import { cn } from "./utils";

export const Separator = ({
  className,
  orientation = "horizontal",
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
};
