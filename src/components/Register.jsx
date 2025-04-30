import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import  './Register.css';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
    const onSubmit = async (data) => {
      try {
        await registerUser(data);
        navigate('/', {state: {message: 'Registration successful!'}});
      } catch (error) {
        console.error("Error al registrar:", error.response?.data || error.message);
      }
    };

  return (
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
      }}
    >
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <TextField
          label="Surname"
          variant="outlined"
          type="surname"
          fullWidth
          margin="normal"
          {...register("surname", { required: "Surname is required" })}
          error={!!errors.surname}
          helperText={errors.surname?.message}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <TextField
          label="Username"
          variant="outlined"
          type="username"
          fullWidth
          margin="normal"
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username?.message}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          margin="normal"
          {...register("email",  { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <TextField
          label="Phone"
          variant="outlined"
          type="phone"
          fullWidth
          margin="normal"
          {...register("phone", { required: "Phone is required" })}
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
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Box>
  );

}

export default Register;
