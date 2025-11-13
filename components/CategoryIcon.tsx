
import React, { ReactNode } from 'react';

interface CategoryIconProps {
  icon: ReactNode;
  color: string;
  onClick?: () => void;
  isSelected?: boolean;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ icon, color, onClick, isSelected }) => {
  const selectedClasses = isSelected ? 'ring-2 ring-offset-2 ring-green-500' : '';
  const cursorClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${color} ${selectedClasses} ${cursorClass} transition-all duration-200`}
    >
      {icon}
    </div>
  );
};

export default CategoryIcon;
