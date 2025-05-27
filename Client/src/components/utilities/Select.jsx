import React, { useId } from "react";

function Select({ label, options = [], className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full mt-2">
      {label && (
        <label className="inline-block mb-1" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2 bg-gray-50 focus:bg-gray-100 border border-gray-200 focus:border-gray-300 rounded outline-none ${className}`}
        id={id}
        {...props}
        ref={ref}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
