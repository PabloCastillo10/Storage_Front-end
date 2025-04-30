import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Stack,
  } from "@chakra-ui/react"
  import { useForm } from "react-hook-form"
  
  const Register = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()
  
    const onSubmit = (data) => {
      console.log(data)
    }
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={errors.name}>
            <FormLabel>Name</FormLabel>
            <Input {...register("name", { required: "Name is required" })} />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
  
          <FormControl isInvalid={errors.surname}>
            <FormLabel>Surname</FormLabel>
            <Input {...register("surname", { required: "Surname is required" })} />
            <FormErrorMessage>{errors.surname?.message}</FormErrorMessage>
          </FormControl>
  
          <FormControl isInvalid={errors.username}>
            <FormLabel>Username</FormLabel>
            <Input {...register("username", { required: "Username is required" })} />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>
  
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
  
          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
  
          <FormControl isInvalid={errors.phone}>
            <FormLabel>Phone</FormLabel>
            <Input {...register("phone", { required: "Phone is required" })} />
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </FormControl>
  
          <Button type="submit" colorScheme="blue">
            Register
          </Button>
        </Stack>
      </form>
    )
  }
  
  export default Register
  