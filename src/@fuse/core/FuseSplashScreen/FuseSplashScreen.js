import { memo } from 'react';
import Box from '@mui/material/Box';
import AppConfig from 'app/configs/AppConfig';

function FuseSplashScreen() {
  return (
    <div id="fuse-splash-screen">
      <div className="logo">
        <img width="128" src={AppConfig.logo} alt="logo" />
      </div>
      <Box
        id="spinner"
        sx={{
          '& > div': {
            backgroundColor: 'palette.secondary.main',
          },
        }}
      >
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </Box>
    </div>
  );
}

export default memo(FuseSplashScreen);
