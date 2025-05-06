
export const verificarUsuarioExistente   = (username) => {
    if (username && username !== currentUsername) {
        if (existingUser && existingUser.username !== currentUsername) {
          throw new Error(`El nombre de usuario ${username} ya está en uso`);
        }
      }
}

  export const phoneLength = (phone = '') => {
    if (phone.length !== 8) {
      throw new Error("El número de teléfono debe contener exactamente 8 caracteres");
    }
  };
  
  export const passwordLength = (password = '') => {
    if (password && (password.length < 8 || password.length > 10)) {
      throw new Error("La contraseña debe tener entre 8 y 10 caracteres");
    }
  };
  
  export const camposObligatorios = (formData) => {
    const campos = ['name', 'surname', 'username', 'phone', 'currentPassword'];
    for (const campo of campos) {
      if (!formData[campo]) {
        throw new Error(`El campo "${campo}" es obligatorio`);
      }
    }
  };