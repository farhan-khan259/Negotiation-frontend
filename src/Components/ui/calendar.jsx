import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

export const Calendar = ({ selected, onSelect, className, ...props }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month"); // 'month' or 'year'

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const prevYear = () => {
    setCurrentDate(new Date(year - 1, month, 1));
  };

  const nextYear = () => {
    setCurrentDate(new Date(year + 1, month, 1));
  };

  const renderMonthView = () => {
    const totalDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const daysArray = [];

    // Previous month days
    const prevMonthDays = daysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      daysArray.push(
        <div key={`prev-${i}`} className="text-muted-foreground opacity-50">
          {prevMonthDays - i}
        </div>,
      );
    }

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
      const dayDate = new Date(year, month, day);
      const isSelected =
        selected &&
        dayDate.getDate() === selected.getDate() &&
        dayDate.getMonth() === selected.getMonth() &&
        dayDate.getFullYear() === selected.getFullYear();
      const isToday = dayDate.toDateString() === new Date().toDateString();

      daysArray.push(
        <Button
          key={day}
          variant="ghost"
          className={cn(
            "size-8 p-0 font-normal",
            isSelected && "bg-primary text-primary-foreground",
            isToday && !isSelected && "bg-accent text-accent-foreground",
          )}
          onClick={() => onSelect && onSelect(dayDate)}
        >
          {day}
        </Button>,
      );
    }

    // Next month days
    const totalCells = 42; // 6 rows * 7 days
    const nextMonthDays = totalCells - daysArray.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      daysArray.push(
        <div key={`next-${i}`} className="text-muted-foreground opacity-50">
          {i}
        </div>,
      );
    }

    return (
      <>
        <div className="flex justify-center pt-1 relative items-center w-full">
          <Button
            variant="outline"
            size="icon"
            className="size-7 absolute left-1"
            onClick={prevMonth}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm font-medium">
            {months[month]} {year}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="size-7 absolute right-1"
            onClick={nextMonth}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1 mt-4">
          {days.map((day) => (
            <div
              key={day}
              className="text-muted-foreground text-center text-sm"
            >
              {day}
            </div>
          ))}
          {daysArray}
        </div>
      </>
    );
  };

  const renderYearView = () => {
    return (
      <>
        <div className="flex justify-center pt-1 relative items-center w-full">
          <Button
            variant="outline"
            size="icon"
            className="size-7 absolute left-1"
            onClick={prevYear}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm font-medium">{year}</span>
          <Button
            variant="outline"
            size="icon"
            className="size-7 absolute right-1"
            onClick={nextYear}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {months.map((monthName, idx) => (
            <Button
              key={monthName}
              variant="ghost"
              className="h-16"
              onClick={() => {
                setCurrentDate(new Date(year, idx, 1));
                setView("month");
              }}
            >
              {monthName}
            </Button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={cn("p-3", className)}>
      <div className="flex items-center gap-2 mb-2">
        <Button
          variant={view === "month" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("month")}
        >
          Month
        </Button>
        <Button
          variant={view === "year" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("year")}
        >
          Year
        </Button>
      </div>
      {view === "month" ? renderMonthView() : renderYearView()}
    </div>
  );
};
