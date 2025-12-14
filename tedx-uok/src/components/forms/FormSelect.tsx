import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value:  string) => void;
  options: SelectOption[];
  placeholder?:  string;
  error?: string;
  required?: boolean;
}

export const FormSelect: React. FC<FormSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
  required = false,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required={required}
        className={`w-full px-4 py-3 bg-[#1A1A1A] border ${
          error ? 'border-red-500' : 'border-[#2A2A2A]'
        } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#EB0028] focus:border-transparent transition-all appearance-none cursor-pointer`}
      >
        <option value="" disabled>
          {placeholder || 'Select an option'}
        </option>
        {options. map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};