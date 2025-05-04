import { useState } from "react";
import { postEntrada,postSalida,getMovimientos,putMovimiento, getProductos, getUsers } from "../../services/api";

export const useMovimientos = () =>{

    const [movimientos, setMoviemientos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [user, setUser] = useState([])

    const handlePostEntrada = async (data) => {
        try {
            await postEntrada(data);
        } catch (error) {
            console.error("Error al crear entrada:", error.response?.data || error.message);
        }
    }

    const handlePostSalida = async (data) => {
        try {
            await postSalida(data);
        } catch (error) {
            console.error("Error al crear salida:", error.response?.data || error.message);
        }
    }
    
    const handleGetUsers = async () => {
        try {
            const response = await getUsers();
            console.log(response)
            setUser(response.user||[])
        } catch (error) {
            console.error("Error al obtener el empleado:", error.response?.data || error.message)
        }
    }
    
    const handleGetProductos = async () => {
        try {
            const res = await getProductos();
            console.log(res)
            setProductos(res.productos || []);
        } catch (error) {   
            console.error("Error al obtener productos:", error);
        }
    };

    const handleGetMovimientos = async () => {
        try {
            const response = await getMovimientos();
        } catch (error) {
            console.error("Error al crear producto:", error.response?.data || error.message);
        }
    }

    const handlePutMovimiento = async (id, data) => {
        try {
            const response = await putMovimiento(id,data);
            setMoviemientos(movimientos.map((movimiento)=>(movimiento._id===id? response: movimiento)))
        } catch (error) {
            console.error("Error al actualizar movimiento: ", error.message)   
        }
    }


    return {movimientos,handleGetProductos, handleGetMovimientos, handlePostEntrada, handlePostSalida, handlePutMovimiento};
}