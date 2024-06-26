const { ClassValue, clsx } = require("clsx");
const { twMerge } = require("tailwind-merge");

export default function cn(...inputs) {
  return twMerge(clsx(inputs));
}