import React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';

export function Popover({ children }) {
  return <RadixPopover.Root>{children}</RadixPopover.Root>;
}

export function PopoverTrigger({ children, asChild }) {
  return <RadixPopover.Trigger asChild={asChild}>{children}</RadixPopover.Trigger>;
}

export function PopoverContent({ children, className }) {
  return (
    <RadixPopover.Content
      className={`rounded-md shadow-lg p-4 bg-white border border-gray-200 ${className}`}
    >
      {children}
      <RadixPopover.Arrow className="fill-current text-white" />
    </RadixPopover.Content>
  );
}
