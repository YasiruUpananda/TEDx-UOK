import React, { useState } from 'react';

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  error,
  required = false,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-300 tracking-normal text-left"
      >
        {label} {required && <span className="text-[#EB0028]">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled}
        className={`w-full bg-[#0E0E0E] rounded-lg border-2 border-solid px-4 py-3 outline-none tracking-normal transition-colors duration-300 ${error || isFocused || isHovered ? 'border-[#EB0028]' : 'border-[#1F1F1F]'
          } ${value ? 'text-white' : 'text-gray-500'} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        <option value="" className="bg-[#0E0E0E] text-gray-500">
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-[#0E0E0E] text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${name}-error`} className="text-sm mt-1 text-[#EB0028] tracking-normal text-left">
          {error}
        </p>
      )}
    </div>
  );
};