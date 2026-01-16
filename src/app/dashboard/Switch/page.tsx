// components/ui/Switch.tsx
import React from "react";

interface SwitchProps {
  checked?: boolean;
  onChange?: () => void;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`w-10 h-6 bg-gray-300 rounded-full shadow-inner ${
          checked ? "bg-purple-600" : ""
        }`}
        onClick={onChange}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </div>
    </div>
  );
};
