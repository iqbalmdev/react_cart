// authenticateUser.ts
import { Appusers } from '../../constants'; // Path to users file
import { AppDispatch } from '../index'; // Adjust based on your store setup
import { login } from '../reducer/authSlice';

// Authenticate user function

interface UserSchema {
    email: string;
    password: string;
    role: 'user' | 'admin';  // Add this line to specify role type
    name: string;
    id:number
  }
export const authenticateUser = (
  email: string,
  password: string,
  dispatch: AppDispatch
): boolean => {
  // Find the user from the data (Appusers)

  const user = Appusers.find(
    (u:UserSchema) => u.email === email && u.password === password
  );

  // If user is found
  if (user) {
    // Dispatch login with user information (role and userInfo)
    dispatch(login({ role: user.role, userInfo: { id: user.id, name: user.name } }));

    return true;
  }

  return false; // Authentication failed
};
