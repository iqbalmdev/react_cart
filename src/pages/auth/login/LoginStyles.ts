import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  // Outer Container
  pageContainer: {
    height: '100vh',
    display: 'flex',
    width: '100vw',
    // Ensures the page takes the entire viewport width and height

    // Mobile responsiveness
    [theme.breakpoints.down('sm')]: {
    flexDirection: 'column !important',
     
    },
  },

  // Image Section (left side)
  imageSection: {
    flex: 1, // Takes half of the available width on larger screens
    height: '100vh',
    backgroundColor: theme.palette.grey[200], // Optional background color
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // Center image vertically and horizontally within the section

    // Mobile responsiveness
  },

  greenImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensures the image covers the section without stretching

    // Mobile responsiveness
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    
     
    },
  },

  // Form Section (right side)
  formSection: {
    flex: 1, // Takes the other half of the available width on larger screens
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // Mobile responsiveness
    [theme.breakpoints.down('sm')]: {
      height: '60vh', // Form takes up less height on mobile
      width: '100%', // Full width on smaller screens
    },
  },

  // Form Container
  formContainer: {
    padding: 24,
    width: '80%', // Adjust width for form container
    maxWidth: 400, // Limit max width for form

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],

    // Mobile responsiveness
    [theme.breakpoints.down('sm')]: {
      width: '90%', // Form container takes 90% of the screen width on mobile
      padding: 16, // Less padding on smaller screens
    },
  },

  // Title Typography
  title: {
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
    marginBottom: theme.spacing(1),

    // Mobile responsiveness
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem', // Smaller title text on mobile
    },
  },

  // Subtitle Typography
  subtitle: {
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing(2),

    // Mobile responsiveness
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem', // Smaller subtitle text on mobile
    },
  },

  // Styled TextField
  textField: {
    marginBottom: theme.spacing(2),

    // Mobile responsiveness
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1.5), // Smaller margin for text fields on mobile
    },
  },

  // Styled Button
  button: {
    marginTop: theme.spacing(2),

    // Mobile responsiveness
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1.5), // Smaller margin for button on mobile
    },
  },
}));

export default useStyles;
