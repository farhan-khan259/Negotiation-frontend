import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

export const Carousel = ({ children, className, ...props }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === CarouselItem,
  );

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className={cn("relative", className)}
      role="region"
      aria-roledescription="carousel"
      {...props}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items}
        </div>
      </div>
      <CarouselPrevious onClick={goPrev} />
      <CarouselNext onClick={goNext} />
    </div>
  );
};

export const CarouselContent = ({ children, className, ...props }) => {
  return (
    <div className={cn("flex", className)} {...props}>
      {children}
    </div>
  );
};

export const CarouselItem = ({ children, className, ...props }) => {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-full shrink-0 grow-0", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CarouselPrevious = ({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "absolute top-1/2 -left-12 -translate-y-1/2 size-8 rounded-full",
        className,
      )}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
};

export const CarouselNext = ({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "absolute top-1/2 -right-12 -translate-y-1/2 size-8 rounded-full",
        className,
      )}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
};
