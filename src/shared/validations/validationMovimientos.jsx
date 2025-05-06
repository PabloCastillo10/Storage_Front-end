export const validarEntrada = (formData) => {
    // Verifica si todos los campos están llenos
    if (!formData.productoName.trim() || !formData.cantidad || !formData.fecha || !formData.empleado) {
      return "Todos los campos son obligatorios.";
    }
  
    // Verifica si la cantidad es un número válido y mayor que 0
    if (isNaN(formData.cantidad) || formData.cantidad <= 0) {
      return "La cantidad debe ser un número mayor a cero.";
    }
  
    // Si no hay errores, retorna null
    return null;
  };

  export const validarSalida = (formData, productos) => {
    // Verifica si todos los campos están llenos
    if (!formData.productoName.trim() || !formData.cantidad || !formData.fecha || !formData.empleado || !formData.motivo || !formData.destino) {
      return "Todos los campos son obligatorios.";
    }
  
    // Verifica si la cantidad es un número válido y mayor que 0
    if (isNaN(formData.cantidad) || formData.cantidad <= 0) {
      return "La cantidad debe ser un número mayor a cero.";
    }
  
    // Verifica que el producto exista en el listado de productos
    const producto = productos.find(p => p.name.toLowerCase() === formData.productoName.toLowerCase());
    
    if (!producto) {
      return `El producto "${formData.productoName}" no existe.`;
    }
  
    // Verifica que el stock del producto sea suficiente
    if (producto.stock < formData.cantidad) {
      return `Stock insuficiente para el producto "${formData.productoName}". Solo hay ${producto.stock} unidades disponibles.`;
    }
  
    // Si no hay errores, retorna null
    return null;
  };
  