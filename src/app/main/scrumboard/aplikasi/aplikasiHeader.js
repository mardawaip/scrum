import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import AppsIcon from '@mui/icons-material/Apps';
import { useSelector } from 'react-redux';
import { selectData } from '../store/dataSlice';
import { Typography } from '@mui/material';

function AplikasiHeader(props) {
  const { boardId } = props;
  const location = window.location.pathname.split('/')[2];
  const { aplikasi } = useSelector(({ scrumboardApp }) => scrumboardApp.data);
  
  return (
    <div className="p-24 sm:p-32 w-full border-b-1 flex flex-col sm:flex-row items-center justify-between container">
        <div className="flex items-center mb-12 sm:mb-0">
            <div className="flex items-center justify-center space-x-12">
                <Typography
                    className="text-14 sm:text-24 md:text-32 font-extrabold tracking-tight leading-none"
                    color="inherit"
                >
                    {aplikasi.aplikasi.nama}
                </Typography>
            </div>
        </div>

        <div className="flex items-center justify-end space-x-12">
            <Button
                disabled={location === 'boards'}
                className="whitespace-nowrap"
                component={NavLinkAdapter}
                to={`/scrumboard/boards/${boardId}`}
                startIcon={<FuseSvgIcon size={20}>heroicons-outline:view-boards</FuseSvgIcon>}
            >
                Boards
            </Button>

            <Button
                disabled={location === 'aplikasi'}
                className="whitespace-nowrap"
                component={NavLinkAdapter}
                to={`/scrumboard/aplikasi/${boardId}`}
                startIcon={<AppsIcon fontSize="small"/>}
            >
                Aplikasi
            </Button>
        </div>
    </div>
  );
}

export default AplikasiHeader;
