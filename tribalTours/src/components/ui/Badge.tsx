import React from 'react';
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'ocean' | 'olive' | 'amber' | 'gray' | 'success' | 'danger';
}
export function Badge({
  children,
  variant = 'gray',
  className = '',
  ...props
}: BadgeProps) {
  const variants = {
    ocean: 'bg-ocean/10 text-ocean',
    olive: 'bg-olive/10 text-olive',
    amber: 'bg-amber-100 text-amber-800',
    gray: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800'
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
      {...props}>

      {children}
    </span>);

}