import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; // Your MUI theme configuration
import './global.css'; // Import global styles (you might want to define some basic styles here)
import { Provider } from 'react-redux';
import { store } from './store'; // Redux store setup

// Get the container element from the HTML
const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container); // Initialize the React application

  root.render(
    <React.StrictMode>
      <Provider store={store}> {/* Provide the store to the whole app */}
        <ThemeProvider theme={theme}> {/* Apply the custom theme */}
          <CssBaseline /> {/* Apply Material UI's default baseline CSS */}
          <App /> {/* Your main app component */}
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}
