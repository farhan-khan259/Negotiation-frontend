import React, { useState } from "react";
import { cn } from "./utils";

export const HoverCard = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === HoverCardTrigger) {
            return child;
          }
          if (child.type === HoverCardContent) {
            return isOpen ? child : null;
          }
        }
        return child;
      })}
    </div>
  );
};

export const HoverCardTrigger = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export const HoverCardContent = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-popover text-popover-foreground z-50 w-64 rounded-md border p-4 shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
