import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser  } from "../../services/api";

export const useLogin = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");

    const handleLogin = async (data) => {
        try {
            
            const response = await loginUser (data);
            const userDetails = response.data;

        
            navigate("/dashboard", { state: { message: "Inicio de sesión exitoso" } });
            localStorage.setItem('user', JSON.stringify(userDetails));

          
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Email o contraseña incorrecta";
            setLoginError(errorMsg);

            setTimeout(() => {
                setLoginError("");
            }, 10000);
        }
    }

    return { handleLogin, loginError };
}
