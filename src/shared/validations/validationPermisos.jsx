export const soloAdmin = (user) => {
    if (!user) return false;

    if (user.role !== "ADMIN_ROLE") {
        throw new Error("No tienes permisos para realizar esta acción");
    }

    return true;
};

export const noActualizarAdmin = (id) => {
    if (!user) return false;
    if (user.username === "administrador" ) {
        throw new Error("No puedes actualizar a ti mismo");
    }
    return true;
}
