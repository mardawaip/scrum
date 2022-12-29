import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link, Navigate } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';
import jwtService from '../../auth/services/jwtService';
import AppConfig from 'app/configs/AppConfig';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import history from '@history';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  first_name: yup.string().required('Anda harus memasukkan nama tampilan'),
  last_name: yup.string().required('Anda harus memasukkan nama belakang'),
  email: yup.string().email('Anda harus memasukkan email yang valid').required('Anda harus memasukkan email'),
  password: yup
    .string()
    .required('Silakan masukkan kata sandi Anda.')
    .min(8, 'Kata sandi terlalu pendek - minimal harus 8 karakter.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Kata sandi harus sesuai'),
  acceptTermsConditions: yup.boolean().oneOf([true], 'Syarat dan ketentuan harus diterima.'),
});

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  acceptTermsConditions: false,
};

function SignUpPage() {
  const dispatch = useDispatch();
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit({ first_name, last_name, password, email, passwordConfirm }) {
    jwtService
      .createUser({
        first_name,
        last_name,
        password,
        email,
        password_confirmation: passwordConfirm,
        roles_id: 2
      })
      .then((user) => {
        dispatch(showMessage({ message: "Registrasi Berhasil, Silakan hubungin admin untuk membuka akses akun anda", variant: "success" }))
        setTimeout(() => {
          history.push({ pathname: `/sign-in` });
          // window.location.href = "/sign-in";
        }, 1000);
      })
      .catch((_errors) => {
        if(_errors.message){
          dispatch(showMessage({ message: _errors.message, variant: "error" }))
        }else{
          _errors.forEach((error) => {
            setError(error.type, {
              type: 'manual',
              message: error.message,
            });
          });
        }
      });
  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src={AppConfig.logo} alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Daftar
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Sudah memiliki akun?</Typography>
            <Link className="ml-4" to="/sign-in">
              Login
            </Link>
          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Nama Depan"
                  autoFocus
                  type="name"
                  error={!!errors.first_name}
                  helperText={errors?.first_name?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
            
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Nama Belakang"
                  autoFocus
                  type="name"
                  error={!!errors.last_name}
                  helperText={errors?.last_name?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password (Confirm)"
                  type="password"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="acceptTermsConditions"
              control={control}
              render={({ field }) => (
                <FormControl className="items-center" error={!!errors.acceptTermsConditions}>
                  <FormControlLabel
                    label="Saya menyetujui Ketentuan Layanan dan Kebijakan Privasi"
                    control={<Checkbox size="small" {...field} />}
                  />
                  <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
                </FormControl>
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className="w-full mt-24"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Create your free account
            </Button>
          </form>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: 'primary.main' }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: 'primary.light' }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -top-64 -right-64 opacity-20"
          sx={{ color: 'primary.light' }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
        </Box>

        <div className="z-10 relative w-full max-w-2xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Selamat Datang</div>
            <div>{ AppConfig.title }</div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
            { AppConfig.sub_title }<br/>
            { AppConfig.client }
          </div>
          {/* <div className="flex items-center mt-32">
            <AvatarGroup
              sx={{
                '& .MuiAvatar-root': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <Avatar src="assets/images/avatars/female-18.jpg" />
              <Avatar src="assets/images/avatars/female-11.jpg" />
              <Avatar src="assets/images/avatars/male-09.jpg" />
              <Avatar src="assets/images/avatars/male-16.jpg" />
            </AvatarGroup>

            <div className="ml-16 font-medium tracking-tight text-gray-400">
              More than 17k people joined us, it's your turn
            </div>
          </div> */}
        </div>
      </Box>
    </div>
  );
}

export default SignUpPage;
