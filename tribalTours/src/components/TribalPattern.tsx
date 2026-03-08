import React from 'react';
interface TribalPatternProps {
  className?: string;
  opacity?: number;
}
export function TribalPattern({
  className = '',
  opacity = 0.1
}: TribalPatternProps) {
  return (
    <div
      className={`w-full h-8 overflow-hidden flex items-center justify-center ${className}`}
      style={{
        opacity
      }}
      aria-hidden="true">

      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="tribal"
            x="0"
            y="0"
            width="60"
            height="30"
            patternUnits="userSpaceOnUse">

            {/* Diamond pattern common in indigenous weaves */}
            <path
              d="M30 0 L60 15 L30 30 L0 15 Z"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1" />

            <path
              d="M30 5 L50 15 L30 25 L10 15 Z"
              fill="none"
              stroke="#1B4965"
              strokeWidth="1" />

            <path
              d="M30 10 L40 15 L30 20 L20 15 Z"
              fill="none"
              stroke="#4A7C59"
              strokeWidth="1" />

            {/* Vertical dividers */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="30"
              stroke="#1B4965"
              strokeWidth="0.5"
              strokeDasharray="2,2" />

            <line
              x1="60"
              y1="0"
              x2="60"
              y2="30"
              stroke="#1B4965"
              strokeWidth="0.5"
              strokeDasharray="2,2" />

          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#tribal)" />
      </svg>
    </div>);

}