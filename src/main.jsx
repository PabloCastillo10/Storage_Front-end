import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import ProveedoresClientes from "./components/Proveedores y Clientes/ProveedoresClientes";






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
        </Routes>
      </BrowserRouter>

  </React.StrictMode>
);
