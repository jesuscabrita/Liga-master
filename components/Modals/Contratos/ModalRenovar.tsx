import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, SelectChangeEvent } from "@mui/material";
import { jugadoresRenovar } from "@/services/jugadores";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { MdAutorenew as Renovar } from 'react-icons/md';
import { IoExit } from "react-icons/io5";
import { formatoPesosArgentinos, nameTemporadas } from "@/utils";
import { InputFields } from "@/components/Shared/InputFields";
import { InputSelects } from "@/components/Shared/InputSelect";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { MdOutlineAccessTimeFilled as Time } from "react-icons/md";
import { ModalGlobalV2Props } from "@/interfaces";
import { contratos } from "@/utils/arrays";
import { editarRenovacion } from "@/lib/jugadores";
import Context from "@/context/contextPrincipal";

export const ModalRenovarJugador: React.FC<ModalGlobalV2Props> = ({ open, setOpen, equipoId, jugadorId, data }) => {
    const [light] = useContext(Context);
    const [sueldo, setSueldo] = useState(data?.sueldo);
    const [contrato, setContrato] = useState(data?.contrato);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: renovarJugador } = useMutation(jugadoresRenovar);
    const [errorSueldo, setErrorSueldo] = useState(false);
    const [errorMessageSueldo, setErrorMessageSueldo] = useState('');
    const [errorContrato, setErrorContrato] = useState(false);
    const [errorMessageContrato, setErrorMessageContrato] = useState('');
    const contratosRColor =
        data.contrato === 0.5 ? 'var(--marcaRed)' :
            data.contrato === 1 ? 'var(--warnning)' :
                data.contrato === 1.5 ? 'var(--warnning)' :
                    `var(--check)`

    const handleClose = () => {
        setOpen(false);
    };

    const handleSueldo = (event: any) => {
        setErrorSueldo(false)
        setErrorMessageSueldo('')
        setSueldo(event.target.value)
    }

    const handleSelectContrato = (event: SelectChangeEvent<string>) => {
        setErrorContrato(false)
        setErrorMessageContrato('')
        setContrato(event.target.value)
    }

    useEffect(() => {
        setSueldo(data?.sueldo);
        setContrato(data?.contrato);
    }, [data]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {`Renovar contrato de  ${data?.name}`}
                    <Renovar size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Grid item container sx={{ borderBottom: light ? "1px solid var(--dark2)" : "1px solid var(--cero)" }} />
                <Grid item mt={1} container sx={{ color: light ? "var(--dark2)" : "var(--gris)", textAlign: 'center' }}>
                    {`El sueldo minimo para renovar a 
                    ${data?.name} es de ${formatoPesosArgentinos(data.sueldoProximo)} 
                    por temporada (al renovar se debe pagar el sueldo de la temporada
                    anterior y se descuenta del banco del equipo automaticamente)`}
                </Grid>
                <Grid item mb={3} container alignItems={'center'} gap={1} sx={{ color: light ? "var(--dark2)" : "var(--gris)", textAlign: 'center', fontSize: '12px' }}>
                    Temporadas restantes : <span style={{ color: contratosRColor }}>{nameTemporadas(data)} </span><Time size={15} color={contratosRColor} />
                </Grid>
                <Grid item container>
                    <InputFields
                        title="Sueldo"
                        descripcion="Escribir el Sueldo del jugador"
                        placeholder="Sueldo"
                        type="number"
                        value={sueldo}
                        setValue={setSueldo}
                        handleActive
                        handleChange={handleSueldo}
                        error={errorSueldo}
                        textError={errorMessageSueldo}
                        requerido
                    />
                </Grid>
                <Grid item container>
                    <InputSelects
                        title="Contrato"
                        value={contrato}
                        descripcion="Seleccionar Contrato"
                        handleSelect={handleSelectContrato}
                        data={contratos}
                        error={errorContrato}
                        textError={errorMessageContrato}
                        requerido
                    />
                </Grid>
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSend
                            title="Renovar"
                            icon={Renovar}
                            handleclick={() => {
                                editarRenovacion(
                                    equipoId,
                                    jugadorId,
                                    setIsLoading,
                                    renovarJugador,
                                    queryClient,
                                    handleClose,
                                    contrato,
                                    sueldo,
                                    setErrorSueldo,
                                    setErrorMessageSueldo,
                                    setErrorContrato,
                                    setErrorMessageContrato,
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