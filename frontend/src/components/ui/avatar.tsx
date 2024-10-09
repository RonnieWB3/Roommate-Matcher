import React, { FC, ReactNode } from 'react';

interface AvatarProps {
  className?: string;
  children: ReactNode;
}

interface AvatarImageProps {
  src: string;
  alt: string;
  className?: string;
}

interface AvatarFallbackProps {
  className?: string;
  children: ReactNode;
}

export const Avatar: FC<AvatarProps> = ({ className, children }) => {
  return <div className={`h-12 w-12 rounded-full overflow-hidden ${className}`}>{children}</div>;
};

export const AvatarImage: FC<AvatarImageProps> = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />;
};

export const AvatarFallback: FC<AvatarFallbackProps> = ({ children, className }) => {
  return (
    <div className={`flex items-center justify-center h-full w-full bg-gray-200 ${className}`}>
      {children}
    </div>
  );
};
