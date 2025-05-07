import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useInformes } from '../../shared/hooks/useInformes';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Informes = () => {
  const navigate = useNavigate();
  const {
    productos,
    movimientos,
    totalMovimientos,
    estadisticas,
    totalEstadisticas,
    valorTotal,
    cantidadTotal,
    handleGetQuantityProducts,
    handleGetEstadisticasProductos,
    handleGetTotalProductStock,
    handleGetResumenMovimientos,
    handleGetValueInventory
  } = useInformes();

  const [tipoMovimiento, setTipoMovimiento] = useState("entrada");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  useEffect(() => {
    handleGetQuantityProducts();
    handleGetTotalProductStock();
    handleGetValueInventory();
    handleGetEstadisticasProductos();
  }, []);
  
  const handleDownloadExcel = async () => {
    try {
      const response = await fetch("http://localhost:3000/almacenadora/informe/estadisticas");
      const blob = await response.blob();
  
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "estadisticas_productos.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };


  const chartData = {
    labels: estadisticas.map((stat) => stat.producto),
    datasets: [
      {
        label: "Total Movimientos",
        data: estadisticas.map((stat) => stat.totalMovimientos),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const handleFetchMovimientos = () => {
    if (fechaDesde && fechaHasta) {
      handleGetResumenMovimientos(tipoMovimiento, fechaDesde, fechaHasta);
    } else {
      alert("Por favor, selecciona un rango de fechas.");
    }
  };

  return (
    <Container className="my-4">
      <Row className="mb-3">
        <Col>
          <Button variant="secondary" onClick={() => navigate('/dashboard')}>
            ← Volver al Dashboard
          </Button>
        </Col>
      </Row>

      <h2 className="mb-4">📋 Informe de Inventario</h2>

      <Card className="mb-4 shadow-sm">
        <Card.Header as="h5">📦 Resumen del Inventario</Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <Card bg="light" className="p-3 text-center">
                <h6>Total de Productos en Stock</h6>
                <h4>{cantidadTotal}</h4>
              </Card>
            </Col>
            <Col md={4}>
              <Card bg="light" className="p-3 text-center">
                <h6>Valor Total del Inventario</h6>
                <h4>Q{valorTotal.toFixed(2)}</h4>
              </Card>
            </Col>
          </Row>

          <h5>📑 Detalle por Producto</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(productos) && productos.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.stock}</td>
                </tr>
              ))}
              {productos.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center">No hay productos para mostrar</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Card className="mb-4 shadow-sm">
        <Card.Header as="h5">📦 Resumen de Movimientos</Card.Header>
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Tipo de Movimiento</Form.Label>
                  <Form.Select
                    value={tipoMovimiento}
                    onChange={(e) => setTipoMovimiento(e.target.value)}
                  >
                    <option value="entrada">Entrada</option>
                    <option value="salida">Salida</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Desde</Form.Label>
                  <Form.Control
                    type="date"
                    value={fechaDesde}
                    onChange={(e) => setFechaDesde(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Hasta</Form.Label>
                  <Form.Control
                    type="date"
                    value={fechaHasta}
                    onChange={(e) => setFechaHasta(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" onClick={handleFetchMovimientos}>
              Buscar Movimientos
            </Button>
          </Form>

          <h5 className="mt-4">📑 Detalle de Movimientos</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Producto</th>
                <th>Empleado</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(movimientos) &&
                movimientos.map((mov, index) => (
                  <tr key={index}>
                    <td>{new Date(mov.fecha).toLocaleDateString()}</td>
                    <td>{mov.tipo}</td>
                    <td>{mov.cantidad}</td>
                    <td>{mov.producto}</td>
                    <td>{mov.empleado}</td>
                  </tr>
                ))}
              {movimientos.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No hay movimientos para mostrar
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm">
        <Card.Header as="h5">📊 Estadísticas de Productos</Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Button variant="success" onClick={handleDownloadExcel}>
                Descargar Excel
              </Button>
            </Col>
          </Row>

          <h5>📈 Gráfico de Productos Más Movidos</h5>
          <Bar data={chartData} />

          <h5 className="mt-4">📑 Detalle de Estadísticas</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Stock</th>
                <th>Entradas</th>
                <th>Salidas</th>
                <th>Total Movimientos</th>
                <th>Primera Fecha</th>
                <th>Última Fecha</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(estadisticas) &&
                estadisticas.map((stat, index) => (
                  <tr key={index}>
                    <td>{stat.producto}</td>
                    <td>{stat.stock}</td>
                    <td>{stat.entradas}</td>
                    <td>{stat.salidas}</td>
                    <td>{stat.totalMovimientos}</td>
                    <td>{new Date(stat.primeraFecha).toLocaleDateString()}</td>
                    <td>{new Date(stat.ultimaFecha).toLocaleDateString()}</td>
                  </tr>
                ))}
              {estadisticas.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    No hay estadísticas para mostrar
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Informes;
