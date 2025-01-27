import { useNavigate } from 'react-router-dom';

// This function will be used for all navigation needs across the app.
 const useAppNavigate = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard'); // Navigate to the dashboard
  };

  const goToLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  const goToHome = () => {
    navigate('/'); // Navigate to home
  };

  const goToProfile = (userId: string) => {
    navigate(`/profile/${userId}`); // Navigate to a specific user profile page
  };

  // Add other navigation functions as needed

  return {
    goToDashboard,
    goToLogin,
    goToHome,
    goToProfile
  };
};

export default  useAppNavigate