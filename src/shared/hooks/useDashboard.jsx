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

export const useControl = () => {
    const navigate = useNavigate();
    const [control, setControl] = useState([]);

    const handleControl = async () => {
        try {
            navigate("/control", { state: { message: "Cargando control..." } });
        } catch (error) {
            console.error("Error al cargar control:", error);
        }
    };

    return { control, handleControl };
}

export const useCategories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const handleCategories = async () => {
        try {
            navigate("/categories", { state: { message: "Cargando categorias..." } });
        } catch (error) {
            console.error("Error al cargar categorias:", error);
        }
    };

    return { categories, handleCategories };

}