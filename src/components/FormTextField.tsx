import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import {Typography} from "./"
// Custom Styles
const useStyles = makeStyles((theme:Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  errorText: {
    color: theme.palette.error.main,
    fontSize: '0.875rem',
    marginTop: theme.spacing(0.5),
  },
}));

interface CustomTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  errorText?: string; // Optional custom error message
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  errorText,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        {...props}
        label={label}
        variant="outlined" // Ensure 'variant' is set
        fullWidth
        error={!!errorText} // Set error state based on errorText
      />
      {errorText && <Typography variant='h6' color={'error'}>{errorText}</Typography>}
    </div>
  );
};

export default CustomTextField;
