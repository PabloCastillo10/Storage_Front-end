import { useState } from "react";
import { toast } from 'react-toastify';
import {  getQuantityProducts,getTotalProductStock, getValueInventory, getResumenMovimientos, getEstadisticasProductos, getProductos, getCategorias } from "../../services/api";
export const useInformes = () => {
    const [productos, setProductos] = useState([]);
    const [movimientos, setMovimientos] = useState([]);
    const [descargarExcel, setDescargarExcel] = useState(false);
    const [valorTotal, setValorTotal] = useState(0);
    const [categorias, setCategorias] = useState([]);


    const handleGetQuantityProducts = async () => {
        try {
            const res = await getQuantityProducts();
            console.log(res)
            setProductos(res.productos || []);
        } catch (error) {   
            console.error("Error al obtener productos:", error);
        }
    };

    const handleGetTotalProductStock = async () => {
        try {
            const res = await getTotalProductStock();
            console.log(res)
            setProductos(res.productos || []);
        } catch (error) {   
            console.error("Error al obtener productos:", error);
        }
    };

    const handleGetValueInventory = async () => {
        try {
            const res = await getValueInventory();
            console.log(res)
            setValorTotal(res.total || 0);
        } catch (error) {   
            console.error("Error al obtener productos:", error);
        }
    };

    const handleGetResumenMovimientos = async () => {
        try {
            const res = await getResumenMovimientos();
            console.log(res)
            setMovimientos(res.movimientos || []);
        } catch (error) {   
            console.error("Error al obtener productos:", error);
        }
    };

    const handleGetEstadisticasProductos = async () => {
        try {
            const res = await getEstadisticasProductos();
            console.log(res)
            setProductos(res.productos || []);
        } catch (error) {   
            console.error("Error al obtener productos:", error);
        }
    };

    const handleDescargarExcel = async () => {
        try {
          const response = await apiClient.get('/informe/descargar-excel', {
            responseType: 'blob'
          });
      
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'informe.xlsx');
          document.body.appendChild(link);
          link.click();
      
          toast.success('✅ Informe descargado con éxito');
        } catch (error) {
          console.error("Error al descargar el Excel:", error);
          toast.error('❌ Error al descargar el informe');
        }
      };

    const handleGetProductos = async () => {
        try {
            const res = await getProductos();
            console.log(res)
            setProductos(res.productos || []);
        } catch (error) {   
            console.error("Error al obtener productos:", error);
        }
    }

    const handleGetCategorias = async () => {
        try {
            const response = await getCategorias();
            console.log(response)
            setCategorias(response.categorias || []);
        } catch (error) {   
            console.error("Error al obtener categorias:", error);
        }
    }

    return {
        productos,
        movimientos,
        descargarExcel: handleDescargarExcel,
        handleGetQuantityProducts,
        handleGetTotalProductStock,
        handleGetValueInventory,
        handleGetResumenMovimientos,
        handleGetEstadisticasProductos,
        handleGetCategorias,
        handleGetProductos,
        categorias,
        setCategorias,
        setDescargarExcel,
        valorTotal,
        setValorTotal,
        setProductos,
        setMovimientos
      };
}