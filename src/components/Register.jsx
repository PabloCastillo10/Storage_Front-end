import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import './Register.css';
import { useRegister } from '../shared/hooks/useRegister';
import { nameValidation, surnameValidation, usernameValidation, emailValidation, phoneValidation, passwordValidation } from '../shared/validations/validationRegister';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur', 
  });
  const { handleRegister } = useRegister();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
          boxShadow: 3,
          maxWidth: 400,
          margin: 'auto',
          color: 'white',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: 5,
        }}
      >
        <Typography variant="h4" gutterBottom>Register</Typography>
        <form onSubmit={handleSubmit(handleRegister)} style={{ width: '100%', textAlign: 'center' }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("name", nameValidation)}
            error={!!errors.name}
            helperText={errors.name?.message}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            label="Surname"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("surname", surnameValidation)}
            error={!!errors.surname}
            helperText={errors.surname?.message}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("username", usernameValidation)}
            error={!!errors.username}
            helperText={errors.username?.message}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email", emailValidation)}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("phone", phoneValidation)}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", passwordValidation)}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Already have an account? <a href="/" style={{ color: 'white' }}>Login</a>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
