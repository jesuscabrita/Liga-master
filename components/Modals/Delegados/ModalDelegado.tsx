import { ButtomSend } from "@/components/Shared/ButtonSend";
import { InputFields } from "@/components/Shared/InputFields";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { delegadoPost } from "@/services/delegado";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { FC, useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { IoMdPersonAdd } from "react-icons/io";
import { IoExit } from "react-icons/io5";
import { MdGroupAdd as Crear } from 'react-icons/md';
import { ModalGlobalProps } from "@/interfaces";
import { crearDelegado } from "@/lib/delegado";
import Context from "@/context/contextPrincipal";

export const ModalDelegado: FC<ModalGlobalProps> = ({ open, setOpen, id }) => {
    const [light] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [telefono, setTelefono] = useState('');
    const queryClient = useQueryClient();
    const { mutate: addDelegado } = useMutation(delegadoPost);
    const [errorName, setErrorName] = useState(false);
    const [errorMessageName, setErrorMessageName] = useState('');
    const [errorTelefono, setErrorTelefono] = useState(false);
    const [errorMessageTelefono, setErrorMessageTelefono] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleName = (event: any) => {
        setErrorName(false)
        setErrorMessageName('')
        setName(event.target.value)
    }

    const handleTelefono = (event: any) => {
        setErrorTelefono(false)
        setErrorMessageTelefono('')
        setTelefono(event.target.value)
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '2px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {"Fichar delegado"}
                    <IoMdPersonAdd size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Grid item container sx={{ borderBottom: light ? "1px solid var(--dark2)" : "1px solid var(--cero)" }} />
                <Grid item container mb={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: '12px' }}>
                    Si el campo contiene (<span style={{ color: '#DE1212' }}>*</span>), entonces es requirodo
                </Grid>
                <Grid container alignItems={'center'}>
                    <InputFields
                        title="Nombre"
                        descripcion="Escribir nombre"
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        setValue={setName}
                        handleActive
                        handleChange={handleName}
                        error={errorName}
                        textError={errorMessageName}
                        requerido
                    />
                </Grid>
                <Grid container alignItems={'center'}>
                    <InputFields
                        title="Telefono"
                        descripcion="1165465498"
                        type="text"
                        placeholder="Telefono"
                        value={telefono}
                        setValue={setTelefono}
                        handleActive
                        handleChange={handleTelefono}
                        error={errorTelefono}
                        textError={errorMessageTelefono}
                        requerido
                    />
                </Grid>
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSend
                            title="Crear delegado"
                            icon={Crear}
                            handleclick={() => {
                                crearDelegado(
                                    id,
                                    name,
                                    telefono,
                                    setIsLoading,
                                    addDelegado,
                                    queryClient,
                                    handleClose,
                                    setErrorName,
                                    setErrorMessageName,
                                    setErrorTelefono,
                                    setErrorMessageTelefono
                                )
                            }}
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