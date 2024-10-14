import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, SelectChangeEvent } from "@mui/material";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { InputSelects } from "@/components/Shared/InputSelect";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { InputFields } from "@/components/Shared/InputFields";
import { InputDate } from "@/components/Shared/inputDate";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { editarUser } from "@/lib/user";
import { IoExit } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { userPut } from "@/services/user";
import Context from "@/context/contextPrincipal";
import moment from "moment";

interface ModalUserProps {
    open: boolean;
    data: { nombre: string; apellido: string; email: string; fecha_de_nacimiento: string; _id: string; role: string; }
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export const ModalUser: React.FC<ModalUserProps> = ({ open, setOpen, data }) => {
    const [light] = useContext(Context);
    const [nombre, setNombre] = useState(data?.nombre || "");
    const [apellido, setApellido] = useState(data?.apellido || "");
    const [role, setRole] = useState(data?.role || "");
    const [email, setEmail] = useState(data?.email || "");
    const [fechaNacimiento, setFechaNacimiento] = useState(moment(data?.fecha_de_nacimiento || ""));
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: editarUsuario } = useMutation(userPut);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setNombre(data?.nombre || "");
        setApellido(data?.apellido || "");
        setRole(data?.role || "");
        setEmail(data?.email || "");
        setFechaNacimiento(moment(data?.fecha_de_nacimiento || ""));
    }, [data]);

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setRole(event.target.value)
    }

    const roles = [
        { codigo: 'usuario', descripcion: 'usuario' },
        { codigo: 'super_admin', descripcion: 'super_admin' },
        { codigo: 'admin', descripcion: 'admin' },
    ]

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {"Editar Usuario"}
                    <FaUserEdit size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Grid item container>
                    <InputFields
                        title="Nombre"
                        descripcion="Escribir nombre"
                        placeholder="Nombre"
                        type="text"
                        value={nombre}
                        setValue={setNombre}
                    />
                </Grid>
                <Grid item container>
                    <InputFields
                        title="Apellido"
                        descripcion="Escribir apellido"
                        placeholder="Apellido"
                        type="text"
                        value={apellido}
                        setValue={setApellido}
                    />
                </Grid>
                <Grid item container>
                    <InputFields
                        title="Email"
                        descripcion="Escribir email"
                        placeholder="Email"
                        type="email"
                        value={email}
                        setValue={setEmail}
                    />
                </Grid>
                <Grid item container>
                    <InputDate
                        title="Fecha de nacimiento"
                        descripcion="Seleccionar fecha de nacimiento"
                        value={fechaNacimiento}
                        setValue={setFechaNacimiento}
                    />
                </Grid>
                <Grid item container>
                    <InputSelects
                        title="Rol de usuario"
                        descripcion="Seleccione un rol para el usuario"
                        value={role}
                        handleSelect={handleSelectChange}
                        data={roles}
                    />
                </Grid>
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSend
                            title="Editar"
                            icon={FaUserEdit}
                            handleclick={() => { editarUser(data?._id, nombre, apellido, role, email, moment(fechaNacimiento).format('YYYY-MM-DD HH:mm:ss'), setIsLoading, editarUsuario, queryClient, handleClose) }}
                        />
                    </Grid>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSend
                            type="Secundario"
                            title="Cancelar"
                            icon={IoExit}
                            handleclick={handleClose}
                        />
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}