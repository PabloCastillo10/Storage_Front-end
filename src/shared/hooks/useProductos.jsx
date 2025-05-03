import { useState } from "react";
import { getProductos, postProductos, deleteProductos, putProductos, searchProductos, getProductosById, getCategorias, getProveedores } from "../../services/api";


export const useProductos = () => {
 
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    const handleGetProductos = async () => {
        try {
            const res = await getProductos();
            console.log(res)
            setProductos(res.productos || []);
        } catch (error) {   
            console.error("Error al obtener productos:", error);
        }
    };

    const handleGetCategorias = async () => {
        try {
            const response = await getCategorias();
            console.log(response)
            setCategorias(response.categorias || []);
        } catch (error) {   
            console.error("Error al obtener categorias:", error);
        }
    };

    const handleGetProveedores = async () => {
        try {
            const response = await getProveedores();
            console.log(response)
            setProveedores(response.proveedores || []);
        } catch (error) {   
            console.error("Error al obtener proveedores:", error);
        }
    };

    const handlePostProductos = async (data) => {
        try {
            await postProductos(data);
        } catch (error) {
            console.error("Error al crear producto:", error.response?.data || error.message);
        }
    };

    const handleDeleteProductos = async (id) => {
        try {
            const response = await deleteProductos(id);
            setProductos(productos.filter((producto) => producto._id !== id));
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    const handlePutProductos = async (id, data) => {
        try {
            const response = await putProductos(id, data);
            setProductos(productos.map((producto) => (producto._id === id ? response : producto)));
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    };

    const handleSearchProductos = async (query) => {
        try {
            const response = await searchProductos(query);
            setProductos(response);
        } catch (error) {
            console.error("Error al buscar productos:", error);
        }
    };

    const handleGetProductosById = async (id) => {
        try {
            const response = await getProductosById(id);
            setProductos(productos.map((producto) => (producto._id === id ? response : producto)));
        } catch (error) {
            console.error("Error al obtener producto:", error);
        }
    };

    return { productos, handleGetProductos, handlePostProductos, handleDeleteProductos, handlePutProductos, handleSearchProductos, handleGetProductosById, categorias, proveedores, handleGetCategorias, handleGetProveedores };
    
}