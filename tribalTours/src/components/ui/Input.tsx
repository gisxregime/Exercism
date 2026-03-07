import React, { forwardRef } from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    return (
      <div className="w-full">
        {label &&
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1">

            {label}
          </label>
        }
        <input
          ref={ref}
          id={inputId}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-ocean focus:ring-ocean sm:text-sm px-4 py-2 border ${error ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props} />

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error &&
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        }
      </div>);

  }
);
Input.displayName = 'Input';