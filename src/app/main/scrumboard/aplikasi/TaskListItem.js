import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import format from 'date-fns/format';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { setOpenDialog } from '../store/dataSlice';
// import { updateTask } from './store/taskSlice';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import UpdateIcon from '@mui/icons-material/Update';
import { useNavigate, useParams } from 'react-router-dom';

function TaskListItem(props) {
  const { data, index } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routeParams = useParams();

  return (
    <Draggable draggableId={data.id} index={index} type="list">
      {(provided, snapshot) => (
        <>
          <ListItem
            className={clsx(snapshot.isDragging ? 'shadow-lg' : 'shadow', 'px-40 py-4 group')}
            sx={{ bgcolor: 'background.paper' }}
            button
            onClick={() => {
              dispatch(setOpenDialog(data));
            }}
            // component={NavLinkAdapter}
            // to={`/tasks/${data.id}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              className="md:hidden absolute flex items-center justify-center inset-y-0 left-0 w-32 cursor-move md:group-hover:flex"
              {...provided.dragHandleProps}
            >
              <FuseSvgIcon sx={{ color: 'text.disabled' }} size={15}>
                heroicons-solid:menu
              </FuseSvgIcon>
            </div>
            <ListItemIcon className="min-w-40 -ml-10 mr-8">
              <IconButton
                sx={{
                  color: data.completed === 'true' ? 'secondary.main' : data.completed === 'progres' ? 'orange' : 'text.disabled'
                }}
                onClick={(ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();
                  navigate(`/scrumboard/boards/${routeParams.boardId}/${data.id}`)
                  // dispatch(updateTask({ ...data, completed: !data.completed }));
                }}
              >
                {/* <FuseSvgIcon>heroicons-outline:check-circle</FuseSvgIcon> */}
                { data.completed === 'true' && <CheckCircleOutlineIcon/> }
                { data.completed === 'false' && <RemoveCircleOutlineIcon/> }
                { data.completed === 'progres' && <UpdateIcon/> }
              </IconButton>
            </ListItemIcon>
            <ListItemText classes={{ root: 'm-0', primary: 'truncate' }} primary={(<Typography style={{ fontSize: '12px' }}>{ data.title}</Typography>)} />
            <div className="flex items-center">
              <div>
                {data.priority === 0 && (
                  <FuseSvgIcon className="text-green icon-size-16 mx-12">
                    heroicons-outline:arrow-narrow-down
                  </FuseSvgIcon>
                )}
                {data.priority === 2 && (
                  <FuseSvgIcon className="text-red icon-size-16 mx-12">
                    heroicons-outline:arrow-narrow-up
                  </FuseSvgIcon>
                )}
              </div>

              {data.dueDate && (
                <Typography className="text-12 whitespace-nowrap" color="text.secondary">
                  {format(new Date(data.dueDate), 'LLL dd')}
                </Typography>
              )}
              <Typography className="text-12 whitespace-nowrap" color="text.secondary">
                { `${data.scrum?.selesai}/${data.scrum?.count}` }
              </Typography>
            </div>
          </ListItem>
          <Divider />
        </>
      )}
    </Draggable>
  );
}

export default TaskListItem;
