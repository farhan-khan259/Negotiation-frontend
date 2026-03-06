import React, { useState } from "react";

export const Collapsible = ({
  children,
  open = false,
  onOpenChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen);
    if (onOpenChange) onOpenChange(newOpen);
  };

  return (
    <div {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === CollapsibleTrigger) {
            return React.cloneElement(child, {
              onClick: () => handleOpenChange(!isOpen),
            });
          }
          if (child.type === CollapsibleContent) {
            return isOpen ? child : null;
          }
        }
        return child;
      })}
    </div>
  );
};

export const CollapsibleTrigger = ({ children, onClick, ...props }) => {
  return React.cloneElement(children, {
    onClick,
    ...props,
  });
};

export const CollapsibleContent = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};
