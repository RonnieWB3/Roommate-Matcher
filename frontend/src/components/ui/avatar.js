import React from 'react';

export function Avatar({ className, children }) {
  return (
    <div className={`inline-flex items-center justify-center rounded-full bg-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full rounded-full object-cover"
    />
  );
}

export function AvatarFallback({ children }) {
  return (
    <div className="text-sm font-medium text-gray-600">{children}</div>
  );
}
