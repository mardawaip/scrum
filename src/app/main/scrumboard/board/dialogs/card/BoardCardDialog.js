import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { closeCardDialog } from '../../../store/dataSlice';
import BoardCardForm from './BoardCardForm';

function BoardCardDialog(props) {
  const dispatch = useDispatch();
  const { dialogOpen } = useSelector(({ scrumboardApp }) => scrumboardApp.data);

  return (
    <Dialog
      classes={{
        paper: 'max-w-lg w-full m-8 sm:m-24',
      }}
      onClose={(ev) => dispatch(closeCardDialog())}
      open={dialogOpen}
    >
      <BoardCardForm />
    </Dialog>
  );
}

export default BoardCardDialog;
