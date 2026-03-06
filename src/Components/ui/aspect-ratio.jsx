import React from "react";

export const AspectRatio = ({
  children,
  ratio = 16 / 9,
  className,
  ...props
}) => {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        paddingBottom: `${(1 / ratio) * 100}%`,
        ...props.style,
      }}
      {...props}
    >
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {children}
      </div>
    </div>
  );
};
