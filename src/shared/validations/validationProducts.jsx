export const validateProductFields = (form) => {
    const { name, description, price, stock, proveedor, categoria } = form;
  
    if (!name || !description || !price || !stock || !proveedor || !categoria) {
      return 'Todos los campos son obligatorios';
    }
  
    if (price <= 0) return 'El precio debe ser mayor que cero';
    if (stock < 0) return 'El stock no puede ser negativo';
  
    return null; 
  };
  
  export const isProductDisabled = (producto) => {
    if (producto.status === false) {
      return 'El producto está desactivado';
    }
    return null;
  };
  
  export const isDuplicateProduct = (name, productos, currentId = null) => {
    const existing = productos.find(
      (p) => p.name.toLowerCase() === name.toLowerCase() && p._id !== currentId
    );
    if (existing) {
      return `Ya existe un producto con el nombre "${name}"`;
    }
    return null;
  };
  