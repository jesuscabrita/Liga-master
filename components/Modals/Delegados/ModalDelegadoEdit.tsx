import { ButtomSend } from "@/components/Shared/ButtonSend";
import { InputFields } from "@/components/Shared/InputFields";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { DelegadoPut } from "@/services/delegado";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { FaUserEdit } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { BiEditAlt as Editar } from 'react-icons/bi';
import { editarDelegado } from "@/lib/delegado";
import { ModalDelegadoEditarProps } from "@/interfaces";
import Context from "@/context/contextPrincipal";

export const ModalDelegadoEditar: React.FC<ModalDelegadoEditarProps> = ({ open, setOpen, id, data }) => {
    const [light] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState(data?.name);
    const [telefono, setTelefono] = useState(data?.telefono);
    const queryClient = useQueryClient();
    const { mutate: editDelegado } = useMutation(DelegadoPut);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setName(data?.name);
        setTelefono(data?.telefono);
    }, [data]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '2px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {"Editar delegado"}
                    <FaUserEdit size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Grid container alignItems={'center'}>
                    <InputFields
                        title="Nombre"
                        descripcion="Escribir nombre"
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        setValue={setName}
                    />
                </Grid>
                <Grid container alignItems={'center'}>
                    <InputFields
                        title="Telefono"
                        descripcion="Escribir telefono"
                        type="text"
                        placeholder="Telefono"
                        value={telefono}
                        setValue={setTelefono}
                    />
                </Grid>
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSend
                            title="Editar delegado"
                            icon={Editar}
                            handleclick={() => { editarDelegado(id, data?._id, name, telefono, setIsLoading, editDelegado, queryClient, handleClose) }}
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