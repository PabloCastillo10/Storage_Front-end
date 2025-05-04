import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import ProveedoresClientes from "./components/Proveedores y Clientes/ProveedorClientes.jsx";
import {Products} from "./components/productos/Productos.jsx";
import Control from "./components/Control/Control.jsx";
import Categorias from "./components/Categorias/Categoria.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';







ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ToastContainer 
         position="bottom-right"
         autoClose={3000}
         hideProgressBar={false}
         newestOnTop
         closeOnClick
         pauseOnHover
         draggable
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<ProveedoresClientes />} />
          <Route path="/products" element={<Products />} />
          <Route path="/control" element={<Control />} />
          <Route path="/categories" element={<Categorias />} />
        </Routes>
      </BrowserRouter>

  </React.StrictMode>
);
