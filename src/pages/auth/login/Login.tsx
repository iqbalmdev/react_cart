import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormValues } from './loginSchema'; // Path to schema
import { TextField, ButtonComponent } from '../../../components'; // Path to your custom components
import useStyles from './LoginStyles';
import { authenticateUser } from '../../../store/actions/authActions';
import { useDispatch,useSelector } from 'react-redux';
import greenImg from '../../../assets/images/greenImg.png';
import {useAppNavigate} from "../../../utils"
import { RootState } from '../../../store';
const LoginPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((s:RootState)=>s.auth)
  const [error, setError] = useState<string | null>(null);
  const {goToHome} = useAppNavigate()
  // Form validation hook
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema), // Use Zod schema for validation
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handle form submission
  const onSubmit = (data: LoginFormValues) => {
    const { email, password } = data;

    // Authenticate the user
    const isAuthenticated = authenticateUser(email, password, dispatch);
    console.log(isAuthenticated,"isAuthenticated ----->>>")
    if (!isAuthenticated) {
      setError('Invalid email or password');
    } else if(isAuthenticated) {
      goToHome()
    }
    
  };

  if(isAuthenticated){
    goToHome()
  }
  return (
    <Stack direction="row" className={classes.pageContainer}>
      <Stack className={classes.imageSection}>
        {/* Background Image */}
        <img src={greenImg} alt="loginImage" className={classes.greenImg} />
      </Stack>
      <Stack className={classes.formSection}>
        {/* Form Section */}
        <form
          className={classes.formContainer}
          onSubmit={handleSubmit(onSubmit)} // Trigger form submission here
        >
          <Typography variant="h5" className={classes.title}>
            Welcome Back
          </Typography>
          <Typography variant="body2" className={classes.subtitle}>
            Login to access your account
          </Typography>

          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          {/* Password Field */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          {/* Authentication Error */}
          {error && <Typography color="error">{error}</Typography>}

          {/* Submit Button */}
          <ButtonComponent variant="contained" type="submit" fullWidth label="Submit" />
        </form>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
