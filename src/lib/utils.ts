import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Yeh function complex conditional Tailwind classes ko perfectly merge karega
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}