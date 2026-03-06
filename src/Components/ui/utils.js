// Simple cn function (choose one based on your preference)

// Option 1: Simple version (no external dependencies)
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Option 2: If you want to use clsx and tailwind-merge
// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }
