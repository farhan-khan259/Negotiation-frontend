import React, { useState } from "react";
import { SearchIcon } from "lucide-react";
import { cn } from "./utils";

export const Command = ({ children, className, ...props }) => {
  const [value, setValue] = useState("");

  return (
    <div
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className,
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === CommandInput) {
          return React.cloneElement(child, {
            value,
            onChange: (e) => setValue(e.target.value),
          });
        }
        return child;
      })}
    </div>
  );
};

export const CommandInput = ({ className, value, onChange, ...props }) => {
  return (
    <div className="flex h-9 items-center gap-2 border-b px-3">
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <input
        value={value}
        onChange={onChange}
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden",
          className,
        )}
        {...props}
      />
    </div>
  );
};

export const CommandList = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "max-h-[300px] overflow-x-hidden overflow-y-auto",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CommandEmpty = ({ children, className, ...props }) => {
  return (
    <div className={cn("py-6 text-center text-sm", className)} {...props}>
      {children}
    </div>
  );
};

export const CommandGroup = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("text-foreground overflow-hidden p-1", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CommandItem = ({ children, className, onClick, ...props }) => {
  return (
    <div
      className={cn(
        "hover:bg-accent hover:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const CommandSeparator = ({ className, ...props }) => {
  return <div className={cn("bg-border -mx-1 h-px", className)} {...props} />;
};
