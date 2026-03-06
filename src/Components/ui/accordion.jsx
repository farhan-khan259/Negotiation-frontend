import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "./utils";

export const Accordion = ({ children, className, ...props }) => {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  );
};

export const AccordionItem = ({ children, className, ...props }) => {
  return (
    <div className={cn("border-b last:border-b-0", className)} {...props}>
      {children}
    </div>
  );
};

export const AccordionTrigger = ({
  children,
  className,
  onClick,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    setIsOpen(!isOpen);
    if (onClick) onClick(e);
  };

  return (
    <button
      className={cn(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus:outline-none focus:ring-2 focus:ring-ring/50 w-full",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className={`text-muted-foreground size-4 shrink-0 translate-y-0.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  );
};

export const AccordionContent = ({ children, className, ...props }) => {
  return (
    <div className={cn("pt-0 pb-4 text-sm", className)} {...props}>
      {children}
    </div>
  );
};
