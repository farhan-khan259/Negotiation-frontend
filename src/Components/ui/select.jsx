import React, { useState } from "react";
import { ChevronDownIcon, CheckIcon } from "lucide-react";
import { cn } from "./utils";

export const Select = ({ children, value, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SelectTrigger) {
            return React.cloneElement(child, {
              onClick: () => setIsOpen(!isOpen),
              isOpen,
            });
          }
          if (child.type === SelectContent) {
            return React.cloneElement(child, {
              isOpen,
              onClose: () => setIsOpen(false),
              onSelect: onValueChange,
              selectedValue: value,
            });
          }
        }
        return child;
      })}
    </div>
  );
};

export const SelectTrigger = ({
  children,
  className,
  onClick,
  isOpen,
  ...props
}) => {
  return (
    <button
      className={cn(
        "border-input flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className={`size-4 opacity-50 transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  );
};

export const SelectContent = ({
  children,
  className,
  isOpen,
  onClose,
  onSelect,
  selectedValue,
  ...props
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "bg-popover text-popover-foreground absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
        className,
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === SelectItem) {
          return React.cloneElement(child, {
            selected: child.props.value === selectedValue,
            onClick: () => {
              onSelect && onSelect(child.props.value);
              onClose && onClose();
            },
          });
        }
        return child;
      })}
    </div>
  );
};

export const SelectItem = ({
  children,
  className,
  selected,
  onClick,
  ...props
}) => {
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
      {selected && <CheckIcon className="absolute right-2 size-4" />}
    </div>
  );
};

export const SelectValue = ({ children, className, ...props }) => {
  return (
    <span className={cn("flex items-center gap-2", className)} {...props}>
      {children}
    </span>
  );
};
