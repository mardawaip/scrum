import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppConfig from 'app/configs/AppConfig';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex items-center">
      <img className="logo-icon w-32 h-32" src={AppConfig.logo} alt="logo" />
      <Typography>{ AppConfig.title }</Typography>
    </Root>
  );
}

export default Logo;
