import { useState, useEffect } from "react";
import {  putUser, deleteUser } from "../../services/api";

export const useMyAccountEdit = () => {
    const [user, setUser] = useState({});
    const [roles, setRoles] = useState([]);
    const handlePutUser = async ( data) => {
        try {
            const response = await putUser( data);
            setUser(response);
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            throw error;
        }
    };

    const handleDeleteUser = async (data) => {
        try {
            const response = await deleteUser(data);
            setUser(response);
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            
        }
    };
    return { user, roles,  handlePutUser, handleDeleteUser };
};