import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Edit } from '@mui/icons-material';
import { TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import { Controller, useForm } from 'react-hook-form';

const defaultValues = {
  first_name: '',
  last_name: ''
}

const schema = yup.object().shape({
  TextField: yup.string().required('You must enter a value'),
});

function Pengaturan() {
  const [data, setData] = useState([]);
  
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

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full">
      <div className="md:flex">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32">
            <div className="px-32 pt-24 flex flex-between justify-between">
              <Typography className="text-2xl font-semibold leading-tight">
                Info Pengguna
              </Typography>
              <Button variant="contained" color="warning" size="small"><Edit fontSize="small"/> Simpan</Button>
            </div>

            <CardContent className="px-32 py-24">
              <form onSubmit={handleSubmit((_data) => console.info(_data))}>
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
                  {/* <Typography>{general.last_name}</Typography> */}
                </div>

                <div className="mb-24">
                  <Typography className="font-semibold mb-4 text-15">Jenis Kelamin</Typography>
                  {/* <Typography>{general.gender}</Typography> */}
                </div>

                <div className="mb-24">
                  <Typography className="font-semibold mb-4 text-15">Tanggal Lahir</Typography>
                  {/* <Typography>{general.birthday}</Typography> */}
                </div>

                <div className="mb-24">
                  <Typography className="font-semibold mb-4 text-15">Alamat</Typography>
                  {/* <Typography>{general.location}</Typography> */}
                </div>

                <div className="mb-24">
                  <Typography className="font-semibold mb-4 text-15">Ho HP</Typography>
                  {/* <Typography>{general.phone}</Typography> */}
                </div>

                <div className="mb-24">
                  <Typography className="font-semibold mb-4 text-15">Web Site</Typography>
                  {/* <Typography>{general.website}</Typography> */}
                </div>

              </form>
            </CardContent>
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
                {/* <Typography>{general.email}</Typography> */}
              </div>

              <Button variant="contained" color="info" size="small">Ubah Password</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

export default Pengaturan;
