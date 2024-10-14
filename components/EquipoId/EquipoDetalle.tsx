"use client";
import { ContextType } from "@/interfaces";
import { Grid, Paper, useMediaQuery } from "@mui/material"
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { LoadingOnly } from "../Shared/LoadingOnly";
import { TbError404 as Err404 } from 'react-icons/tb';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { filterEstado, ordenPosition } from "@/utils";
import { DelegadoDelete } from "@/services/delegado";
import { ModalDelegado } from "../Modals/Delegados/ModalDelegado";
import { DatosEquipo } from "./DatosEquipo";
import { ModalDelegadoEditar } from "../Modals/Delegados/ModalDelegadoEdit";
import { AccionesAdmin } from "./AccionesAdmin";
import { ModalChatDelegado } from "../Modals/Delegados/ModalChat";
import { Plantillas } from "./Plantillas";
import { LoadingScreen } from "../Shared/LoadingScreen";
import { ModalCrearJugador } from "../Modals/Jugadores/ModalCrearJugador";
import { fetchEquiposById, fetchEquiposSet } from "@/lib";
import ContextRefac from "@/context/contextLogin";
import Context from "@/context/contextPrincipal";

export const EquipoDetalle = () => {
    const { equipo_id } = useParams();
    const { state: { user } } = useContext(ContextRefac) as ContextType;
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { data, isLoading, isError } = fetchEquiposById(equipo_id)
    const [equipo, setEquipo] = useState([]);
    const equipoIndex = ordenPosition(filterEstado(equipo, 'registrado')).findIndex((equipo) => equipo?._id === equipo_id);
    const [light] = useContext(Context);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [isSameEmail, setIsSameEmail] = useState(false);
    const { mutate: eliminarDelegado } = useMutation(DelegadoDelete);
    const queryClient = useQueryClient();
    const [modalDelegado, setModalDelegado] = useState(false);
    const [modalDelegadoEditar, setModalDelegadoEditar] = useState(false);
    const [delegadoSeleccionado, setDelegadoSeleccionado] = useState(null);
    const [modalDelegadoChat, setModalDelegadoChat] = useState(false);
    const [value, setValue] = useState(0);
    const [isLoadinng, setIsLoadinng] = useState(false);
    const [modalJugador, setModalJugador] = useState(false);
    fetchEquiposSet(setEquipo);

    useEffect(() => {
        if (user?.email === data?.equipo.correo) {
            setIsSameEmail(true);
        } else {
            setIsSameEmail(false);
        }
    }, [user, data]);

    useEffect(() => {
        setIsUserAdmin(user?.role === 'super_admin' || user?.role === 'admin');
    }, [user]);

    return (
        <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 120px 60px 120px", height: '100%' }}>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                    {isLoading ?
                        <Grid item container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={mobile ? "75vh" : '60vh'} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                            <LoadingOnly light={light} />
                            Cargando perfil..!
                        </Grid>
                        : !data?.equipo ?
                            <Grid item height={mobile ? "75vh" : '65vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? 'var(--dark2)' : 'var(--cero)', gap: '16px' }}>
                                <Vacio size={140} />
                                {`No se encontró el equipo con el ID: ${equipo_id}`}
                            </Grid>
                            : isError ?
                                <Grid item container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={mobile ? "75vh" : '60vh'} sx={{ color: light ? "var(--dark2)" : "var(--gris)", textAlign: 'center' }}>
                                    <Err404 size={140} />
                                    Ha ocurrido un error al cargar del equipo
                                </Grid>
                                :
                                <Grid item container>
                                    <DatosEquipo
                                        data={data}
                                        eliminarDelegado={eliminarDelegado}
                                        equipoIndex={equipoIndex}
                                        equipo_id={equipo_id}
                                        isSameEmail={isSameEmail}
                                        isUserAdmin={isUserAdmin}
                                        queryClient={queryClient}
                                        setDelegadoSeleccionado={setDelegadoSeleccionado}
                                        setModalDelegadoChat={setModalDelegadoChat}
                                        setModalDelegadoEditar={setModalDelegadoEditar}
                                    />
                                    {(isUserAdmin || isSameEmail) &&
                                        <AccionesAdmin
                                            data={data}
                                            modalDelegado={modalDelegado}
                                            setModalDelegado={setModalDelegado}
                                            modalJugador={modalJugador}
                                            setModalJugador={setModalJugador}
                                        />}
                                </Grid>
                    }
                </Paper >
                <Plantillas
                    setValue={setValue}
                    value={value}
                    data={data?.equipo && data?.equipo}
                    isSameEmail={isSameEmail}
                    isUserAdmin={isUserAdmin}
                    queryClient={queryClient}
                    equipo_id={equipo_id}
                    setIsLoadinng={setIsLoadinng}
                />
            </Grid>
            {isLoadinng && <LoadingScreen />}
            {modalJugador && <ModalCrearJugador open={modalJugador} setOpen={setModalJugador} id={data?.equipo._id} />}
            {modalDelegado && <ModalDelegado open={modalDelegado} setOpen={setModalDelegado} id={data?.equipo._id} />}
            {delegadoSeleccionado && <ModalDelegadoEditar open={modalDelegadoEditar} setOpen={setModalDelegadoEditar} id={data?.equipo._id} data={data?.equipo.delegado[0]} />}
            {delegadoSeleccionado && <ModalChatDelegado open={modalDelegadoChat} setOpen={setModalDelegadoChat} data={data?.equipo.delegado[0]} />}
        </Grid>
    )
}