import React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "./utils";

export const Breadcrumb = ({ children, ...props }) => {
  return (
    <nav aria-label="breadcrumb" {...props}>
      {children}
    </nav>
  );
};

export const BreadcrumbList = ({ children, className, ...props }) => {
  return (
    <ol
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className,
      )}
      {...props}
    >
      {children}
    </ol>
  );
};

export const BreadcrumbItem = ({ children, className, ...props }) => {
  return (
    <li
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    >
      {children}
    </li>
  );
};

export const BreadcrumbLink = ({ children, href, className, ...props }) => {
  return (
    <a
      href={href}
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    >
      {children}
    </a>
  );
};

export const BreadcrumbPage = ({ children, className, ...props }) => {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    >
      {children}
    </span>
  );
};

export const BreadcrumbSeparator = ({ children, className, ...props }) => {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
};

export const BreadcrumbEllipsis = ({ className, ...props }) => {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
};
