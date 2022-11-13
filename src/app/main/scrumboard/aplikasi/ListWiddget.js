import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskListItem from './TaskListItem';
import SectionListItem from './SectionListItem';

function ListWiddget(props) {
  const dispatch = useDispatch();
  const tasks2 = [
    {
      "id": "f65d517a-6f69-4c88-81f5-416f47405ce1",
      "type": "section",
      "title": "Dashboard",
      "completed": true,
      "progres": 15,
      "priority": 1,
      "order": 0
    },
    {
      "id": "0fcece82-1691-4b98-a9b9-b63218f9deef",
      "type": "task",
      "title": "Hasil Pengujian",
      "completed": true,
      "priority": 0,
      "order": 1
    },
    {
      "id": "2e6971cd-49d5-49f1-8cbd-fba5c71e6062",
      "type": "task",
      "title": "PENGENDALIAN PLH",
      "completed": false,
      "priority": 0,
      "order": 2
    },
    {
      "id": "2e6971cd-49d5-49f1-8cbd-fba5c71e6063",
      "type": "task",
      "title": "Konservasi Sumber Daya Alam",
      "completed": false,
      "priority": 0,
      "order": 2
    },
    {
      "id": "2e6971cd-49d5-49f1-8cbd-fba5c71e6064",
      "type": "task",
      "title": "Persampahan",
      "completed": false,
      "priority": 0,
      "order": 2
    },
    {
      "id": "2e6971cd-49d5-49f1-8cbd-fba5c71e6065",
      "type": "task",
      "title": "Trend Pengujian",
      "completed": false,
      "priority": 0,
      "order": 2
    },
    {
      "id": "2e6971cd-49d5-49f1-8cbd-fba5c71e6066",
      "type": "task",
      "title": "Kemitraan Lingkungan Hidup",
      "completed": false,
      "priority": 0,
      "order": 2
    },
  ];

  const { tasks } = useSelector(({ ScrumAplikasi }) => ScrumAplikasi.data);

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

    dispatch(
      reorderList({
        arr: tasks,
        startIndex: result.source.index,
        endIndex: result.destination.index,
      })
    );
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