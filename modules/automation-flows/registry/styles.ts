import type { colorDefaultNode } from "./types";

export const bgColor: Record<colorDefaultNode, { classColor: string; textColor: string }> = {
  blue: {
    classColor: "bg-blue-300",
    textColor: "text-blue-600",
  },
  green: {
    classColor: "bg-green-100",
    textColor: "text-green-600",
  },
  yellow: {
    classColor: "bg-yellow-100",
    textColor: "text-yellow-600",
  },
  gray: {
    classColor: "bg-gray-100",
    textColor: "text-gray-400",
  },
  red: {
    classColor: "bg-red-100",
    textColor: "text-red-400",
  },
  orange: {
    classColor: "bg-orange-300",
    textColor: "text-orange-600",
  },
  purple: {
    classColor: "bg-purple-300",
    textColor: "text-purple-600",
  },
  sky: {
    classColor: "bg-sky-300",
    textColor: "text-purple-600",
  },
};
