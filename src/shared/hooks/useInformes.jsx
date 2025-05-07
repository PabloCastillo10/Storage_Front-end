import { useState } from "react";
import { toast } from 'react-toastify';
import {  getQuantityProducts,getTotalProductStock, getValueInventory,  getEstadisticasProductos, getResumenMovimientos  } from "../../services/api";
export const useInformes = () => {
    const [movimientos, setMovimientos] = useState([]);
    const [totalMovimientos, setTotalMovimientos] = useState(0);
    const [productos, setProductos] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [cantidadTotal, setCantidadTotal] = useState(0);
    const [estadisticas, setEstadisticas] = useState([]);
    const [totalEstadisticas, setTotalEstadisticas] = useState(0)


    const handleGetQuantityProducts = async () => {
        try {
            const res = await getQuantityProducts();
            console.log(res);
            setProductos(res.productos || []);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };
    
    const handleGetTotalProductStock = async () => {
        try {
            const res = await getTotalProductStock();
            setCantidadTotal(res.total.cantidadInventario || 0);
            console.log(res);
        } catch (error) {
            console.error("Error al obtener stock total:", error);
        }
    };
    
    const handleGetValueInventory = async () => {
        try {
            const res = await getValueInventory();
            console.log(res);
            setValorTotal(res.total.precioInventario || 0);
        } catch (error) {
            console.error("Error al obtener valor de inventario:", error);
        }
    };


    const handleGetResumenMovimientos = async (tipo, desde, hasta) => {
        try {
          const res = await getResumenMovimientos(tipo, desde, hasta);
          setMovimientos(res.resumen || []);
          setTotalMovimientos(res.total || 0);
        } catch (error) {
          console.error("Error al obtener el resumen de movimientos:", error);
        }
      };

    

    const handleGetEstadisticasProductos = async () => {
        try {
            const res = await getEstadisticasProductos();
            setEstadisticas(res.estadisticas || [])
            setTotalEstadisticas(res.total || 0)
        } catch (error) {
            console.error("Error al obtener estadisticas de productos:",
                error)
        }
    }

    

    

    

    return {
        productos,
        movimientos,
        totalMovimientos,
        estadisticas,
        totalEstadisticas,
        handleGetQuantityProducts,
        handleGetTotalProductStock,
        handleGetValueInventory,
        handleGetResumenMovimientos,
        handleGetEstadisticasProductos,
        valorTotal,
        cantidadTotal,
        setValorTotal,
        setProductos,
        setMovimientos
      };
}