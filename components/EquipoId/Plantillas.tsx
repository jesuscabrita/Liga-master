import { JugadorDelete, jugadoresInscribir, jugadoresListaTransferible, jugadoresPut_lesion } from "@/services/jugadores"
import { opcionSelectEquipoId } from "@/utils/arrays"
import { Grid, useTheme } from "@mui/material"
import { MenuTabla } from "../Shared/MenuTabla"
import { TabPanel } from "../Shared/TabPanel"
import { SetStateAction, useContext, useState } from "react"
import { TablaPlantilla } from "./TablaPlantilla"
import { useMutation } from "react-query"
import { ofertaDelete } from "@/services/ofertas"
import { TablaEstadisticas } from "./TablaEstadisticas"
import { TablaFichajes } from "./TablaFichajes"
import { ModalJugadorInfo } from "../Modals/Jugadores/ModalInfoJugador"
import { ModalEditarJugador } from "../Modals/Jugadores/ModalEditarJugador"
import { ModalRecindir } from "../Modals/Contratos/ModalRecindir"
import { ModalRenovarJugador } from "../Modals/Contratos/ModalRenovar"
import { ModalDorsal } from "../Modals/Jugadores/ModalDorsal"
import { ModalJugadorCapitan } from "../Modals/Jugadores/ModalCapitan"
import { ModalJornada } from "../Modals/Jugadores/ModalJornada"
import { ModalOferta } from "../Modals/Ofertas/ModalOferta"
import { ModalOfertaRecibida } from "../Modals/Ofertas/ModalOfertaRecibida"
import { ModalAceptarOferta } from "../Modals/Ofertas/ModalAceptarOferta"
import { ModalPrestamo } from "../Modals/Ofertas/ModalPrestamo"
import { ModalNegociar } from "../Modals/Ofertas/ModalNegociar"
import { filterLibreJugador, filterLibreJugadorData } from "@/utils"
import { JugadorSeleccionadoProps, PlantillasProps } from "@/interfaces"
import Context from "@/context/contextPrincipal"
import SwipeableViews from "react-swipeable-views"

export const Plantillas: React.FC<PlantillasProps> = ({
    value,
    isSameEmail,
    isUserAdmin,
    data,
    queryClient,
    equipo_id,
    setIsLoadinng,
    setValue,
}) => {
    const theme = useTheme();
    const [light] = useContext(Context);
    const { mutate: eliminarJugador } = useMutation(JugadorDelete);
    const { mutate: lesion_jugador } = useMutation(jugadoresPut_lesion);
    const { mutate: inscribir } = useMutation(jugadoresInscribir);
    const { mutate: listaTransferibleJugador } = useMutation(jugadoresListaTransferible);
    const { mutate: eliminarOfert } = useMutation(ofertaDelete);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState<JugadorSeleccionadoProps | null>(null);
    const [modalEditarJugador, setModalEditarJugador] = useState(false);
    const [modalRecindir, setModalRecindir] = useState(false);
    const [modalRenovar, setModalRenovar] = useState(false);
    const [modalDorsal, setModalDorsal] = useState(false);
    const [modalJugadorCapitan, setModalJugadorCapitan] = useState(false);
    const [modalEditarJornada, setModalEditarJornada] = useState(false);
    const [modalJugadorInfo, setModalJugadorInfo] = useState(false);
    const [modalOferta, setModalOferta] = useState(false);
    const [modalOfertaRecibida, setModalOfertaRecibida] = useState(false);
    const [modalPrestamo, setModalPrestamo] = useState(false);
    const [modalNegociar, setModalNegociar] = useState(false);
    const [modalAceptarOferta, setModalAceptarOferta] = useState(false);

    const handleChange = (newValue: SetStateAction<number>) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <>
            <Grid item container mt={4} alignItems={'center'} justifyContent={'center'} sx={{ height: 'min-content' }}>
                {opcionSelectEquipoId?.map(opcion => (
                    <MenuTabla opcion={opcion} valueSelect={value} handleChange={handleChange} />
                ))}
                <Grid container sx={{ borderBottom: light ? '2px solid var(--dark2)' : '2px solid var(--gris)', marginTop: '0px' }} />
            </Grid>
            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Grid item mt={4} container alignItems={'center'} justifyContent={'center'}>
                        <TablaPlantilla
                            jugadores={(isUserAdmin || isSameEmail) ? filterLibreJugador(data?.jugadores, 'No') : filterLibreJugadorData(data?.jugadores, 'No')}
                            eliminarJugador={eliminarJugador}
                            equipo={data}
                            inscribir={inscribir}
                            isSameEmail={isSameEmail}
                            isUserAdmin={isUserAdmin}
                            lesion_jugador={lesion_jugador}
                            listaTransferibleJugador={listaTransferibleJugador}
                            queryClient={queryClient}
                            setIsLoadinng={setIsLoadinng}
                            setJugadorSeleccionado={setJugadorSeleccionado}
                            setModalDorsal={setModalDorsal}
                            setModalEditarJornada={setModalEditarJornada}
                            setModalEditarJugador={setModalEditarJugador}
                            setModalJugadorCapitan={setModalJugadorCapitan}
                            setModalJugadorInfo={setModalJugadorInfo}
                            setModalRecindir={setModalRecindir}
                            setModalRenovar={setModalRenovar}
                        />
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Grid item mt={4} container alignItems={'center'} justifyContent={'center'} >
                        <TablaEstadisticas
                            jugadores={data?.jugadores}
                            label={`Tabla de goleadores del ${data?.name}`}
                            goles
                        />
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Grid item mt={4} container alignItems={'center'} justifyContent={'center'} >
                        <TablaEstadisticas
                            jugadores={data?.jugadores}
                            label={`Tabla de asistidores del ${data?.name}`}
                            asistencias
                        />
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <Grid item mt={4} container alignItems={'center'} justifyContent={'center'} >
                        <TablaEstadisticas
                            jugadores={data?.jugadores}
                            label={`Tabla de tarjetas amarillas del ${data?.name}`}
                            amarillas
                        />
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                    <Grid item mt={4} container alignItems={'center'} justifyContent={'center'} >
                        <TablaEstadisticas
                            jugadores={data?.jugadores}
                            label={`Tabla de tarjetas rojas del ${data?.name}`}
                            rojas
                        />
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={5} dir={theme.direction}>
                    <Grid item mt={4} container alignItems={'center'} justifyContent={'center'} >
                        <TablaFichajes
                            jugadores={data?.jugadores}
                            equipoId={equipo_id}
                            data={data}
                            queryClient={queryClient}
                            setIsLoadinng={setIsLoadinng}
                            setModalJugadorInfo={setModalJugadorInfo}
                            setJugadorSeleccionado={setJugadorSeleccionado}
                            setModalOferta={setModalOferta}
                            setModalOfertaRecibida={setModalOfertaRecibida}
                            setModalAceptarOferta={setModalAceptarOferta}
                            setModalNegociar={setModalNegociar}
                            setModalPrestamo={setModalPrestamo}
                            eliminarOfert={eliminarOfert}
                        />
                    </Grid>
                </TabPanel>
            </SwipeableViews>
            {jugadorSeleccionado && (<ModalOferta open={modalOferta} setOpen={setModalOferta} equipoId={data?._id} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado?._id} />)}
            {jugadorSeleccionado && <ModalOfertaRecibida open={modalOfertaRecibida} setOpen={setModalOfertaRecibida} equipoId={data?._id} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado?._id} />}
            {jugadorSeleccionado && (<ModalAceptarOferta open={modalAceptarOferta} setOpen={setModalAceptarOferta} equipoId={data?._id} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado?._id} />)}
            {jugadorSeleccionado && (<ModalNegociar open={modalNegociar} setOpen={setModalNegociar} equipoId={data?._id} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado?._id} />)}
            {jugadorSeleccionado && (<ModalPrestamo open={modalPrestamo} setOpen={setModalPrestamo} equipoId={data?._id} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado?._id} />)}

            {jugadorSeleccionado && (<ModalEditarJugador open={modalEditarJugador} setOpen={setModalEditarJugador} equipoId={data?._id} jugadorId={jugadorSeleccionado?._id} data={jugadorSeleccionado} />)}
            {jugadorSeleccionado && <ModalRecindir open={modalRecindir} setOpen={setModalRecindir} data={jugadorSeleccionado} equipoId={data?._id} />}
            {jugadorSeleccionado && (<ModalRenovarJugador open={modalRenovar} setOpen={setModalRenovar} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado?._id} equipoId={data?._id} />)}
            {jugadorSeleccionado && (<ModalDorsal open={modalDorsal} setOpen={setModalDorsal} data={jugadorSeleccionado} equipoId={data?._id} jugadorId={jugadorSeleccionado?._id} />)}
            {jugadorSeleccionado && (<ModalJugadorCapitan open={modalJugadorCapitan} setOpen={setModalJugadorCapitan} jugador={jugadorSeleccionado} equipoId={data?._id} />)}
            {jugadorSeleccionado && (<ModalJornada open={modalEditarJornada} setOpen={setModalEditarJornada} id={jugadorSeleccionado?._id} equipoId={data?._id} data={jugadorSeleccionado} />)}
            {jugadorSeleccionado && (<ModalJugadorInfo open={modalJugadorInfo} setOpen={setModalJugadorInfo} jugador={jugadorSeleccionado} />)}
        </>
    )
}