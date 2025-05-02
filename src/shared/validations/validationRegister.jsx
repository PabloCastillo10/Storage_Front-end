

export const nameValidation = {
    required: "Name is required",
    maxLength: { value: 25, message: "Name must be at most 25 characters" }
  };
  
  export const surnameValidation = {
    required: "Surname is required",
    maxLength: { value: 25, message: "Surname must be at most 25 characters" }
  };
  
  export const usernameValidation = {
    required: "Username is required",
    minLength: { value: 3, message: "Username must be at least 3 characters" },
    maxLength: { value: 25, message: "Username must be at most 25 characters" },
    validate: {
      asyncUnique: async (value) => {
        try {
          const res = await fetch(`http://localhost:3000/almacenadora/users/check-username?username=${value}`);
          const { exists } = await res.json();
          return !exists || "Username already exists";
        } catch (err) {
          return "Error validating username";
        }
      }
    }
  };
  
  export const emailValidation = {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email format"
    },
    validate: {
      asyncUnique: async (value) => {
        try {
            const res = await fetch(`http://localhost:3000/almacenadora/users/check-email?email=${value}`);
          const { exists } = await res.json();
          return !exists || "Email already exists";
        } catch (err) {
          return "Error validating email";
        }
      } 
    }
  };
  export const phoneValidation = {
    required: "Phone is required",
    minLength: { value: 8, message: "Phone must be 8 digits" },
    maxLength: { value: 8, message: "Phone must be 8 digits" }
  };
  
  export const passwordValidation = {
    required: "Password is required",
    minLength: { value: 8, message: "Minimum 8 characters" },
    validate: {
      hasNumber: value => /\d/.test(value) || "Must include at least one number"
    }
  };
  