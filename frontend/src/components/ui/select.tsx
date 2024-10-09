import React from 'react';

export function Select({ className, children, ...props }: React.ComponentProps<'select'>) {
  return <select className={`border px-3 py-2 rounded ${className}`} {...props}>
    {children}
  </select>;
}
