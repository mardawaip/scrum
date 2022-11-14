import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskListItem from './TaskListItem';
import SectionListItem from './SectionListItem';
import { handleChangeTask, reorderList } from '../store/dataSlice';

function ListWiddget(props) {
  const dispatch = useDispatch();
  const { tasks } = useSelector(({ scrumboardApp }) => scrumboardApp.data.aplikasi);

  if (!tasks) {
    return null;
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="text.secondary" variant="h5">
          There are no tasks!
        </Typography>
      </div>
    );
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const ordered = _.merge([], tasks);
    const [removed] = ordered.splice(startIndex, 1);
    ordered.splice(endIndex, 0, removed);

    const tasks_ = ordered;

    const data_update = tasks_.map((opt, key) => {  
      return { tasks_id: opt.tasks_id, order: key }
    });

    dispatch(handleChangeTask(tasks_));
    dispatch(reorderList(data_update));
  }
  return (
    <List className="w-full m-0 p-0">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list" type="list" direction="vertical">
          {(provided) => (
            <>
              <div ref={provided.innerRef}>
                {tasks.map((item, index) => {
                  if (item.type === 'task') {
                    return <TaskListItem data={item} index={index} key={item.id} />;
                  }

                  if (item.type === 'section') {
                    return <SectionListItem key={item.id} index={index} data={item} />;
                  }

                  return null;
                })}
              </div>
              {provided.placeholder}
            </>
          )}
        </Droppable>
      </DragDropContext>
    </List>
  );
}

export default ListWiddget;