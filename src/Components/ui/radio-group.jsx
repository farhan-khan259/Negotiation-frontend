import React from "react";
import { CircleIcon } from "lucide-react";
import { cn } from "./utils";

export const RadioGroup = ({
  children,
  className,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={cn("grid gap-3", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === RadioGroupItem) {
          return React.cloneElement(child, {
            checked: child.props.value === value,
            onChange: () => onChange && onChange(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
};

export const RadioGroupItem = ({
  className,
  checked,
  onChange,
  children,
  ...props
}) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <button
        type="button"
        className={cn(
          "border-input aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-all outline-none focus:ring-2 focus:ring-ring/50",
          checked && "border-primary",
          className,
        )}
        onClick={onChange}
        {...props}
      >
        {checked && (
          <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
        )}
      </button>
      {children}
    </label>
  );
};
