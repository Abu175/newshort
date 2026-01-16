// components/ui/Select.tsx
import React from "react";

interface SelectProps {
  defaultValue?: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ defaultValue, children }) => {
  return (
    <select defaultValue={defaultValue} className="border rounded-md p-2">
      {children}
    </select>
  );
};

export const SelectTrigger: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex items-center border-b p-2">
      {children}
    </div>
  );
};

export const SelectValue: React.FC<{ placeholder?: string }> = ({
  placeholder,
}) => {
  return <span className="text-gray-500">{placeholder}</span>;
};

export const SelectContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="absolute bg-white border rounded-md shadow-lg mt-1">
      {children}
    </div>
  );
};

export const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({
  value,
  children,
}) => {
  return (
    <option value={value} className="p-2 hover:bg-gray-100">
      {children}
    </option>
  );
};
