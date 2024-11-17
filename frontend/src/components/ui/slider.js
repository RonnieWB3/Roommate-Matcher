import React from 'react';
import * as RadixSlider from '@radix-ui/react-slider';

export function Slider({ value, onValueChange, min = 0, max = 100, step = 1 }) {
  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none h-5"
      value={value}
      onValueChange={onValueChange}
      min={min}
      max={max}
      step={step}
    >
      <RadixSlider.Track className="relative bg-gray-200 rounded-full grow h-1">
        <RadixSlider.Range className="absolute bg-primary rounded-full h-full" />
      </RadixSlider.Track>
      {value.map((val, index) => (
        <RadixSlider.Thumb
          key={index}
          className="block w-5 h-5 bg-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      ))}
    </RadixSlider.Root>
  );
}
