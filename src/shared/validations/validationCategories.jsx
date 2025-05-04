export const validarCategoria = (formData, categorias, editingId) => {
    if (!formData.name.trim() || !formData.description.trim()) {
      return "Todos los campos son obligatorios.";
    }
  
    const nombreExiste = categorias.find(
      (cat) =>
        cat.name.toLowerCase() === formData.name.toLowerCase() &&
        cat._id !== editingId
    );
  
    if (nombreExiste) {
      return `Ya existe una categoría con el nombre "${formData.name}".`;
    }
  
    return null; 
  };