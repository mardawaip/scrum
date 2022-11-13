import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
// import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
// import { selectRemainingTasks } from './store/tasksSlice';

function ListHeader(props) {
  const remainingTasks = 12; //useSelector(selectRemainingTasks);

  return (
    <div className="flex flex-col sm:flex-row item-center sm:items-start space-y-16 sm:space-y-0 p-8 w-full border-b-1 flex items-center justify-between items-center">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-12">
        <Typography
            component={motion.span}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            delay={300}
            className="text-20 font-extrabold tracking-tight leading-none"
            size="small"
        >
          Module
        </Typography>
        <Typography
            component={motion.span}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            delay={500}
            className="text-14 font-medium ml-2"
            color="text.secondary"
            size="small"
        >
            {`${remainingTasks} remaining tasks`}
        </Typography>
      </div>

      <div className="flex items-center -mx-8">
        <Button
            color="info"
            variant="contained"
            className="mx-8 whitespace-nowrap"
            component={NavLinkAdapter}
            to="new/section"
            size="small"
        >
            <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
            <span className="mx-8">Add Section</span>
        </Button>
        <Button
            className="mx-8 whitespace-nowrap"
            variant="contained"
            color="primary"
            component={NavLinkAdapter}
            to="new/task"
            size="small"
        >
          <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
          <span className="mx-8">Add Task</span>
        </Button>
      </div>
    </div>
  );
}

export default ListHeader;
