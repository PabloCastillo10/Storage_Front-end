import React, { useEffect, useState } from "react";
import { useMyAccountEdit } from "../../shared/hooks/useMyAccountEdit";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Snackbar, Alert } from "@mui/material";

import {
  
  camposObligatorios,
  phoneLength,
  passwordLength,
} from "../../shared/validations/validationMyAccount";

const MyAccountEdit = () => {
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessages, setAlertMessages] = useState([]);
  
  const {
    user,
    handlePutUser,
  } = useMyAccountEdit();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    phone: "",
    currentPassword: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        surname: user.surname || "",
        username: user.username || "",
        phone: user.phone || "",
        currentPassword:  "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showAlert = (type, messages) => {
    setAlertType(type);
    setAlertMessages(Array.isArray(messages) ? messages : [messages]);
    setAlertOpen(true);
  };

  const handleSubmit = async (e) => {
    console.log("Password", formData.currentPassword);
    e.preventDefault();

    try {
      camposObligatorios(formData);
      phoneLength(formData.phone);
      passwordLength(formData.password);

      const updatedData = {
        name: formData.name,
        surname: formData.surname,
        username: formData.username,
        phone: formData.phone,
        currentPassword: formData.currentPassword,
        ...(formData.password && { password: formData.password }),
      };

      await handlePutUser(formData, updatedData);

      showAlert("success", "Cuenta actualizada correctamente.");
    } catch (error) {
      const messages = "La contraseña actual es incorrecta" || [error.message];
      showAlert("error", messages);
    }
  };

  return (
    <>
     
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {alertMessages.map((msg, i) => (
            <div key={i}>{msg}</div>
          ))}
        </Alert>
      </Snackbar>

      {/* 🧾 Formulario */}
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Editar Cuenta</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña Actual</label>
                <input
                  type="password"
                  className="form-control"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Nueva Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-success me-2">
                  Actualizar
                </button>
                <Button variant="secondary" onClick={() => navigate("/dashboard")}>
                  ← Regresar a Dashboard
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccountEdit;
