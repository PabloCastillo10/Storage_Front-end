import { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Alert, Modal, Card, Container } from 'react-bootstrap';
import { useProductos } from '../../shared/hooks/useProductos'; 
import { useNavigate } from 'react-router-dom';
import { validateProductFields, isDuplicateProduct, isProductDisabled } from '../../shared/validations/validationProducts';
export const Products = () => {
  const navigate = useNavigate();
  const {
    productos,
    categorias,
    proveedores,
    handleGetProductos,
    handleGetCategorias,
    handleGetProveedores,
    handlePostProductos,

    handleDeleteProductos,
    handlePutProductos,
    handleSearchProductos,
  } = useProductos();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    proveedor: '',
    categoria: '',
    fechaEntrada: ''
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [searchCategoria, setSearchCategoria] = useState('');
  const [searchFechaEntrada, setSearchFechaEntrada] = useState('');
  const [alert, setAlert] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    handleGetProductos();
    handleGetCategorias();
    handleGetProveedores();

   
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  
    const fieldError = validateProductFields(form);
    if (fieldError) {
      setAlert({ type: 'danger', message: fieldError });
      return;
    }
  
   
    const duplicateError = isDuplicateProduct(form.name, productos, editing ? editId : null);
    if (duplicateError) {
      setAlert({ type: 'danger', message: duplicateError });
      return;
    }
  
   
    if (editing) {
      const productoEditando = productos.find(p => p._id === editId);
      const statusError = isProductDisabled(productoEditando);
      if (statusError) {
        setAlert({ type: 'danger', message: statusError });
        return;
      }
    }
  
    try {
      if (editing) {
        await handlePutProductos(editId, form);
        setAlert({ type: 'success', message: 'Producto actualizado' });
      } else {
        await handlePostProductos(form);
        setAlert({ type: 'success', message: 'Producto creado' });
      }
  
      
      setForm({ name: '', description: '', price: '', stock: '', proveedor: '', categoria: '', fechaEntrada: '' });
      setEditing(false);
      setEditId(null);
      handleGetProductos();
  
    } catch (error) {
      const message = error?.response?.data?.msg || error?.message || 'Error al guardar producto';
      setAlert({ type: 'danger', message });
    }
  };

  const handleEdit = (producto) => {
    setForm({
    
      ...producto,
      
      categoria: producto.categoria.name || producto.categoria,
      proveedor: producto.proveedor.name || producto.proveedor,
    });
    setEditId(producto._id, toString(producto.name));
    setEditing(true);
  };

  const confirmDelete = async () => {
    try {
      await handleDeleteProductos(confirmDeleteId);
      setAlert({ type: 'success', message: 'Producto eliminado' });
      handleGetProductos();
    } catch (error) {
      setAlert({ type: 'danger', message: 'Error al eliminar producto' });
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const handleSearch = () => {
    if (search.trim()) {
      handleSearchProductos(search.trim());
    } else if (searchCategoria.trim()) {
      handleSearchProductos(searchCategoria.trim());
    } else if (searchFechaEntrada.trim()) {
      handleSearchProductos(searchFechaEntrada.trim());
    } else {
      handleGetProductos();
    }
  };

  
  return (
    <Container className="mt-4">
      <Button variant="secondary" onClick={() => navigate('/dashboard')}>← Regresar a Dashboard</Button>
      <h2 className="my-4">Gestión de Productos</h2>

      {alert && <Alert variant={alert.type}>{alert.message}</Alert>}

      <Form>
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control name="description" value={form.description} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm={4}>
            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control name="price" type="number" value={form.price} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group>
              <Form.Label>Stock</Form.Label>
              <Form.Control name="stock" type="number" value={form.stock} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group>
              <Form.Label>Proveedor</Form.Label>
              <Form.Select name="proveedor" value={form.proveedor} onChange={handleChange} color='white'>
                <option value="">Selecciona un proveedor</option>
                { Array.isArray(proveedores) && proveedores.map((p) => ( <option key={p._id} value={p.name}>{p.name}</option> ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Categoría</Form.Label>
              <Form.Select name="categoria" value={form.categoria} onChange={handleChange}>
                <option value="">Selecciona una categoría</option>
                {Array.isArray(categorias) && categorias.map((c) => (
                  <option key={c._id} value={c.name}>{c.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Fecha de Entrada</Form.Label>
              <Form.Control type="date" name="fechaEntrada" value={form.fechaEntrada} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleSubmit}>{editing ? 'Actualizar' : 'Agregar'} Producto</Button>
      </Form>

      <hr />

      <Row className="mb-4">
        <Col sm={4}>
          <Form.Control
            placeholder="Buscar por nombre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col sm={4}>
          <Form.Control
            placeholder="Buscar por categoría"
            value={searchCategoria}
            onChange={(e) => setSearchCategoria(e.target.value)}
          />
        </Col>
        <Col sm={4}>
          <Form.Control
            type="date"
            value={searchFechaEntrada}
            onChange={(e) => setSearchFechaEntrada(e.target.value)}
          />
        </Col>
        <Col sm={12} className="mt-2 d-flex justify-content-between">
          <Button variant="outline-secondary" onClick={() => {
            setSearch('');
            setSearchCategoria('');
            setSearchFechaEntrada('');
            handleGetProductos();
          }}>Limpiar filtros</Button>
          <Button variant="success" onClick={handleSearch}>Buscar</Button>
        </Col>
      </Row>

      <Row>
        {Array.isArray(productos) && productos.map(producto => (
          <Col key={producto._id} sm={6} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{producto.name}</Card.Title>
                <Card.Text>{producto.description}</Card.Text>
                <p>Precio: Q{producto.price}</p>
                <p>Stock: {producto.stock}</p>
                <p>
                  Proveedor: {
                    typeof producto.proveedor === 'object' && producto.proveedor !== null
                      ? producto.proveedor.name
                      : producto.proveedor || "Sin proveedor"
                  }
                </p>
                <p>
                  Categoría: {
                    typeof producto.categoria === 'object' && producto.categoria !== null
                      ? producto.categoria.name
                      : producto.categoria || "Sin categoría"
                  }
                </p>
                <div className="d-flex justify-content-end gap-2">
                  <Button size="sm" onClick={() => handleEdit(producto)}>Editar</Button>
                  <Button size="sm" variant="danger" onClick={() => setConfirmDeleteId(producto._id)}>Eliminar</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={Boolean(confirmDeleteId)} onHide={() => setConfirmDeleteId(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar este producto?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDeleteId(null)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
