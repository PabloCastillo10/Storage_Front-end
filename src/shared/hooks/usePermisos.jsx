import { useState } from "react";
import { putRole, getByRoleUser } from "../../services/api";

export const usePermisos = () => {
    const [permisos, setPermisos] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handlePutRole = async (id, data) => {
        try {
            const response = await putRole(id, data);
            setSuccess("Rol actualizado correctamente");
            setError(null);
        } catch (err) {
            setError(err.response?.data?.msg || "Error al actualizar rol");
            setSuccess("");
        }
    };

    const handleGetByRoleUser = async (role) => {
        try {
            const users = await getByRoleUser(role);
            setPermisos(users);
            setError("");
        } catch (err) {
            setError(err.message);
            setPermisos([]);
        }
    };

    const limpiarFiltros = () => {
        setPermisos([]);
        setError("");
        setSuccess("");
    };

    return { permisos, error, success, handlePutRole, handleGetByRoleUser, limpiarFiltros };
};
