import React, { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "./utils";

export const NavigationMenu = ({ children, className, ...props }) => {
  return (
    <nav
      className={cn("relative flex items-center justify-center", className)}
      {...props}
    >
      {children}
    </nav>
  );
};

export const NavigationMenuList = ({ children, className, ...props }) => {
  return (
    <ul
      className={cn(
        "flex list-none items-center justify-center gap-1",
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  );
};

export const NavigationMenuItem = ({ children, className, ...props }) => {
  return (
    <li className={cn("relative", className)} {...props}>
      {children}
    </li>
  );
};

export const NavigationMenuTrigger = ({
  children,
  className,
  onClick,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className={cn(
        "group inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none",
        className,
      )}
      onClick={(e) => {
        setIsOpen(!isOpen);
        if (onClick) onClick(e);
      }}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className={`ml-1 size-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  );
};

export const NavigationMenuContent = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-popover text-popover-foreground absolute top-full left-0 z-50 mt-1.5 w-full min-w-[200px] rounded-md border p-2 shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
