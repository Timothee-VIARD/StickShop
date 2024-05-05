import { Box, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom';
import { Login } from './Login/Login';
import { useState } from 'react';
import { SignUp } from './SignUp/SignUp';

export const Auth = () => {
  const [isOnLogin, setIsOnLogin] = useState(true);

  const switchAuth = () => {
    setIsOnLogin(!isOnLogin);
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <div
          style={{
            backgroundImage: `${isOnLogin ? 'url("/images/LoginImage.jpg")' : 'url("/images/SignUpImage.jpg")'}`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '50vw'
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Box className="absolute top-0 right-0">
          <IconButton className="m-3" component={Link} to="/">
            <CloseRoundedIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box className="w-full h-full p-36 flex items-center">
          {isOnLogin ? <Login switchAuth={switchAuth} /> : <SignUp switchAuth={switchAuth} />}
        </Box>
      </Grid>
    </Grid>
  );
};
