import React from "react";

const base =
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-green-600 text-white hover:bg-green-700 focus:ring-green-600",
  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
  link: "bg-transparent text-green-700 hover:underline focus:ring-0",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  as: Comp = "button",
  children,
  ...props
}) {
  return (
    <Comp className={[base, variants[variant], sizes[size], className].join(" ")} {...props}>
      {children}
    </Comp>
  );
}
