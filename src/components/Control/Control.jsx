import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useProductos } from "../../shared/hooks/useProductos";
import { useMovimientos } from "../../shared/hooks/useMovimientos";

const Control = () => {
  const today = new Date();
  const defaultDate = today.toISOString().split("T")[0]; // Formatea la fecha en YYYY-MM-DD
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const [producto, setProducto] = useState("");
  const [empleado, setEmpleado] = useState("");
  const [motivo, setMotivo] = useState("");
  const {
    user,
    movimientos,
    handleGetMovimientos,
    handleGetProdMovimientos,
    handleGetEmployees,
    handlePostEntrada,
    handlePostSalida,
    handlePutMovimiento,
  } = useMovimientos();
  const { productos, handleGetProductos } = useProductos();

  const [form, setForm] = useState({
    productoName: "",
    tipo: "",
    cantidad: "",
    fecha: defaultDate,
    empleado: "",
    motivo: "",
    destino: "",
  });

  const handleEmpleadoChange = (e) => {
    setEmpleado(e.target.value); // Guarda solo el uid
    setForm({ ...form, empleado: e.target.value });
  };

  const handleProductoChange = (e) => {
    const selectedProducto = e.target.value; // Obtiene el valor del producto seleccionado (probablemente _id)
    console.log("Producto seleccionado:", selectedProducto); // Verifica que esté tomando el valor correcto
    setForm({ ...form, productoName: selectedProducto }); // Actualiza el estado con el valor del producto seleccionado
    setProducto(selectedProducto); // Actualiza el estado de producto también
  };

  useEffect(() => {
    handleGetEmployees();
    handleGetMovimientos();
    handleGetProductos();
    handleGetProdMovimientos();
  }, []);

  const handleChange = (event, newValue) => {
    setTab(newValue);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          📦 Control de Entradas y Salidas de Productos
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          sx={{ mb: 2 }}
          onClick={() => navigate("/dashboard")}
        >
          ← Volver al Dashboard
        </Button>

        <Tabs value={tab} onChange={handleChange} centered>
          <Tab label="Entradas" />
          <Tab label="Salidas" />
          <Tab label="Historial" />
        </Tabs>

        {/* /------------------------------------------------------------------------------------------------/ */}

        {/* Entradas */}
        {tab === 0 && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Registrar Entrada
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel>Producto</InputLabel>
              <Select
                value={form.productoName}
                onChange={handleProductoChange}
                label="Producto"
              >
                {productos.map((prod) => (
                  <MenuItem key={prod._id} value={prod.name}>
                    {prod.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Cantidad añadida"
              type="number"
              margin="normal"
              value={form.cantidad}
              onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
            />

            <TextField
              fullWidth
              label="Fecha de salida"
              type="date"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={form.fecha} // Usamos el estado para el valor
              onChange={(e) => setForm({ ...form, fecha: e.target.value })} // Actualiza la fecha en el estado
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Empleado encargado</InputLabel>
              <Select value={empleado} onChange={handleEmpleadoChange} label="Empleado encargado">
                {user.map((emp) => {
                 return (
                    <MenuItem key={emp.uid} value={emp.name}>
                      {emp.name} {emp.surname}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              onClick={async () => {
                try {
                  await handlePostEntrada({
                    ...form,
                    tipo: "entrada",
                    motivo: form.motivo || "N/A",
                    destino: form.destino || "N/A"
                  });                  
                } catch (error) {
                  console.error("Error al registrar la entrada", error);
                }
              }}
            >
              Registrar Entrada
            </Button>
          </Box>
        )}

        {/* /------------------------------------------------------------------------------------------------/ */}

        {/* Salidas */}
        {tab === 1 && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Registrar Salida
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel>Producto</InputLabel>
              <Select
                value={form.productoName}
                onChange={handleProductoChange}
                label="Producto"
              >
                {productos.map((prod) => (
                  <MenuItem key={prod._id} value={prod.name}> 
                    {prod.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Cantidad añadida"
              type="number"
              margin="normal"
              value={form.cantidad}
              onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
            />
              
            <TextField
              fullWidth
              label="Fecha de entrada"
              type="date"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={form.fecha} // Usamos el estado para el valor
              onChange={(e) => setForm({ ...form, fecha: e.target.value })} // Actualiza la fecha en el estado
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Empleado encargado</InputLabel>
              <Select value={empleado} onChange={handleEmpleadoChange} label="Empleado encargado">
                {user.map((emp) => {
                  return (
                    <MenuItem key={emp.uid} value={emp.name}>
                      {emp.name} {emp.surname}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                value={form.motivo}
                onChange={(e) => setForm({ ...form, motivo: e.target.value })}
                label="Motivo"
                variant="outlined"
                fullWidth
              />
            </FormControl>

            <TextField
              fullWidth
              label="Destino"
              margin="normal"
              value={form.destino}
              onChange={(e) => setForm({ ...form, destino: e.target.value })}
            />

            <Button
              variant="contained" 
              color="error"
              sx={{ mt: 2 }}
              onClick={async () => {
                try {
                  await handlePostSalida({...form, tipo: 'salida'}); // Aquí llamas a tu hook para registrar la salida
                  // Resetear formulario o hacer algo tras éxito
                } catch (error) {
                  console.error("Error al registrar la salida", error);
                }
              }}
            >
              Registrar Salida
            </Button>
          </Box>
        )}

        {/* /------------------------------------------------------------------------------------------------/ */}

        {/* Historial */}
        {tab === 2 && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Historial de Movimientos
            </Typography>

            {movimientos.length === 0 ? (
              <Typography variant="body1" color="textSecondary">
                No hay registros aún.
              </Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: "#1976d2" }}>
                    <TableRow>
                      <TableCell sx={{ color: "#fff" }}>Tipo</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Producto</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Cantidad</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Fecha</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Empleado / Motivo</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Destino</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {movimientos.map((mov) => (
                      <TableRow key={mov._id}>
                        <TableCell>{mov.tipo}</TableCell>
                        <TableCell>{mov.producto}</TableCell>
                        <TableCell>{mov.cantidad}</TableCell>
                        <TableCell>{mov.fecha}</TableCell>
                        <TableCell>
                          {mov.empleado} / {mov.motivo}
                        </TableCell>
                        <TableCell>{mov.destino}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Control;
