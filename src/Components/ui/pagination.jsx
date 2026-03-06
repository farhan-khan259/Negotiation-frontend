import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { cn } from "./utils";

export const Pagination = ({ className, ...props }) => {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
};

export const PaginationContent = ({ children, className, ...props }) => {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    >
      {children}
    </ul>
  );
};

export const PaginationItem = ({ children, ...props }) => {
  return <li {...props}>{children}</li>;
};

export const PaginationLink = ({
  className,
  isActive,
  onClick,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium",
        isActive
          ? "border border-input bg-background"
          : "hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const PaginationPrevious = ({ className, onClick, ...props }) => {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("gap-1 px-2.5", className)}
      onClick={onClick}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
};

export const PaginationNext = ({ className, onClick, ...props }) => {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("gap-1 px-2.5", className)}
      onClick={onClick}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
};
