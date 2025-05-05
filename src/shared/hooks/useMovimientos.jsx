import { useState } from "react";
import { postEntrada,postSalida,getMovimientos,putMovimiento, getProductos, getUsersByRole } from "../../services/api";

export const useMovimientos = () =>{

    const [movimientos, setMovimientos] = useState([]);
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
    
    const handleGetEmployees = async () => {
        try {
            const response = await getUsersByRole('EMPLOYEE');
            console.log(response)
            setUser(response.users||[])
        } catch (error) {
            console.error("Error al obtener el empleado:", error.response?.data || error.message)
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
            setMovimientos(movimientos.map((movimiento)=>(movimiento._id===id? response: movimiento)))
        } catch (error) {
            console.error("Error al actualizar movimiento: ", error.message)   
        }
    }


    return {movimientos, user, handleGetEmployees , handleGetMovimientos, handlePostEntrada, handlePostSalida, handlePutMovimiento};
}