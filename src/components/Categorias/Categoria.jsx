import {
    Box, Button, Container, IconButton, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, TextField, Typography
  } from "@mui/material";
  import AddIcon from "@mui/icons-material/Add";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import ClearIcon from "@mui/icons-material/Clear";
  import { useEffect, useState } from "react";
  import { useCategorias } from "../../shared/hooks/useCategorias";
  import { useNavigate } from "react-router-dom";
  import { validarCategoria } from "../../shared/validations/validationCategories";
  import {Alert, Collapse} from "@mui/material"
  
  const Categorias = () => {
    const {
      categorias,
      handleGetCategorias,
      handlePostCategorias,
      handleDeleteCategorias,
      handlePutCategorias,
      handleSearchCategoriaName,
    } = useCategorias();
  
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      handleGetCategorias();
    }, []);

    const [alerta, setAlerta] = useState({ mensaje: "", tipo: "" });
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const error = validarCategoria(formData, categorias, editingId);
        if (error) {
          setAlerta({ mensaje: error, tipo: "error" });
          setMostrarAlerta(true);
          return;
        }
      
        if (editingId) {
          await handlePutCategorias(editingId, formData);
          setAlerta({ mensaje: "Categoría actualizada correctamente.", tipo: "info" });
          setEditingId(null);
        } else {
          await handlePostCategorias(formData);
          setAlerta({ mensaje: "Categoría agregada exitosamente.", tipo: "success" });
        }
      
        setMostrarAlerta(true);
        setFormData({ name: "", description: "" });
        handleGetCategorias();
      };
  
    const handleEdit = (categoria) => {
      setFormData({ name: categoria.name, description: categoria.description });
      setEditingId(categoria._id);
    };
  
    const handleSearch = () => {
      if (searchTerm.trim() !== "") {
        handleSearchCategoriaName(searchTerm);
      } else {
        handleGetCategorias();
      }
    };
  
    const handleClearSearch = () => {
      setSearchTerm("");
      handleGetCategorias();
    };
  
    return (
        
      <Container maxWidth="md">
        <Collapse in={mostrarAlerta}>
            <Alert
                severity={alerta.tipo}
                variant="filled"
                sx={{ mb: 2 }}
                onClose={() => setMostrarAlerta(false)}
            >
            {alerta.mensaje}
            </Alert>
        </Collapse>
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={4} mb={2}>
          <Typography variant="h4">Gestión de Categorías</Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/dashboard")}
          >
            Volver al Dashboard
          </Button>
        </Box>
  
        <Box
          component="form"
          onSubmit={handleSubmit}
          mb={4}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
        >
          <TextField
            name="name"
            label="Nombre"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="description"
            label="Descripción"
            value={formData.description}
            onChange={handleChange}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color={editingId ? "warning" : "primary"}
            startIcon={<AddIcon />}
          >
            {editingId ? "Actualizar" : "Agregar"}
          </Button>
        </Box>
  
        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Buscar por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
          <Button variant="outlined" onClick={handleSearch}>
            Buscar
          </Button>
          <Button variant="text" onClick={handleClearSearch} startIcon={<ClearIcon />}>
            Limpiar
          </Button>
        </Box>
  
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                <TableCell sx={{ color: "white" }}>Descripción</TableCell>
                <TableCell sx={{ color: "white" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(categorias) && categorias.map((categoria) => (
                <TableRow key={categoria._id}>
                  <TableCell>{categoria.name}</TableCell>
                  <TableCell>{categoria.description}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(categoria)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteCategorias(categoria._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {categorias.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No hay categorías para mostrar
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  };
  
  export default Categorias;
  