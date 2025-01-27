import { useNavigate } from 'react-router-dom';

// This function will be used for all navigation needs across the app.
export const useAppNavigate = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard'); 
  };

  const goToLogin = () => {
    navigate('/login'); 
  };

  const goToHome = () => {
    navigate('/'); 
  };

  const goToProfile = (userId: string) => {
    navigate(`/profile/${userId}`); 
  };

  // Add other navigation functions as needed

  return {
    goToDashboard,
    goToLogin,
    goToHome,
    goToProfile
  };
};
