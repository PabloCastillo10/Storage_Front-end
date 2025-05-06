import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useClienteProveedor } from "../../shared/hooks/useClienteProveedor";
import { useNavigate } from "react-router-dom";
import {
  nombreClienteValidation,
  nombreProveedorValidation,
  contactoValidation,
  productoAsignadoValidation,
} from "../../shared/validations/validationClienteProveedor";
import "bootstrap/dist/css/bootstrap.min.css";

const ProveedoresClientes = () => {
  const navigate = useNavigate();
  const {
    handlePostProveedores,
    handlePostClientes,
    productos,
    handleGetProductos,
  } = useClienteProveedor();

  const {
    register: registerProveedor,
    handleSubmit: handleSubmitProveedor,
    formState: { errors: errorsProveedor },
    reset: resetProveedor,
  } = useForm();

  const {
    register: registerCliente,
    handleSubmit: handleSubmitCliente,
    formState: { errors: errorsCliente },
    reset: resetCliente,
  } = useForm();

  const [alerta, setAlerta] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    handleGetProductos();
  }, []);

  const onSubmitProveedor = async (data) => {
    try {
      const proveedorData = {
        ...data,
        products: [data.products],
      };
      await handlePostProveedores(proveedorData);
      setAlerta({ show: true, message: "¡Proveedor guardado con éxito!", type: "success" });
      resetProveedor();
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitCliente = async (data) => {
    try {
      const clienteData = {
        ...data,
        products: [data.products],
      };
      await handlePostClientes(clienteData);
      setAlerta({ show: true, message: "¡Cliente guardado con éxito!", type: "success" });
      resetCliente();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5 bg-light p-4 rounded shadow">
      <h2 className="mb-4">📇 Gestión de Proveedores y Clientes</h2>

      {alerta.show && (
        <div className={`alert alert-${alerta.type} alert-dismissible fade show`} role="alert">
          {alerta.message}
          <button type="button" className="btn-close" onClick={() => setAlerta({ ...alerta, show: false })}></button>
        </div>
      )}

      <div className="row">
        {/* PROVEEDOR */}
        <div className="col-md-6">
          <h4>Registrar Proveedor</h4>
          <form onSubmit={handleSubmitProveedor(onSubmitProveedor)}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                {...registerProveedor("name", nombreProveedorValidation)}
                className={`form-control ${errorsProveedor.name ? "is-invalid" : ""}`}
                placeholder="Nombre del proveedor"
              />
              {errorsProveedor.name && <div className="invalid-feedback">{errorsProveedor.name.message}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Contacto</label>
              <input
                type="text"
                {...registerProveedor("contact", contactoValidation)}
                className={`form-control ${errorsProveedor.contact ? "is-invalid" : ""}`}
                placeholder="Contacto del proveedor"
              />
              {errorsProveedor.contact && <div className="invalid-feedback">{errorsProveedor.contact.message}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Producto</label>
              <select
                {...registerProveedor("products")}
                className={`form-select ${errorsProveedor.products ? "is-invalid" : ""}`}
              >
                <option value="">Seleccione un producto</option>
                {Array.isArray(productos) &&
                  productos.map((prod) => (
                    <option key={prod._id} value={prod.name}>
                      {prod.name}
                    </option>
                  ))}
              </select>
              {errorsProveedor.products && (
                <div className="invalid-feedback">{errorsProveedor.products.message}</div>
              )}
            </div>

            <button className="btn btn-success" type="submit">
              Guardar Proveedor
            </button>
          </form>
        </div>

        {/* CLIENTE */}
        <div className="col-md-6">
          <h4>Registrar Cliente</h4>
          <form onSubmit={handleSubmitCliente(onSubmitCliente)}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                {...registerCliente("name", nombreClienteValidation)}
                className={`form-control ${errorsCliente.name ? "is-invalid" : ""}`}
                placeholder="Nombre del cliente"
              />
              {errorsCliente.name && <div className="invalid-feedback">{errorsCliente.name.message}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Contacto</label>
              <input
                type="text"
                {...registerCliente("contact", contactoValidation)}
                className={`form-control ${errorsCliente.contact ? "is-invalid" : ""}`}
                placeholder="Contacto del cliente"
              />
              {errorsCliente.contact && <div className="invalid-feedback">{errorsCliente.contact.message}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Producto</label>
              <select
                {...registerCliente("products", productoAsignadoValidation)}
                className={`form-select ${errorsCliente.products ? "is-invalid" : ""}`}
              >
                <option value="">Seleccione un producto</option>
                {Array.isArray(productos) &&
                  productos.map((prod) => (
                    <option key={prod._id} value={prod.name}>
                      {prod.name}
                    </option>
                  ))}
              </select>
              {errorsCliente.products && (
                <div className="invalid-feedback">{errorsCliente.products.message}</div>
              )}
            </div>

            <button className="btn btn-primary" type="submit">
              Guardar Cliente
            </button>
          </form>
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-outline-secondary" onClick={() => navigate("/dashboard")}>
          ← Volver al Dashboard
        </button>
      </div>
    </div>
  );
};

export default ProveedoresClientes;
