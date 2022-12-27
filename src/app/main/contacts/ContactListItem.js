import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { Chip } from '@mui/material';

function ContactListItem(props) {
  const { contact } = props;
  return (
    <>
      <ListItem
        className="px-32 py-16"
        sx={{ bgcolor: 'background.paper' }}
        button
        component={NavLinkAdapter}
        to={`/contacts/${contact.id}`}
      >
        <ListItemAvatar>
          <Avatar alt={contact.first_name} src={contact.avatar} />
        </ListItemAvatar>
        <ListItemText
          classes={{ root: 'm-0', primary: 'font-medium leading-5 truncate' }}
          primary={(<Typography>{contact.first_name}&nbsp;{ !contact.email_verified_at && <Chip label="Belum Verifikasi" color="warning" size="small" /> }</Typography>)}
          secondary={
            <>
              <Typography
                className="inline"
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {contact.email}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider />
    </>
  );
}

export default ContactListItem;
