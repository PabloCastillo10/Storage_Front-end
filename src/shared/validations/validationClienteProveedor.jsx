export const nombreClienteValidation = {
    required: "El nombre es obligatorio",
    maxLength: { value: 25, message: "Máximo 25 caracteres" }
};

export const nombreProveedorValidation = {
    required: "El nombre es obligatorio",
    maxLength: { value: 25, message: "Máximo 25 caracteres" }
};

export const contactoValidation = {
    validate: (value) => {
      if (!value) return "El contacto es obligatorio";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || "Formato de correo inválido";
    }
  };  

export const productoAsignadoValidation = {
    required: "El producto es obligatorio"
};