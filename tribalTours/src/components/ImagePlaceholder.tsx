import React from 'react';
import { CameraIcon } from 'lucide-react';
interface ImagePlaceholderProps {
  height?: string;
  className?: string;
  text?: string;
}
export function ImagePlaceholder({
  height = 'h-48',
  className = '',
  text = 'Click to add image'
}: ImagePlaceholderProps) {
  return (
    <div
      className={`w-full bg-gray-100 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-400 hover:bg-gray-50 hover:border-ocean hover:text-ocean transition-colors cursor-pointer ${height} ${className}`}>

      <CameraIcon className="w-8 h-8 mb-2" />
      <span className="text-sm font-medium">{text}</span>
    </div>);

}