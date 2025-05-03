import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const useClients = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);

    const handleClients = async () => {
        try {
            navigate("/clients", { state: { message: "Cargando clientes y Proveedores..." } });
           
        } catch (error) {
            console.error("Error al cargar clientes:", error);
        }
    };
    return { clients, handleClients };
}

export const useProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const handleProducts = async () => {
        try {
            navigate("/products", { state: { message: "Cargando productos..." } });
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    };

    return { products, handleProducts };
}