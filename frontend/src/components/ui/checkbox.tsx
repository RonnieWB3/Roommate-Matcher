import React from 'react';

export function Checkbox({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input type="checkbox" className={`form-checkbox h-4 w-4 text-blue-600 ${className}`} {...props} />
  );
}
