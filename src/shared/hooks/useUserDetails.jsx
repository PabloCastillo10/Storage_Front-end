import { useState } from "react";
import {logout as logoutHandler} from "./useLogout";


const getUserDetails = () => {
    const user = localStorage.getItem('user');
    if (user) { 
        try {
        return JSON.parse(user);
    } catch (error) {
        console.error("Error parsing user details from localStorage:", error);
        return null;
    }
    }
}


export const useUserDetails = () => {
    const [user, setUser] = useState(getUserDetails());
    const logout = () => {
        logoutHandler
        
    }


    return {
        isLogged: Boolean(user),
        username: user?.username ? user.username : 'Guest',
        logout
    }
}