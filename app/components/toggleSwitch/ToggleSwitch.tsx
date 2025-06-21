import { forwardRef, useState } from "react";

interface ToggleSwitchProps {
  label: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(
  ({ label, checked = false, onChange, name, ...props }, ref) => {
    return (
      <div className="flex items-center space-x-3">
        <label className="flex items-center cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            className="sr-only"
            {...props}
          />
          <div
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              checked ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                checked ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </div>
          <span className="ml-3 text-sm font-medium text-gray-900">
            {label}
          </span>
        </label>
      </div>
    );
  }
);

ToggleSwitch.displayName = "ToggleSwitch";

export default ToggleSwitch;
