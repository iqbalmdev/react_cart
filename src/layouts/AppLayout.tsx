import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header } from '../components';

const AppLayout: React.FC = () => {
  return (
    <Box>
     <Header/>
      <Box sx={{ padding: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
