import React, { useState, ReactNode, useRef } from 'react';
import { usePopper } from 'react-popper';

// The Popover component wrapper
export function Popover({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const referenceRef = useRef<HTMLButtonElement>(null);
  const { styles, attributes } = usePopper(referenceRef.current, popoverRef.current, {
    placement: 'bottom',
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="relative inline-block">
      <PopoverTrigger asChild>
        <button ref={referenceRef} onClick={toggleVisibility} className="px-4 py-2 border rounded">
          {children}
        </button>
      </PopoverTrigger>
      {isVisible && (
        <PopoverContent ref={popoverRef} style={styles.popper} {...attributes.popper}>
          {children}
        </PopoverContent>
      )}
    </div>
  );
}

// PopoverTrigger component, used as the trigger for opening the Popover
export function PopoverTrigger({ children, asChild }: { children: ReactNode, asChild?: boolean }) {
  return <>{children}</>;
}

// PopoverContent component that shows the actual popover content
export const PopoverContent = React.forwardRef<HTMLDivElement, { children: ReactNode, style?: any, [x: string]: any }>(
  ({ children, style, ...props }, ref) => (
    <div
      ref={ref}
      style={{ ...style, zIndex: 10 }}
      className="bg-white shadow-lg p-4 rounded-lg border"
      {...props}
    >
      {children}
    </div>
  )
);

PopoverContent.displayName = 'PopoverContent';
