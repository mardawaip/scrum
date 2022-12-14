import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Aplikasi from './aplikasi/aplikasi';
import ScrumboardApp from './ScrumboardApp';

const Board = lazy(() => import('./board/Board'));
const Boards = lazy(() => import('./boards/Boards'));

const ScrumboardAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/scrumboard',
      element: <ScrumboardApp />,
      children: [
        {
          path: '',
          element: <Navigate to="/scrumboard/boards" />,
        },
        {
          path: 'boards',
          element: <Boards />,
        },
        {
          path: 'boards/:boardId/:taskId',
          element: <Board />,
        },
        {
          path: 'boards/:boardId',
          element: <Board />,
        },
        {
          path: 'aplikasi/:boardId',
          element: <Aplikasi />,
        },
      ],
    },
  ],
};

export default ScrumboardAppConfig;
