import React from "react";
import { cn } from "./utils";

export const Table = ({ children, className, ...props }) => {
  return (
    <div className="relative w-full overflow-x-auto">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children, className, ...props }) => {
  return (
    <thead className={cn("[&_tr]:border-b", className)} {...props}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className, ...props }) => {
  return (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children, className, ...props }) => {
  return (
    <tr
      className={cn("hover:bg-muted/50 border-b transition-colors", className)}
      {...props}
    >
      {children}
    </tr>
  );
};

export const TableHead = ({ children, className, ...props }) => {
  return (
    <th
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
};

export const TableCell = ({ children, className, ...props }) => {
  return (
    <td
      className={cn("p-2 align-middle whitespace-nowrap", className)}
      {...props}
    >
      {children}
    </td>
  );
};

export const TableCaption = ({ children, className, ...props }) => {
  return (
    <caption className={cn("mt-4 text-sm", className)} {...props}>
      {children}
    </caption>
  );
};
