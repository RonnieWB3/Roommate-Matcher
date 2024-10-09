import React from 'react';

export function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return <input className={`border px-3 py-2 rounded ${className}`} {...props} />;
}