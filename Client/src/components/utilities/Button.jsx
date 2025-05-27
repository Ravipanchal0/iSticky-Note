import React from "react";

export default function Button({
  children,
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-1.5 rounded tracking-wide ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
