import React from 'react';

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  hideTextOnMobile?: boolean; // Add this prop to control text visibility on mobile
  hideIconOnMobile?: boolean; // Add this prop to control icon visibility on mobile
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'medium',
  icon,
  fullWidth = false,
  hideTextOnMobile = false, 
  hideIconOnMobile = false, 
}) => {
  const baseClasses = 'inline-flex items-center justify-center border font-medium rounded-xl uppercase';
  const variantClasses = {
    primary: 'bg-[#E96535] text-white border-transparent hover:bg-[#CB491A]',
    secondary: 'bg-gray-500 text-white border-transparent hover:bg-gray-600',
    danger: 'bg-red-500 text-white border-transparent hover:bg-red-600',
  };
  const sizeClasses = {
    small: 'px-2.5 py-1.5 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-lg',
  };
  const fullWidthClasses = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidthClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {icon && (
        <span className={`${hideIconOnMobile ? 'hidden sm:flex' : ''} ${text ? 'mr-2' : ''}`}>
          {icon}
        </span>
      )}
      {text && (
        <span className={`${hideTextOnMobile ? 'hidden sm:inline' : ''}`}>
          {text}
        </span>
      )}
    </button>
  );
};

export default Button;
