import { useState } from "react";
import { postProveedores, postClientes, getProductos } from "../../services/api";

export const useClienteProveedor = () => {
    const [proveedor, setProveedor] = useState({
        name: "",
        contact: "",
        products: [],
      });
      
      const [cliente, setCliente] = useState({
        name: "",
        contact: "",
        products: [],
      });
    const [productos, setProductos] = useState([]);

    const handleGetProductos = async () => {
        try {
            const res = await getProductos();
            console.log(res)
            setProductos(res.productos || []);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    const handlePostProveedores = async (data) => {
        try {
             await postProveedores(data);

        } catch (error) {
            console.error("Error al crear proveedor:", error.response?.data || error.message);
                
        }
    };

    const handlePostClientes = async (data) => {
        try {
             await postClientes(data);
        } catch (error) {
            console.error("Error al crear cliente:", error.response?.data || error.message);
        }
    };

    return { proveedor, setProveedor, handlePostProveedores, cliente, setCliente, handlePostClientes, productos, handleGetProductos };
}