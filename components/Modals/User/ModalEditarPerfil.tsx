import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { InputFields } from "@/components/Shared/InputFields";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { InputDate } from "@/components/Shared/inputDate";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ModalPerfilProps } from "@/interfaces";
import { editarPerfilUser } from "@/lib/user";
import { IoExit } from "react-icons/io5";
import { userPut } from "@/services/user";
import { FaUserEdit } from "react-icons/fa";
import Context from "@/context/contextPrincipal";
import moment from "moment";

export const ModalEditarPerfil: React.FC<ModalPerfilProps> = ({ open, setOpen, data }) => {
    const [light] = useContext(Context);
    const [nombre, setNombre] = useState(data?.nombre);
    const [apellido, setApellido] = useState(data?.apellido);
    const [email, setEmail] = useState(data?.email);
    const [fechaNacimiento, setFechaNacimiento] = useState(moment(data?.fecha_de_nacimiento));
    const { mutate: editarPerfil } = useMutation(userPut);
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setNombre(data?.nombre);
        setApellido(data?.apellido);
        setEmail(data?.email)
        setFechaNacimiento(moment(data?.fecha_de_nacimiento))
    }, [data]);

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
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSend
                            title="Editar"
                            icon={FaUserEdit}
                            handleclick={() => { editarPerfilUser(data?._id, nombre, apellido, email, moment(fechaNacimiento).format('YYYY-MM-DD HH:mm:ss'), setIsLoading, editarPerfil, queryClient, handleClose) }}
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