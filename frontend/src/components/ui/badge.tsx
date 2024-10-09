import React from 'react';

export function Badge({ children, variant }: { children: React.ReactNode, variant: string }) {
  const variantClass = variant === 'secondary' ? 'bg-gray-200' : 'bg-blue-500 text-white';
  return <span className={`px-2 py-1 rounded ${variantClass}`}>{children}</span>;
}
