import React, { useState, useId } from "react";

const Input = (
  {
    label,
    type = "text",
    placeholder = "Enter your text",
    className = "",
    ...props
  },
  ref
) => {
  const [input, setInput] = useState("");

  const id = useId(); // Generate a unique id for the input element

  return (
    <div className="w-full mt-2">
      {label && (
        <label className="inline-block mb-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded bg-white text-black outline-none focus:bg-gray-100/70 duration-200 border border-gray-300 focus:border-gray-400/80 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default React.forwardRef(Input);
