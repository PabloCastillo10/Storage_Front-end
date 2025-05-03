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
import { logout as logoutHandler } from '../../shared/hooks/useLogout';
import { useClients } from '../../shared/hooks/useDashboard';
import { useProducts } from '../../shared/hooks/useDashboard';
import { useControl } from '../../shared/hooks/useDashboard';



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

  const sections = [
    { text: 'Gestión de Inventario', icon: <Inventory2OutlinedIcon  onClick={handleProducts}  />, onClick: handleProducts },
    { text: 'Entradas y Salidas de Productos', icon: <MoveToInboxOutlinedIcon  onClick={handleControl}  />, onClick: handleControl },
    { text: 'Proveedores y Clientes', icon: <GroupsOutlinedIcon  onClick={handleClients}  />, onClick: handleClients },
    { text: 'Informes y Estadísticas', icon: <BarChartOutlinedIcon /> },
    { text: 'Notificaciones y Alertas', icon: <NotificationsActiveOutlinedIcon /> },
  ];

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
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            {sections.map((section, index) => (
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
