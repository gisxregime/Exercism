import React, { useState } from 'react';
import { StarIcon } from 'lucide-react';
interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  reviewCount?: number;
}
export function RatingStars({
  rating,
  maxStars = 5,
  interactive = false,
  onChange,
  size = 'md',
  showCount = false,
  reviewCount = 0
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8'
  };
  const iconSize = sizes[size];
  return (
    <div className="flex items-center">
      <div className="flex space-x-1">
        {[...Array(maxStars)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = interactive ?
          starValue <= (hoverRating || rating) :
          starValue <= Math.round(rating);
          return (
            <button
              key={index}
              type={interactive ? 'button' : undefined}
              disabled={!interactive}
              className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} focus:outline-none`}
              onClick={() => interactive && onChange && onChange(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(0)}>

              <StarIcon
                className={`${iconSize} ${isFilled ? 'text-amber-400 fill-current' : 'text-gray-300'} transition-colors`} />

            </button>);

        })}
      </div>

      {showCount &&
      <span className="ml-2 text-sm text-gray-600">
          {rating.toFixed(1)} ({reviewCount} reviews)
        </span>
      }
    </div>);

}