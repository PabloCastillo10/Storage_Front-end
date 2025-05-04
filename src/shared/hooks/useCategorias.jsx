import { useState } from "react";
import { getCategorias, postCategorias, deleteCategorias, putCategorias, searchCategoriaName } from "../../services/api";


export const useCategorias = () => {
 
    const [categorias, setCategorias] = useState([]);
    

    const handleGetCategorias = async () => {
        try {
            const response = await getCategorias();
            console.log(response)
            setCategorias(response.categorias || []);
        } catch (error) {   
            console.error("Error al obtener categorias:", error);
        }
    };

    const handlePostCategorias = async (data) => {
        try {
            await postCategorias(data);
        } catch (error) {
            console.error("Error al crear categoria:", error.response?.data || error.message);
        }
    };

    const handleDeleteCategorias = async (id) => {
        try {
            const response = await deleteCategorias(id);
            setCategorias(categorias.filter((categoria) => categoria._id !== id));
        } catch (error) {
            console.error("Error al eliminar categoria:", error);
        }
    };

    const handlePutCategorias = async (id, data) => {
        try {
            const response = await putCategorias(id, data);
            setCategorias(categorias.map((categoria) => (categoria._id === id ? response : categoria)));
        } catch (error) {
            console.error("Error al actualizar categoria:", error);
        }
    };

    const handleSearchCategoriaName = async (name) => {
        try {
            const response = await searchCategoriaName(name);
            setCategorias(response ? [response] : []);
        } catch (error) {
            console.error("Error al buscar categoria:", error);
        }
    };

    return { categorias, handleGetCategorias, handlePostCategorias, handleDeleteCategorias, handlePutCategorias, handleSearchCategoriaName };
    
}