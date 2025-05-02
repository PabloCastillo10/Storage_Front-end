import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  Box,
  Grid
} from "@mui/material";

import { useNavigate } from "react-router-dom";


const mockProductos = [
  { _id: "1", nombre: "Producto A" },
  { _id: "2", nombre: "Producto B" },
  { _id: "3", nombre: "Producto C" },
];

const ProveedoresClientes = () => {
  const navigate = useNavigate();

  const [proveedor, setProveedor] = useState({
    name: "",
    contact: "",
    products: [],
  });

  const [cliente, setCliente] = useState({
    name: "",
    contact: "",
    products: [],
  });

  const [alert, setAlert] = useState({ open: false, message: "", type: "success" });

  const handleProveedorChange = (e) => {
    const { name, value } = e.target;
    setProveedor({ ...proveedor, [name]: value });
  };

  const handleClienteChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleGuardarProveedor = () => {
    console.log("Proveedor guardado:", proveedor);
    setAlert({ open: true, message: "¡Proveedor guardado con éxito!", type: "success" });
  };

  const handleGuardarCliente = () => {
    console.log("Cliente guardado:", cliente);
    setAlert({ open: true, message: "¡Cliente guardado con éxito!", type: "success" });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom color="white">Gestión de Proveedores y Clientes</Typography>

      <Grid container spacing={4}>
        {/* Formulario Proveedor */}
        <Grid xs={12} md={6}>
          <Typography variant="h6" color="white">Registrar Proveedor</Typography>
          <TextField
            color="white"
            label="Nombre"
            name="name"
            value={proveedor.name}
            onChange={handleProveedorChange}
            fullWidth
            margin="normal"
          />
          <TextField
            color="white"
            label="Contacto"
            name="contact"
            value={proveedor.contact}
            onChange={handleProveedorChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal" >
            <InputLabel>Producto</InputLabel>
            <Select
              name="products"
              value={proveedor.products}
              onChange={(e) =>
                setProveedor({ ...proveedor, products: [e.target.value] })
              }
            >
              {mockProductos.map((prod) => (
                <MenuItem key={prod._id} value={prod._id}>
                  {prod.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleGuardarProveedor}>Guardar Proveedor</Button>
        </Grid>

        {/* Formulario Cliente */}
        <Grid xs={12} md={6}>
          <Typography variant="h6">Registrar Cliente</Typography>
          <TextField
            label="Nombre"
            name="name"
            value={cliente.name}
            onChange={handleClienteChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contacto"
            name="contact"
            value={cliente.contact}
            onChange={handleClienteChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Producto</InputLabel>
            <Select
              name="products"
              value={cliente.products}
              onChange={(e) =>
                setCliente({ ...cliente, products: [e.target.value] })
              }
            >
              {mockProductos.map((prod) => (
                <MenuItem key={prod._id} value={prod._id}>
                  {prod.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleGuardarCliente}>Guardar Cliente</Button>
        </Grid>

        {/* Botón regresar */}
        <Grid xs={12}>
          <Button variant="outlined" color="red" onClick={() => navigate("/dashboard")} sx={{ mt: 4 }}>
            Volver al Dashboard
          </Button>
        </Grid>
      </Grid>

      {/* Alerta de éxito */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.type} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProveedoresClientes;
