import React from 'react';

export function Input({ className, ...props }) {
  return (
    <input
      className={`px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
      {...props}
    />
  );
}
