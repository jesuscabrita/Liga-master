import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, SelectChangeEvent } from "@mui/material";
import { jugadoresPost } from "@/services/jugadores";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { FaAddressBook } from "react-icons/fa6";
import { InputFields } from "@/components/Shared/InputFields";
import { InputDate } from "@/components/Shared/inputDate";
import { InputSelects } from "@/components/Shared/InputSelect";
import { InputUpload } from "@/components/Shared/InputUpload";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { IoExit } from "react-icons/io5";
import { ModalGlobalProps } from "@/interfaces";
import { contratos, nationalities, posiciones } from "@/utils/arrays";
import { crearJugadores } from "@/lib/jugadores";
import Context from "@/context/contextPrincipal";
import moment from "moment";

export const ModalCrearJugador: React.FC<ModalGlobalProps> = ({ open, setOpen, id }) => {
    const [light] = useContext(Context);
    const [name, setName] = useState('');
    const [documento, setDocumento] = useState('');
    const [sueldo, setSueldo] = useState(null);
    const [posicion, setPosicion] = useState('Elija una opción')
    const [fecha, setFecha] = useState(null);
    const [nacionalidad, setNacionalidad] = useState('Elija una opción')
    const [contrato, setContrato] = useState('Elija una opción')
    const [dorsal, setDorsal] = useState('');
    const [instagram, setInstagram] = useState('');
    const [foto, setFoto] = useState<string | null>(null);
    const [fotoAdded, setFotoAdded] = useState(false);
    const [fotoName, setFotoName] = useState<string>("");
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: crearJugador } = useMutation(jugadoresPost);
    const [errorName, setErrorName] = useState(false);
    const [errorMessageName, setErrorMessageName] = useState('');
    const [errorDocumento, setErrorDocumento] = useState(false);
    const [errorMessageDocumento, setErrorMessageDocumento] = useState('');
    const [errorFecha, setErrorFecha] = useState(false);
    const [errorMessageFecha, setErrorMessageFecha] = useState('');
    const [errorPosicion, setErrorPosicion] = useState(false);
    const [errorMessagePosicion, setErrorMessagePosicion] = useState('');
    const [errorNacionalidad, setErrorNacionalidad] = useState(false);
    const [errorMessageNacionalidad, setErrorMessageNacionalidad] = useState('');
    const [errorContrato, setErrorContrato] = useState(false);
    const [errorMessageContrato, setErrorMessageContrato] = useState('');
    const [errorSueldo, setErrorSueldo] = useState(false);
    const [errorMessageSueldo, setErrorMessageSueldo] = useState('');
    const [errorDorsal, setErrorDorsal] = useState(false);
    const [errorMessageDorsal, setErrorMessageDorsal] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectPosicion = (event: SelectChangeEvent<string>) => {
        setErrorPosicion(false)
        setErrorMessagePosicion('')
        setPosicion(event.target.value)
    }

    const handleSelectNacionalidad = (event: SelectChangeEvent<string>) => {
        setErrorNacionalidad(false)
        setErrorMessageNacionalidad('')
        setNacionalidad(event.target.value)
    }

    const handleSelectContrato = (event: SelectChangeEvent<string>) => {
        setErrorContrato(false)
        setErrorMessageContrato('')
        setContrato(event.target.value)
    }

    const handleName = (event: any) => {
        setErrorName(false)
        setErrorMessageName('')
        setName(event.target.value)
    }

    const handleDocumento = (event: any) => {
        const inputName = event.target.value;
        if (inputName.length <= 8) {
            setErrorDocumento(false)
            setErrorMessageDocumento('')
            setDocumento(inputName)
        }
    }

    const handleFecha = (event: any) => {
        setErrorFecha(false)
        setErrorMessageFecha('')
        setFecha(event)
    }

    const handleSueldo = (event: any) => {
        setErrorSueldo(false)
        setErrorMessageSueldo('')
        setSueldo(event.target.value)
    }

    const handleDorsal = (event: any) => {
        const inputName = event.target.value;
        if (inputName.length <= 2) {
            setErrorDorsal(false)
            setErrorMessageDorsal('')
            setDorsal(inputName)
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (typeof result === 'string') {
                    setFoto(result);
                    setFotoAdded(true);
                    setFotoName(file.name);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Dialog open={open}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {"Fichar jugador libre"}
                    <FaAddressBook size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Grid item container mt={1} sx={{ color: light ? "var(--dark2)" : "var(--cero)" }}>
                    Datos del jugador
                </Grid>
                <Grid item container sx={{ borderBottom: light ? "1px solid var(--dark2)" : "1px solid var(--cero)" }} />
                <Grid item container mb={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: '12px' }}>
                    Si el campo contiene (<span style={{ color: '#DE1212' }}>*</span>), entonces es requirodo
                </Grid>
                <Grid item container>
                    <InputFields
                        title="Nombre"
                        descripcion="Escribir nombre"
                        placeholder="Nombre"
                        type="text"
                        value={name}
                        setValue={setName}
                        error={errorName}
                        textError={errorMessageName}
                        handleActive
                        handleChange={handleName}
                        requerido
                    />
                </Grid>
                <Grid item container>
                    <InputFields
                        title="DNI/Documento"
                        descripcion="DNI/Documento, maximo 8 digitos"
                        placeholder="204568521"
                        type="text"
                        value={documento}
                        setValue={setDocumento}
                        error={errorDocumento}
                        textError={errorMessageDocumento}
                        handleActive
                        handleChange={handleDocumento}
                        lengths
                        max={8}
                        requerido
                    />
                </Grid>
                <Grid item container>
                    <InputDate
                        title="Fecha de nacimiento"
                        descripcion="Seleccionar fecha de nacimiento"
                        value={fecha}
                        setValue={setFecha}
                        handleActive
                        handleChange={handleFecha}
                        error={errorFecha}
                        textError={errorMessageFecha}
                        requerido
                    />
                </Grid>
                <Grid item container>
                    <InputSelects
                        title="Posicion"
                        value={posicion}
                        descripcion="Seleccionar posicion"
                        handleSelect={handleSelectPosicion}
                        data={posiciones}
                        error={errorPosicion}
                        textError={errorMessagePosicion}
                        requerido
                    />
                </Grid>
                <Grid item container>
                    <InputSelects
                        title="Nacionalidad"
                        value={nacionalidad}
                        descripcion="Seleccionar nacionalidad"
                        handleSelect={handleSelectNacionalidad}
                        data={nationalities}
                        error={errorNacionalidad}
                        textError={errorMessageNacionalidad}
                        requerido
                    />
                </Grid>
                <Grid item container>
                    <InputFields
                        title="Instagram"
                        descripcion="Escribir Instagram"
                        placeholder="Instagram"
                        type="text"
                        value={instagram}
                        setValue={setInstagram}
                    />
                </Grid>
                <Grid item container>
                    <InputUpload
                        title='Foto'
                        subtitle="Agregue la foto"
                        descripcion="Carga o arrastra aqui la foto del jugador"
                        handleImageChange={handleImageChange}
                        imageName={fotoName}
                        setImage={setFoto}
                        setImageName={setFotoName}
                        logoAdded={fotoAdded}
                        setLogoAdded={setFotoAdded}
                    />
                </Grid>
                <Grid item container mt={4} sx={{ color: light ? "var(--dark2)" : "var(--cero)" }}>
                    Datos del contrato
                </Grid>
                <Grid item container sx={{ borderBottom: light ? "1px solid var(--dark2)" : "1px solid var(--cero)" }} />
                <Grid item container mb={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: '12px' }}>
                    Si el campo contiene (<span style={{ color: '#DE1212' }}>*</span>), entonces es requirodo
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
                <Grid item container>
                    <InputFields
                        title="Sueldo"
                        descripcion="Escribir el Sueldo del jugador"
                        placeholder="500000"
                        type="number"
                        value={sueldo}
                        setValue={setSueldo}
                        requerido
                        handleActive
                        handleChange={handleSueldo}
                        error={errorSueldo}
                        textError={errorMessageSueldo}
                    />
                </Grid>
                <Grid item container>
                    <InputFields
                        title="Dorsal"
                        descripcion="Escribir dorsal"
                        placeholder="10"
                        type="text"
                        value={dorsal}
                        setValue={setDorsal}
                        requerido
                        handleActive
                        handleChange={handleDorsal}
                        error={errorDorsal}
                        textError={errorMessageDorsal}
                        lengths
                        max={2}
                    />
                </Grid>
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSend
                            title="Fichar"
                            icon={FaAddressBook}
                            handleclick={() => {
                                crearJugadores(
                                    id,
                                    name,
                                    sueldo,
                                    contrato,
                                    posicion,
                                    moment(fecha).format('YYYY-MM-DD HH:mm:ss'),
                                    nacionalidad,
                                    dorsal,
                                    instagram,
                                    foto,
                                    documento,
                                    setIsLoading,
                                    crearJugador,
                                    queryClient,
                                    handleClose,
                                    setErrorName,
                                    setErrorMessageName,
                                    setErrorDocumento,
                                    setErrorMessageDocumento,
                                    setErrorFecha,
                                    setErrorMessageFecha,
                                    setErrorPosicion,
                                    setErrorMessagePosicion,
                                    setErrorNacionalidad,
                                    setErrorMessageNacionalidad,
                                    setErrorContrato,
                                    setErrorMessageContrato,
                                    setErrorSueldo,
                                    setErrorMessageSueldo,
                                    setErrorDorsal,
                                    setErrorMessageDorsal
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