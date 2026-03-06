import React from "react";
import { cn } from "./utils";

export const Switch = ({
  className,
  checked,
  onChange,
  disabled = false,
  ...props
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={cn(
        "peer inline-flex h-[1.15rem] w-8 items-center rounded-full border border-transparent transition-all",
        checked ? "bg-primary" : "bg-switch-background",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      onClick={() => onChange && !disabled && onChange(!checked)}
      disabled={disabled}
      {...props}
    >
      <span
        className={cn(
          "block size-4 rounded-full bg-card ring-0 transition-transform",
          checked ? "translate-x-[calc(100%-2px)]" : "translate-x-0",
        )}
      />
    </button>
  );
};
