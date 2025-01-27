import React from 'react';
import {Typography} from "../components"

const NotFound: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" color="error">
        404 - Page Not Found
      </Typography>
    </div>
  );
};

export default NotFound;
