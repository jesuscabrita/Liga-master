import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, SelectChangeEvent } from "@mui/material";
import { jugadoresPut } from "@/services/jugadores";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { BiEditAlt as Editar } from 'react-icons/bi';
import { InputFields } from "@/components/Shared/InputFields";
import { InputDate } from "@/components/Shared/inputDate";
import { InputSelects } from "@/components/Shared/InputSelect";
import { InputUpload } from "@/components/Shared/InputUpload";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { editarJugadores } from "@/lib/jugadores";
import { IoExit } from "react-icons/io5";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { nationalities, posiciones } from "@/utils/arrays";
import { ModalEditarJugadorProps } from "@/interfaces";
import Context from "@/context/contextPrincipal";
import moment from "moment";

export const ModalEditarJugador: React.FC<ModalEditarJugadorProps> = ({ open, setOpen, equipoId, jugadorId, data }) => {
    const [light] = useContext(Context);
    const [name, setName] = useState(data?.name);
    const [posicion, setPosicion] = useState(data?.posicion);
    const [fecha, setFecha] = useState(data?.fecha_nacimiento ? moment(data.fecha_nacimiento) : null);
    const [nacionalidad, setNacionalidad] = useState(data?.nacionalidad);
    const [instagram, setInstagram] = useState(data?.instagram);
    const [foto, setFoto] = useState(data?.foto);
    const [fotoAdded, setFotoAdded] = useState(false);
    const [fotoName, setFotoName] = useState('');
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: editarJugador } = useMutation(jugadoresPut);
    const [errorName, setErrorName] = useState(false);
    const [errorMessageName, setErrorMessageName] = useState('');
    const [errorFecha, setErrorFecha] = useState(false);
    const [errorMessageFecha, setErrorMessageFecha] = useState('');
    const [errorPosicion, setErrorPosicion] = useState(false);
    const [errorMessagePosicion, setErrorMessagePosicion] = useState('');
    const [errorNacionalidad, setErrorNacionalidad] = useState(false);
    const [errorMessageNacionalidad, setErrorMessageNacionalidad] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleName = (event: any) => {
        setErrorName(false)
        setErrorMessageName('')
        setName(event.target.value)
    }

    const handleFecha = (event: any) => {
        setErrorFecha(false)
        setErrorMessageFecha('')
        setFecha(event)
    }

    const handleSelectPosicion = (event: SelectChangeEvent<string>) => {
        setPosicion(event.target.value)
    }

    const handleSelectNacionalidad = (event: SelectChangeEvent<string>) => {
        setNacionalidad(event.target.value)
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

    useEffect(() => {
        setName(data?.name);
        setPosicion(data?.posicion);
        setNacionalidad(data?.nacionalidad);
        setInstagram(data?.instagram);
        setFoto(data?.foto);
        setFecha(data?.fecha_nacimiento ? moment(data.fecha_nacimiento) : null);
    }, [data]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {"Editar Jugador"}
                    <Editar size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
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
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSend
                            title="Editar"
                            icon={Editar}
                            handleclick={() => {
                                editarJugadores(
                                    equipoId,
                                    jugadorId,
                                    name,
                                    posicion,
                                    moment(fecha).format('YYYY-MM-DD HH:mm:ss'),
                                    nacionalidad,
                                    instagram,
                                    foto,
                                    setIsLoading,
                                    editarJugador,
                                    queryClient,
                                    handleClose,
                                    setErrorName,
                                    setErrorMessageName,
                                    setErrorFecha,
                                    setErrorMessageFecha,
                                    setErrorPosicion,
                                    setErrorMessagePosicion,
                                    setErrorNacionalidad,
                                    setErrorMessageNacionalidad,
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