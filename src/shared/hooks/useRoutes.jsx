
import { useRoutes } from "react-router-dom";
import Login from "../../components/Login.jsx";
import Register from "../../components/Register.jsx"
import Dashboard from "../../components/Dashboard/Dashboard.jsx";
import ProveedoresClientes from "../../components/Dashboard/Dashboard.jsx";
import { Products } from "../../components/productos/Productos.jsx";
import Control from "../../components/Control/Control.jsx";
import Categorias from "../../components/Categorias/Categoria.jsx";
import Informes from "../../components/Informes/Informes.jsx";
import MyAccountEdit from "../../components/MyAccount/MyAccountEdit.jsx";
import Permisos from "../../components/Permisos/Permisos.jsx";
import PrivateRoute from "../../components/PrivateRoute.jsx";


export const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },
    {
      path: "/clients",
      element: (
        <PrivateRoute>
          <ProveedoresClientes />
        </PrivateRoute>
      ),
    },
    {
      path: "/products",
      element: (
        <PrivateRoute>
          <Products />
        </PrivateRoute>
      ),
    },
    {
      path: "/control",
      element: (
        <PrivateRoute>
          <Control />
        </PrivateRoute>
      ),
    },
    {
      path: "/categories",
      element: (
        <PrivateRoute>
          <Categorias />
        </PrivateRoute>
      ),
    },
    {
      path: "/informes",
      element: (
        <PrivateRoute>
          <Informes />
        </PrivateRoute>
      ),
    },
    {
      path: "/myAccount",
      element: (
        <PrivateRoute>
          <MyAccountEdit />
        </PrivateRoute>
      ),
    },
    {
      path: "/permisos",
      element: (
        <PrivateRoute>
          <Permisos />
        </PrivateRoute>
      ),
    },
  ]);

  return routes;
};
