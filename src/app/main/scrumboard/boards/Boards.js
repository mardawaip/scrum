import { LinearProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards, resetBoards } from '../store/dataSlice';
import BoardItem from './BoardItem';
import NewBoardItem from './NewBoardItem';

function Boards(props) {
  const dispatch = useDispatch();
  const { boards } = useSelector(({ scrumboardApp }) => scrumboardApp.data);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getBoards()).then(() => {
      setLoading(false);
    });
    return () => {
      dispatch(resetBoards());
    };
  }, [dispatch]);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
    { loading && <LinearProgress/> }
    <div className="flex grow shrink-0 flex-col items-center container p-24 sm:p-40">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
        <Typography className="mt-16 md:mt-96 text-3xl md:text-6xl font-extrabold tracking-tight leading-7 sm:leading-10 text-center">
          Scrumboard Boards Aplikasi
        </Typography>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mt-32 md:mt-64"
      >
        <motion.div variants={item} className="min-w-full sm:min-w-224 min-h-360">
          <NewBoardItem />
        </motion.div>
        {boards.map((board) => (
          <motion.div variants={item} className="min-w-full sm:min-w-224 min-h-360" key={board.id}>
            <BoardItem board={board} key={board.id} />
          </motion.div>
        ))}
      </motion.div>
    </div>
    </>
  );
}

export default Boards;
