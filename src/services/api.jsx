import axios from "axios";
import { logout } from "../shared/hooks/useLogout";


const apiClient  = axios.create({
    baseURL: 'http://127.0.0.1:3000/almacenadora',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
        const useUserDetails  = localStorage.getItem('user')

        if(useUserDetails ) {
            const token = JSON.parse(useUserDetails).token
            config.headers.Authorization = `Bearer ${token}`
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

const checkResponseStatus = (e) => {
    const responseStatus = e?.response?.status;

    if (responseStatus) {
        (responseStatus === 401 || responseStatus === 403) && logout();
    } else {
        console.warn("No se recibió una respuesta del servidor:", e.message);
    }
};