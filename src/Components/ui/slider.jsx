import React, { useState } from "react";
import { cn } from "./utils";

export const Slider = ({
  className,
  value: valueProp,
  defaultValue = 50,
  min = 0,
  max = 100,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(
    valueProp !== undefined ? valueProp : defaultValue,
  );

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("relative flex w-full items-center", className)}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="absolute h-full bg-primary"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        {...props}
      />
      <div
        className="absolute h-4 w-4 rounded-full border border-primary bg-background shadow-sm"
        style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
      />
    </div>
  );
};
