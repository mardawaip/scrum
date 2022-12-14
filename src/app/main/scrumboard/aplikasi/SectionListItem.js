import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Box, LinearProgress, Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { setOpenDialog } from '../store/dataSlice';

function SectionListItem(props) {
  const dispatch = useDispatch()
  const { data, index } = props;
  
  const progres = (data.progres/data.count)*100;

  return (
    <Draggable draggableId={data.id} index={index} type="list">
      {(provided, snapshot) => (
        <>
          <ListItem
            className="px-40 py-12 group"
            sx={{ bgcolor: 'background.default' }}
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
              <FuseSvgIcon sx={{ color: 'text.disabled' }} size={20}>
                heroicons-solid:menu
              </FuseSvgIcon>
            </div>
            <ListItemText
              classes={{ root: 'm-0', primary: 'font-semibold text-16 truncate' }}
              primary={`${data.title} (${data.progres}/${data.count})`}
              secondary={(
                <LinearProgressWithLabel value={progres || 0} />
              )}
            />
          </ListItem>
          
          <Divider />
        </>
      )}
    </Draggable>
  );
}

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default SectionListItem;
