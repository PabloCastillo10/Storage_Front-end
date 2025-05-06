import {
    Box,
    Button,
    TextField,
    MenuItem,
    Alert,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Stack
} from "@mui/material";
import { useState, useEffect } from "react";
import { usePermisos } from "../../shared/hooks/usePermisos";
import { useNavigate } from "react-router-dom";

const rolesDisponibles = ["ADMIN", "EMPLOYEE"];

const Permisos = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [newRole, setNewRole] = useState("");
    const [alertOpen, setAlertOpen] = useState(true);
    const navigate = useNavigate();


    

    const {
        permisos,
        error,
        success,
        handlePutRole,
        handleGetByRoleUser,
        limpiarFiltros,
    } = usePermisos();

    useEffect(() => {
        if (error || success) {
          setAlertOpen(true);
        }
      }, [error, success])

    const handleBuscar = () => {
        if (selectedRole) handleGetByRoleUser(selectedRole);
    };

    const handleActualizarRol = () => {
        if (selectedId && newRole) {
            handlePutRole(selectedId, { role: newRole });
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
                Gestión de Roles de Usuario
            </Typography>

            <Stack direction="row" spacing={2} mb={3}>
                <TextField
                    select
                    label="Buscar por Rol"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    sx={{ minWidth: 200 }}
                >
                    {rolesDisponibles.map((rol) => (
                        <MenuItem key={rol} value={rol}>
                            {rol}
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" onClick={handleBuscar}>
                    Buscar
                </Button>
                <Button variant="outlined" color="secondary" onClick={limpiarFiltros}>
                    Limpiar filtros
                </Button>
            </Stack>

            {error && alertOpen && (
            <Alert
                variant="filled"
                severity="error"
                onClose={() => setAlertOpen(false)}
                sx={{ mb: 2 }}
            >
                {error.includes("NO_SE_PUEDE_MODIFICAR_ADMIN")
                ? "❌ No se puede modificar al admin por defecto"
                : error}
            </Alert>
            )}

            {success && alertOpen && (
            <Alert
                variant="filled"
                severity="success"
                onClose={() => setAlertOpen(false)}
                sx={{ mb: 2 }}
            >
                ✅ {success}
            </Alert>
            )}


            {permisos.length > 0 && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Usuario</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>UID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {permisos.map((user) => (
                            <TableRow key={user.uid}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.surname}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.uid}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                    Actualizar Rol Manualmente
                </Typography>
                <Stack spacing={2} direction="row">
                    <TextField
                        label="ID del Usuario"
                        value={selectedId}
                        onChange={(e) => setSelectedId(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        select
                        label="Nuevo Rol"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        sx={{ minWidth: 200 }}
                    >
                        {rolesDisponibles.map((rol) => (
                            <MenuItem key={rol} value={rol}>
                                {rol}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="contained" onClick={handleActualizarRol}>
                        Actualizar Rol
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>← Regresar a Dashboard</Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default Permisos;