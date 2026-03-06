import React, { useState } from "react";
import { cn } from "./utils";

export const TooltipProvider = ({ children, ...props }) => {
  return <>{children}</>;
};

export const Tooltip = ({ children, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === TooltipTrigger) {
            return child;
          }
          if (child.type === TooltipContent) {
            return open ? child : null;
          }
        }
        return child;
      })}
    </div>
  );
};

export const TooltipTrigger = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export const TooltipContent = ({
  children,
  className,
  side = "top",
  ...props
}) => {
  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground absolute z-50 rounded-md px-3 py-1.5 text-xs",
        sideClasses[side],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
