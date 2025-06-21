import React from "react";

interface CheckboxProps {
  label: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex items-center space-x-2">
        <input
          id="checkbox"
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
          {...props}
          ref={ref}
        />
        <label
          htmlFor="checkbox"
          className="text-sm font-semibold text-gray-900 cursor-pointer"
        >
          {label}
        </label>
      </div>
    );
  }
);

export default Checkbox;
