import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Edit } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';

const defaultValues = {
  first_name: '',
  last_name: '',
  gender: '',
  birthday: '',
  locations: '',
  website: '',
  phone: ''
}

const schema = yup.object().shape({
  first_name: yup.string().required('You must enter a value'),
  last_name: yup.string().required('You must enter a value'),
  gender: yup.string(),
});

function Pengaturan() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  // const data = watch();

  useEffect(() => {
    // axios.get('/api/profile/about').then((res) => {
    //   setData(res.data);
    // });
  }, []);

  const { general, work, contact, groups, friends } = data || {};

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full">
      <div className="md:flex">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32">
            <form onSubmit={handleSubmit((_data) => console.info(_data))}>
              <div className="px-32 pt-24 flex flex-between justify-between">
                <Typography className="text-2xl font-semibold leading-tight">
                  Info Pengguna
                </Typography>
                <Button
                  variant="contained"
                  color="warning"
                  size="small"
                  type="submit"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                >
                  <Edit fontSize="small"/> Simpan
                </Button>
              </div>

              <CardContent className="px-32 py-24">
                  <div className="mt-8 mb-16">
                    <Typography className="font-semibold mb-8 text-15">Nama Depan</Typography>
                    <Controller
                      name="first_name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Nama Depan"
                          variant="outlined"
                          error={!!errors.first_name}
                          helperText={errors?.first_name?.message}
                          size="small"
                          required
                          fullWidth
                        />
                      )}
                    />
                  </div>

                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">Nama Belakang</Typography>
                    <Controller
                      name="last_name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Nama Depan"
                          variant="outlined"
                          error={!!errors.last_name}
                          helperText={errors?.last_name?.message}
                          size="small"
                          required
                          fullWidth
                        />
                      )}
                    />
                  </div>

                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">Jenis Kelamin</Typography>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <FormControl error={!!errors.gender} required>
                          <RadioGroup {...field} aria-label="gender" name="gender1">
                            <FormControlLabel value="laki-laki" control={<Radio />} label="Laki-laki" />
                            <FormControlLabel value="perempuan" control={<Radio />} label="Perempuan" />
                          </RadioGroup>
                          <FormHelperText>{errors?.gender?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </div>

                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">Tanggal Lahir</Typography>
                    <Controller
                      name="birthday"
                      control={control}
                      render={({ field: { onChange, value, onBlur } }) => (
                        <DatePicker
                          value={value}
                          onChange={onChange}
                          required
                          renderInput={(_props) => (
                            <TextField
                              className="w-full"
                              {..._props}
                              onBlur={onBlur}
                              error={!!errors.birthday}
                              helperText={errors?.birthday?.message}
                            />
                          )}
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">Alamat</Typography>
                    <Controller
                      name="locations"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Alamat"
                          variant="outlined"
                          error={!!errors.locations}
                          helperText={errors?.locations?.message}
                          multiline
                          rows={10}
                          size="small"
                          required
                          fullWidth
                        />
                      )}
                    />
                  </div>

                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">Ho HP</Typography>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="No HP"
                          variant="outlined"
                          error={!!errors.phone}
                          helperText={errors?.phone?.message}
                          size="small"
                          required
                          fullWidth
                        />
                      )}
                    />
                  </div>

                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">Web Site</Typography>
                    <Controller
                      name="website"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Web Site"
                          variant="outlined"
                          error={!!errors.website}
                          helperText={errors?.website?.message}
                          size="small"
                          required
                          fullWidth
                        />
                      )}
                    />
                  </div>

              </CardContent>
              </form>
          </Card>
        </div>

        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32">
            <div className="px-32 pt-24">
              <Typography className="text-2xl font-semibold leading-tight">
                Info Akun
              </Typography>
            </div>

            <CardContent className="px-32 py-24">
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Email</Typography>
                <Typography>admin@gmail.com</Typography>
              </div>

              <Button variant="contained" color="info" size="small" onClick={handleOpen}>Ubah Password</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Ubah Password</DialogTitle>
        <DialogContent>
          <TextField
            id="password_lama"
            name="password_lama"
            label="Password Lama"
            type="password"
            size="small"
            fullWidth
            variant="outlined"
            className="mt-8 mb-16"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="password_baru"
            name="password_baru"
            label="Password Baru"
            type="password"
            size="small"
            fullWidth
            variant="outlined"
            className="mt-2 mb-16"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="password_confirm"
            name="password_confirm"
            label="Password (Confirm)"
            type="password"
            size="small"
            fullWidth
            variant="outlined"
            className="mt-2 mb-16"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="outlined" color="primary" onClick={handleClose}>Tutup</Button>
          <Button size="small" variant="contained" color="primary" onClick={handleClose}>Simpan</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}

export default Pengaturan;
