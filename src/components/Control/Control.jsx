import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Box,Button,Container,Tab,Tabs,TextField,Typography,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Select,MenuItem,InputLabel,FormControl,} from "@mui/material";
import { useProductos } from "../../shared/hooks/useProductos";
import {useMovimientos} from "../../shared/hooks/useMovimientos"

const Control = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [producto, setProducto] = useState("");
  const [empleado, setEmpleado] = useState("");
  const [motivo, setMotivo] = useState("");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  // Simulando datos de ejemplo
  const productos = ["Laptop", "Monitor", "Teclado", "Mouse"];
  const empleados = ["María Pérez", "Carlos Gómez", "Ana Martínez"];
  const motivos = ["Préstamo", "Venta", "Reparación", "Donación"];

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

        {/* Entradas */}
        {tab === 0 && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Registrar Entrada
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel>Producto</InputLabel>
              <Select value={producto} onChange={(e) => setProducto(e.target.value)} label="Producto">
                {productos.map((prod) => (
                  <MenuItem key={prod} value={prod}>
                    {prod}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField fullWidth label="Cantidad añadida" type="number" margin="normal" />
            <TextField fullWidth label="Fecha de entrada" type="date" margin="normal" InputLabelProps={{ shrink: true }} />

            <FormControl fullWidth margin="normal">
              <InputLabel>Empleado encargado</InputLabel>
              <Select value={empleado} onChange={(e) => setEmpleado(e.target.value)} label="Empleado encargado">
                {empleados.map((emp) => (
                  <MenuItem key={emp} value={emp}>
                    {emp}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" color="success" sx={{ mt: 2 }}>
              Registrar Entrada
            </Button>
          </Box>
        )}

        {/* Salidas */}
        {tab === 1 && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Registrar Salida
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel>Producto</InputLabel>
              <Select value={producto} onChange={(e) => setProducto(e.target.value)} label="Producto">
                {productos.map((prod) => (
                  <MenuItem key={prod} value={prod}>
                    {prod}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField fullWidth label="Cantidad retirada" type="number" margin="normal" />
            <TextField fullWidth label="Fecha de salida" type="date" margin="normal" InputLabelProps={{ shrink: true }} />

            <FormControl fullWidth margin="normal">
              <InputLabel>Motivo</InputLabel>
              <Select value={motivo} onChange={(e) => setMotivo(e.target.value)} label="Motivo">
                {motivos.map((mot) => (
                  <MenuItem key={mot} value={mot}>
                    {mot}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField fullWidth label="Destino" margin="normal" />
            <Button variant="contained" color="error" sx={{ mt: 2 }}>
              Registrar Salida
            </Button>
          </Box>
        )}

        {/* Historial */}
        {tab === 2 && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Historial de Movimientos
            </Typography>
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
                  <TableRow>
                    <TableCell>Entrada</TableCell>
                    <TableCell>Laptop</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>2025-05-01</TableCell>
                    <TableCell>María Pérez</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Salida</TableCell>
                    <TableCell>Laptop</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>2025-05-02</TableCell>
                    <TableCell>Préstamo a oficina B</TableCell>
                    <TableCell>Oficina B</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Control;
