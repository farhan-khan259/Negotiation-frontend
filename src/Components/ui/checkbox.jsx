import React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "./utils";

export const Checkbox = ({
  checked,
  onChange,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      className={cn(
        "peer border bg-input-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50 size-4 shrink-0 rounded-[4px] border shadow-xs transition-all",
        checked && "bg-primary text-primary-foreground border-primary",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      onClick={() => onChange && !disabled && onChange(!checked)}
      disabled={disabled}
      {...props}
    >
      {checked && <CheckIcon className="size-3.5" />}
    </button>
  );
};
