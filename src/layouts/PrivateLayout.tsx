import React from 'react';
import { Navigate} from 'react-router-dom';
import {AppLayout} from "./index"
interface PrivateLayoutProps {
  isAuthenticated: boolean;
  redirectTo?: string;
}


const PrivateLayout: React.FC<PrivateLayoutProps> = ({
  isAuthenticated,
  redirectTo = '/login',
}) => {
  return isAuthenticated ? <AppLayout /> : <Navigate to={redirectTo} />;
};

export default PrivateLayout;
