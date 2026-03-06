import React, { useState } from "react";
import { cn } from "./utils";

export const InputOTP = ({ length = 6, onChange, className, ...props }) => {
  const [values, setValues] = useState(Array(length).fill(""));

  const handleChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (onChange) {
      onChange(newValues.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      // Focus previous input on backspace
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {values.map((value, index) => (
        <InputOTPSlot
          key={index}
          index={index}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
  );
};

export const InputOTPSlot = ({
  index,
  value,
  onChange,
  onKeyDown,
  className,
  ...props
}) => {
  return (
    <input
      id={`otp-input-${index}`}
      type="text"
      maxLength="1"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={cn(
        "border-input flex h-9 w-9 items-center justify-center border text-sm bg-input-background transition-all outline-none rounded-md text-center",
        className,
      )}
      {...props}
    />
  );
};
