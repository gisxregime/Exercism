import React from 'react';
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}
export function Card({
  children,
  className = '',
  hoverable = false,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${hoverable ? 'transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer' : ''} ${className}`}
      {...props}>

      {children}
    </div>);

}