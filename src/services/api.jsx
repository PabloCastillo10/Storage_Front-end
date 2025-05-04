import axios from "axios";
import { logout } from "../shared/hooks/useLogout";


const apiClient  = axios.create({
    baseURL: 'http://127.0.0.1:3000/almacenadora',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
        const token  = localStorage.getItem('token')

        if(token ) {
            config.headers["x-token"] = token;
        }

        return  config
    },
    (e) => {
        return Promise.reject(e)
    }
)

export const registerUser = async (data) => {
    try {
        const response = await apiClient.post('/users/register', data)
        return response.data
    } catch (e) {
        checkResponseStatus(e)
        return Promise.reject(e)
    }
}

export const loginUser = async (data) => {
    try {
        const response = await apiClient.post('/users/login', data)
        return response.data
    } catch (e) {
        checkResponseStatus(e)
        return Promise.reject(e)
    }
}

export const postProductos = async (data) => {
    try {
        return await apiClient.post('/productos', data);
    } catch (e) {
        return {
            error: true,
            e: e.message
        }
    }
}

export const getProductos = async () => {
    try {
        const response = await apiClient.get('/productos')
        return response.data
    } catch (e) {
        checkResponseStatus(e)
        return Promise.reject(e)
    }
}

export const deleteProductos = async (id) => {
    try {
        const response = await apiClient.delete(`/productos/${id}`)
        return response.data
    } catch (e) {
        checkResponseStatus(e)
        return Promise.reject(e)
    }
}

export const putProductos = async (id, data) => {
    try {
        const response = await apiClient.put(`/productos/${id}`, data)
        return response.data
    } catch (e) {
        checkResponseStatus(e)
        return Promise.reject(e)
    }
}

export const searchProductos = async (query) => {
    try {
        const response = await apiClient.get(`/productos/buscar/${query}`)
        return response.data.productos;
    } catch (e) {
        checkResponseStatus(e)
        return Promise.reject(e)
    }
}

export const getProductosById = async (id) => {
    try {
        const response = await apiClient.get(`/productos/${id}`)
        return response.data
    } catch (e) {
        checkResponseStatus(e)
        return Promise.reject(e)
    }
}

export const getCategorias = async () => {
    try {
        const response = await apiClient.get('/categorias')
        return response.data
    } catch (e) {
        checkResponseStatus(e)
        return Promise.reject(e)
    }
}

export const getProveedores = async () => {
    try {
        const response = await apiClient.get('/proveedores')
        return response.data
    } catch (e) {
        checkResponseStatus(e)
        return Promise.reject(e)
    }
}

export const postCategorias = async (data) => {
    try {
        const response = await apiClient.post('/categorias', data)
        return response.data
    } catch (e) {
        checkResponseStatus(e)
        return Promise.reject(e)
    }
}

export const putCategorias = async (id, data) => {
    try {
        const response = await apiClient.put(`/categorias/${id}`, data)
        return response.data
    } catch (e) {
        checkResponseStatus(e)
        return Promise.reject(e)
    }
}

export const deleteCategorias = async (id) => {
    try {
        const response = await apiClient.delete(`/categorias/${id}`)
        return response.data
    } catch (e) {
        checkResponseStatus(e)
        return Promise.reject(e)
    }
}

export const searchCategoriaName = async (name) => {
    try {
        const response = await apiClient.get(`/categorias/name/${name}`)
        return response.data.category;
    } catch (e) {
        checkResponseStatus(e)
        return Promise.reject(e)
    }
}

export const postClientes = async (data) => {
    try {
        const response = await apiClient.post('/clientes', data)
        return response.data
    } catch (e) {
        checkResponseStatus(e)
        return Promise.reject(e)
    }
}

export const postProveedores = async (data) => {
    try {
        const response = await apiClient.post('/proveedores', data)
        return response.data
    } catch (e) {
        checkResponseStatus(e)
        return Promise.reject(e)
    }
}

const checkResponseStatus = (e) => {
    const responseStatus = e?.response?.status;

    if (responseStatus) {
        (responseStatus === 401 || responseStatus === 403) && logout();
    } else {
        console.warn("No se recibió una respuesta del servidor:", e.message);
        console.error(e);
    }
};

