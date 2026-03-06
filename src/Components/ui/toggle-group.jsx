import React, { useState } from "react";
import { cn } from "./utils";

export const ToggleGroup = ({
  children,
  className,
  value: valueProp,
  onValueChange,
  ...props
}) => {
  const [value, setValue] = useState(valueProp || "");

  const handleValueChange = (newValue) => {
    setValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <div
      className={cn("flex w-fit items-center rounded-md", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === ToggleGroupItem) {
          return React.cloneElement(child, {
            pressed: child.props.value === value,
            onClick: () => handleValueChange(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
};

export const ToggleGroupItem = ({
  children,
  className,
  value,
  pressed,
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 rounded-md px-2 text-sm font-medium",
        pressed
          ? "bg-accent text-accent-foreground"
          : "hover:bg-muted hover:text-muted-foreground",
        "first:rounded-l-md last:rounded-r-md",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
