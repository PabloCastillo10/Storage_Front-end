import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import OutboxOutlinedIcon from '@mui/icons-material/OutboxOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CategoryIcon from '@mui/icons-material/Category';
import { logout as logoutHandler } from '../../shared/hooks/useLogout';
import { useClients } from '../../shared/hooks/useDashboard';
import { useProducts } from '../../shared/hooks/useDashboard';
import { useControl } from '../../shared/hooks/useDashboard';
import { useCategories } from '../../shared/hooks/useDashboard';
import { useInformes } from '../../shared/hooks/useDashboard';
import { useMyAccount } from '../../shared/hooks/useDashboard';
import { usePermisos } from '../../shared/hooks/useDashboard';
import { useLogin } from '../../shared/hooks/useLogin';
import { useProductos } from '../../shared/hooks/useProductos';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Slide,
  Box,
  Divider,
  Button
} from '@mui/material';

export default function Dashboard() {
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { clients, handleClients } = useClients();
  const { products, handleProducts } = useProducts();
  const { control, handleControl } = useControl();
  const { categories, handleCategories } = useCategories();
  const { informes, handleInformes } = useInformes();
  const { myAccount, handleMyAccount } = useMyAccount();
  const { permisos, handlePermisos } = usePermisos();
  const [alerta, setAlerta] = useState(null);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [productosBajoStock, setProductosBajoStock] = useState([]);
  const {handleGetProductosByStock} = useProductos();
const user = JSON.parse(localStorage.getItem('user')) 


useEffect(() => {
  const fetchProductos = async () => {
    try {
      const bajoStock = await handleGetProductosByStock();

      if (bajoStock.length > 0) {
        setAlerta({
          mensaje: `¡Atención! Hay productos con bajo stock: ${bajoStock.map(p => p.name).join(", ")}`,
          tipo: "warning"
        });
        setMostrarAlerta(true);
        setProductosBajoStock(bajoStock);
      }
    } catch (error) {
      console.log(error);
    }
  };
  fetchProductos();
}, []);

useEffect(() => {
  if (mostrarAlerta) {
    const timer = setTimeout(() => {
      setMostrarAlerta(false);
    }, 6000); // ⏱️ se oculta en 6 segundos

    return () => clearTimeout(timer); // Limpieza
  }
}, [mostrarAlerta]);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  useEffect(() => {
    if (location.state?.message) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  }, [location.state]);
  const handleLogout = () => {
    logoutHandler()
    navigate('/')
  }
 const employeeSections = [
  { text: 'Entradas y Salidas de Productos', icon: <MoveToInboxOutlinedIcon onClick={handleControl} />, onClick: handleControl }
 ]
  const adminSections = [
    { text: 'Gestión de Inventario', icon: <Inventory2OutlinedIcon onClick={handleProducts} />, onClick: handleProducts },
    { text: 'Entradas y Salidas de Productos', icon: <MoveToInboxOutlinedIcon onClick={handleControl} />, onClick: handleControl },
    { text: 'Proveedores y Clientes', icon: <GroupsOutlinedIcon onClick={handleClients} />, onClick: handleClients },
    { text: 'Informes y Estadísticas', icon: <BarChartOutlinedIcon onClick={handleInformes} />, onClick: handleInformes },
    { text: 'Notificaciones y Alertas', icon: <NotificationsActiveOutlinedIcon /> },
    { text: 'Gestión de Categorías', icon: <CategoryIcon onClick={handleCategories} />, onClick: handleCategories },
  ]
  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mi Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar sesión
          </Button>
          <Button color="inherit" onClick={handleMyAccount}>
            Mi cuenta
          </Button>
          {user?.role === 'ADMIN' && (
          <Button color="inherit" onClick={handlePermisos}>
            Permisos
            </Button> )}
        </Toolbar>
      </AppBar>

      {mostrarAlerta && (
  <Slide direction="down" in={mostrarAlerta} mountOnEnter unmountOnExit>
    <Box
      sx={{
        position: 'fixed',
        top: 80,
        right: 20,
        zIndex: 1500,
        minWidth: 300,
      }}
    >
      <Alert
        severity="warning"
        variant="filled"
        onClose={() => setMostrarAlerta(false)}
      >
        <strong>{alerta?.mensaje}</strong>
        <ul style={{ marginTop: 10 }}>
          {productosBajoStock.map(p => (
            <li key={p._id}>{p.name} - Stock: {p.stock}</li>
          ))}
        </ul>
      </Alert>
    </Box>
  </Slide>
)}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
          {(user?.role === 'ADMIN' ? adminSections : employeeSections).map((section, index) => (
              <ListItem 
              key={index} 
              button="true" 
              onClick={section.onClick} 
              component="div"
              sx={{ cursor: 'pointer' }}
            >
              <ListItemIcon>{section.icon}</ListItemIcon>
              <ListItemText primary={section.text} />
            </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido al Dashboard
        </Typography>
        <Typography variant="body1">
          HOLA
        </Typography>
      </Box>
      {showAlert && (
        <Slide direction="up" in={showAlert} mountOnEnter unmountOnExit>
          <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
            <Alert variant="filled" severity="success">
              Inicio de sesión exitoso
            </Alert>
          </div>
        </Slide>
      )}
    </Box>
  );
}
