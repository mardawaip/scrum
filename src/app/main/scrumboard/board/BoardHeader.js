import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import BoardTitle from './BoardTitle';
import AppsIcon from '@mui/icons-material/Apps';

function BoardHeader(props) {
  const { boardId } = props;
  const location = window.location.pathname.split('/')[2];
  
  return (
    <div className="p-8 sm:p-8 w-full border-b-1 flex flex-col sm:flex-row items-center justify-between container">
      <div className="flex items-center mb-12 sm:mb-0">
        <BoardTitle />
      </div>

      <div className="flex items-center justify-end space-x-12">
        <Button
          disabled={location === 'boards'}
          className="whitespace-nowrap"
          component={NavLinkAdapter}
          to={`/scrumboard/boards/${boardId}`}
          startIcon={<FuseSvgIcon size={20}>heroicons-outline:view-boards</FuseSvgIcon>}
          size="small"
        >
          Boards
        </Button>

        <Button
          disabled={location === 'aplikasi'}
          className="whitespace-nowrap"
          component={NavLinkAdapter}
          to={`/scrumboard/aplikasi/${boardId}`}
          startIcon={<AppsIcon fontSize="small"/>}
          size="small"
        >
          Aplikasi
        </Button>

        <Button
          size="small"
          className="whitespace-nowrap"
          variant="contained"
          color="secondary"
          onClick={() => props.onSetSidebarOpen(true)}
          startIcon={<FuseSvgIcon size={20}>heroicons-outline:cog</FuseSvgIcon>}
        >
          Settings
        </Button>
      </div>
    </div>
  );
}

export default BoardHeader;
