import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, Toast } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { useInformes } from '../../shared/hooks/useInformes';
import {toast} from 'react-toastify';
import 'chart.js/auto';

const Informes = () => {
  const navigate = useNavigate();
  const {
    productos,
    movimientos,
    handleGetQuantityProducts,
    handleGetTotalProductStock,
    handleGetValueInventory,
    handleGetResumenMovimientos,
    handleGetEstadisticasProductos,
    handleGetCategorias,
    handleGetProductos,
    handleDescargarExcel,
    categorias,
  } = useInformes();

  useEffect(() => {
    handleGetQuantityProducts();
    handleGetResumenMovimientos();
    handleGetValueInventory();
    handleGetEstadisticasProductos();

  }, []);

  const [valorTotal, setValorTotal] = useState(0);
  const [filtroFecha, setFiltroFecha] = useState({ desde: '', hasta: '' });
  const [showToast, setShowToast] = useState(false);

  const handleCambioFecha = (e) => {
    setFiltroFecha({ ...filtroFecha, [e.target.name]: e.target.value });
  };

  

  const dataGrafica = {
    labels: productos.map((p) => p.nombre),
    datasets: [
      {
        label: 'Stock',
        data: productos.map((p) => p.stock),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  // Llamar funciones al cargar
  const handleCargarDatos = async () => {
    await handleGetQuantityProducts();
    await handleGetValueInventory().then((res) => {
      if (res?.total) setValorTotal(res.total);
    });
    await handleGetResumenMovimientos();
    await handleGetEstadisticasProductos();
  };

  // Cargar al entrar al componente
  useEffect(() => {
    handleCargarDatos();
    handleGetProductos();
    handleGetCategorias();
  }, []);

  return (
    <Container className="my-4">
      <Row className="mb-3">
        <Col>
          <Button variant="secondary" onClick={() => navigate('/dashboard')}>
            ← Volver al Dashboard
          </Button>
        </Col>
      </Row>

      <h2 className="mb-4">📋 Informes y Estadísticas</h2>

      {/* Informe de Inventario */}
      <Card className="mb-4 shadow-sm">
        <Card.Header as="h5">📦 Informe de Inventario</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Total de productos en stock:</strong> {productos.length}</p>
              <p><strong>Valor total del inventario:</strong> Q{valorTotal.toFixed(2)}</p>
            </Col>
          </Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(productos) && productos.map((p) => (
                <tr key={p._id}>
                  <td>{p.nombre}</td>
                  <td>{p.categoria?.name || p.categoria}</td>
                  <td>{p.stock}</td>
                  <td>Q{p.precio}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Informe de Movimientos */}
      <Card className="mb-4 shadow-sm">
        <Card.Header as="h5">🔁 Informe de Movimientos</Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Desde</Form.Label>
                <Form.Control type="date" name="desde" value={filtroFecha.desde} onChange={handleCambioFecha} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Hasta</Form.Label>
                <Form.Control type="date" name="hasta" value={filtroFecha.hasta} onChange={handleCambioFecha} />
              </Form.Group>
            </Col>
          </Row>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Tipo</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {movimientos
                .filter((m) => {
                  const fecha = new Date(m.fecha);
                  const desde = filtroFecha.desde ? new Date(filtroFecha.desde) : null;
                  const hasta = filtroFecha.hasta ? new Date(filtroFecha.hasta) : null;
                  return (!desde || fecha >= desde) && (!hasta || fecha <= hasta);
                })
                .map((m) => (
                  <tr key={m._id}>
                    <td>{new Date(m.fecha).toLocaleDateString()}</td>
                    <td>{m.producto.nombre}</td>
                    <td>{m.tipo}</td>
                    <td>{m.cantidad}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Estadísticas de Productos */}
      <Card className="mb-4 shadow-sm">
        <Card.Header as="h5">📈 Estadísticas de Productos</Card.Header>
        <Card.Body>
          <Bar data={dataGrafica} />
          <div className="mt-4 text-end">
            <Button variant="success" onClick={handleDescargarExcel}>
              📥 Descargar Excel
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Mensaje de éxito */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          minWidth: 250,
          backgroundColor: '#198754',
          color: 'white',
        }}
      >
        <Toast.Body>📁 ¡Archivo Excel descargado exitosamente!</Toast.Body>
      </Toast>
    </Container>
  );
};

export default Informes;
