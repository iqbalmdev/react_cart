import React from 'react';
import { Typography } from '@mui/material';

interface TypographyComponentProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';
}

const TypographyComponent: React.FC<TypographyComponentProps> = ({
  variant,
  children,
  color = 'textPrimary',
}) => {
  return (
    <Typography variant={variant} color={color}>
      {children}
    </Typography>
  );
};

export default TypographyComponent;
