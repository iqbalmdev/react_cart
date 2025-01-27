import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface ButtonComponentProps extends ButtonProps {
  label: string;
  onClick?: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  label,
  onClick,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      type={type}
      {...props}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
