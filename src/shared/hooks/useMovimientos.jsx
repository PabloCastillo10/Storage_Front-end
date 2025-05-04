import { useState } from "react";
import { postEntrada,postSalida,getMovimientos,putMovimiento, getProductos } from "../../services/api";

export const useMovimientos = () =>{

    const [movimientos, setMoviemientos] = useState([]);

    const handlePostEntrada = async (data) => {
        try {
            await postEntrada(postEntrada);
        } catch (error) {
            console.error("Error al crear producto:", error.response?.data || error.message);
        }
    }

    const handlePostSalida = async (data) => {
        try {
            await postEntrada(postEntrada);
        } catch (error) {
            console.error("Error al crear producto:", error.response?.data || error.message);
        }
    }

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

    return {movimientos, handleGetMovimientos, handlePostEntrada, handlePostSalida, handlePutMovimiento};
}