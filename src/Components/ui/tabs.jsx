import React, { useState } from "react";
import { cn } from "./utils";

export const Tabs = ({ children, defaultValue, className, ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === TabsList) {
            return React.cloneElement(child, {
              activeTab,
              onTabChange: setActiveTab,
            });
          }
          if (child.type === TabsContent) {
            return React.cloneElement(child, {
              activeTab,
            });
          }
        }
        return child;
      })}
    </div>
  );
};

export const TabsList = ({
  children,
  className,
  activeTab,
  onTabChange,
  ...props
}) => {
  return (
    <div
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1",
        className,
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsTrigger) {
          return React.cloneElement(child, {
            active: child.props.value === activeTab,
            onClick: () => onTabChange(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
};

export const TabsTrigger = ({
  children,
  className,
  value,
  active,
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex h-7 flex-1 items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium whitespace-nowrap transition-colors",
        active
          ? "bg-background text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({
  children,
  className,
  value,
  activeTab,
  ...props
}) => {
  if (value !== activeTab) return null;

  return (
    <div className={cn("flex-1 outline-none", className)} {...props}>
      {children}
    </div>
  );
};
