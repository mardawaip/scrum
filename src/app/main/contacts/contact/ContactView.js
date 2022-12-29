import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/system/Box';
import format from 'date-fns/format';
import _ from '@lodash';
import { getContact, selectContact, updateContact } from '../store/contactSlice';
import { selectCountries } from '../store/countriesSlice';
import { selectTags } from '../store/tagsSlice';
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { showMessage } from 'app/store/fuse/messageSlice';

const ContactView = () => {
  const contact = useSelector(selectContact);
  const countries = useSelector(selectCountries);
  const tags = useSelector(selectTags);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getContact(routeParams.id));
  }, [dispatch, routeParams]);

  function getCountryByIso(iso) {
    return countries.find((country) => country.iso === iso);
  }

  const handleVerifikasi = () => {
    const d = new Date();
    const params = {
      id: routeParams.id,
      email_verified_at: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }
    dispatch(updateContact(params)).then(() => {
      dispatch(showMessage({ message: "Verifikasi Akun Berhasil", variant: "success" }));
      setOpen(false)
    })
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (!contact) {
    return <FuseLoading />;
  }

  return (
    <>
      <Box
        className="relative w-full h-160 sm:h-192 px-32 sm:px-48"
        sx={{
          backgroundColor: 'background.default',
        }}
      >
        {contact.background && (
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src={contact.background}
            alt="user background"
          />
        )}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText>Apakah anda yakin mengverifikais akun ini ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="outlined" color="inherit" onClick={handleClose}>Tidak</Button>
          <Button size="small" variant="contained" color="info" onClick={handleVerifikasi}>Ya</Button>
        </DialogActions>
      </Dialog>
      <div className="relative flex flex-col flex-auto items-center p-24 pt-0 sm:p-48 sm:pt-0">
        <div className="w-full max-w-3xl">
          <div className="flex flex-auto items-end -mt-64">
            <Avatar
              sx={{
                borderWidth: 4,
                borderStyle: 'solid',
                borderColor: 'background.paper',
                backgroundColor: 'background.default',
                color: 'text.secondary',
              }}
              className="w-128 h-128 text-64 font-bold"
              src={contact.avatar}
              alt={contact.first_name}
            >
              {contact.first_name?.charAt(0)}
            </Avatar>
            <div className="flex items-center ml-auto mb-4">
              {!contact.email_verified_at &&
              <Button variant="contained" size="small" color="warning" onClick={handleOpen}>
                <FuseSvgIcon size={20}>heroicons-outline:check-circle</FuseSvgIcon>
                <span className="mx-8">Verifikasi</span>
              </Button>}&nbsp;
              <Button variant="contained" size="small" color="info" component={NavLinkAdapter} to="edit">
                <FuseSvgIcon size={20}>heroicons-outline:pencil-alt</FuseSvgIcon>
                <span className="mx-8">Edit</span>
              </Button>
            </div>
          </div>

          <Typography className="mt-12 text-4xl font-bold truncate">{contact.first_name}</Typography>

          <div className="flex flex-wrap items-center mt-8">
            {contact.tags?.map((id) => (
              <Chip
                key={id}
                label={_.find(tags, { id }).title}
                className="mr-12 mb-12"
                size="small"
              />
            ))}
          </div>

          <Divider className="mt-16 mb-24" />

          <div className="flex flex-col space-y-32">
            {contact.title && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:briefcase</FuseSvgIcon>
                <div className="ml-24 leading-6">{contact.title}</div>
              </div>
            )}

            {/* {contact.company && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:office-building</FuseSvgIcon>
                <div className="ml-24 leading-6">{contact.company}</div>
              </div>
            )} */}

            {/* {contact.emails.length && contact.emails.some((item) => item.email.length > 0) && (
              <div className="flex">
                <FuseSvgIcon>heroicons-outline:mail</FuseSvgIcon>
                <div className="min-w-0 ml-24 space-y-4">
                  {contact.emails.map(
                    (item) =>
                      item.email !== '' && (
                        <div className="flex items-center leading-6" key={item.email}>
                          <a
                            className="hover:underline text-primary-500"
                            href={`mailto: ${item.email}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.email}
                          </a>
                          {item.label && (
                            <>
                              <Typography className="text-md truncate" color="text.secondary">
                                <span className="mx-8">&bull;</span>
                                <span className="font-medium">{item.label}</span>
                              </Typography>
                            </>
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            )} */}

            {/* {contact.phoneNumbers.length &&
              contact.phoneNumbers.some((item) => item.phoneNumber.length > 0) && (
                <div className="flex">
                  <FuseSvgIcon>heroicons-outline:phone</FuseSvgIcon>
                  <div className="min-w-0 ml-24 space-y-4">
                    {contact.phoneNumbers.map(
                      (item, index) =>
                        item.phoneNumber !== '' && (
                          <div className="flex items-center leading-6" key={index}>
                            <Box
                              className="hidden sm:flex w-24 h-16 overflow-hidden"
                              sx={{
                                background:
                                  "url('/assets/images/contacts/flags.png') no-repeat 0 0",
                                backgroundSize: '24px 3876px',
                                backgroundPosition: getCountryByIso(item.country)?.flagImagePos,
                              }}
                            />

                            <div className="sm:ml-12 font-mono">
                              {getCountryByIso(item.country)?.code}
                            </div>

                            <div className="ml-10 font-mono">{item.phoneNumber}</div>

                            {item.label && (
                              <>
                                <Typography className="text-md truncate" color="text.secondary">
                                  <span className="mx-8">&bull;</span>
                                  <span className="font-medium">{item.label}</span>
                                </Typography>
                              </>
                            )}
                          </div>
                        )
                    )}
                  </div>
                </div>
              )} */}

            {/* {contact.address && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:location-marker</FuseSvgIcon>
                <div className="ml-24 leading-6">{contact.address}</div>
              </div>
            )} */}

            {/* {contact.birthday && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:cake</FuseSvgIcon>
                <div className="ml-24 leading-6">
                  {format(new Date(contact.birthday), 'MMMM d, y')}
                </div>
              </div>
            )} */}

            {/* {contact.notes && (
              <div className="flex">
                <FuseSvgIcon>heroicons-outline:menu-alt-2</FuseSvgIcon>
                <div
                  className="max-w-none ml-24 prose dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: contact.notes }}
                />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactView;
