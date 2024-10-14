"use client";
import { Avatar, Grid, Paper, useMediaQuery } from "@mui/material"
import { ButtomSend } from "../Shared/ButtonSend";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowAltCircleLeft as Atras } from 'react-icons/fa';
import { FaUserCheck } from "react-icons/fa";
import { GoVerified as Very } from 'react-icons/go';
import { IoIosFootball } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { ImNotification } from "react-icons/im";
import { TbError404 as Err404 } from 'react-icons/tb';
import { ContextType } from "@/interfaces";
import { fetchUserGetById } from "@/lib";
import { LoadingOnly } from "../Shared/LoadingOnly";
import { ModalEditarPerfil } from "../Modals/User/ModalEditarPerfil";
import ContextRefac from "@/context/contextLogin";
import Context from "@/context/contextPrincipal";

export const PerfilInfo = () => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { state: { user } } = useContext(ContextRefac) as ContextType;
    const router = useRouter();
    const [modalEditar, setModalEditar] = useState(false);
    const { data, isLoading, isError } = fetchUserGetById(user?._id)
    const usuario = data?.data?.data;

    const handleAtrasClick = () => {
        router.back();
    };

    const handleEditar = () => {
        setModalEditar(!modalEditar)
    }

    return (
        <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "100px 200px 60px 200px", height: '100%' }}>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                    {isLoading ?
                        <Grid item container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={mobile ? "75vh" : '60vh'} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                            <LoadingOnly light={light} />
                            Cargando perfil..!
                        </Grid>
                        : isError ?
                            <Grid item container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={mobile ? "75vh" : '60vh'} sx={{ color: light ? "var(--dark2)" : "var(--gris)", textAlign: 'center' }}>
                                <Err404 size={140} />
                                Ha ocurrido un error al cargar del perfil
                            </Grid>
                            : <Grid item container>
                                <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                                    <Grid width={'100%'} sx={{ display: 'flex' }}>
                                        <Grid sx={{ paddingLeft: !mobile ? '80px' : '16px' }}>
                                            <Atras size={30} style={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)' }} onClick={handleAtrasClick} />
                                        </Grid>
                                    </Grid>
                                    {usuario?.foto === 'no definida' || usuario?.foto === '' ?
                                        <Grid item container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} gap={2} mt={mobile ? 4 : -26} mb={mobile ? 4 : 0} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '16px', fontWeight: '500' }}>
                                            <ImNotification size={mobile ? 50 : 100} />
                                            {'No has registrado tu equipo'}
                                        </Grid>
                                        : <img style={{ height: mobile ? '100px' : '180px', marginTop: mobile ? '0px' : '0px', marginBottom: mobile ? '40px' : '120px' }} src={usuario?.foto} alt="logoEquipo" />}
                                </Grid>
                                <Grid item md={6} gap={2} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ padding: '20px' }}>
                                    <Avatar alt={`${usuario?.nombre} ${usuario?.apellido}`} src={''} sx={{ width: 100, height: 100, marginBottom: 5, background: !light ? '#aab4be' : '#1F2937', color: !light ? '#1F2937' : 'white' }} />
                                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                                        {`${usuario?.nombre} ${usuario?.apellido}`}
                                    </Grid>
                                    <Grid item container alignItems={'center'} justifyContent={'center'} gap={1} mt={2}>
                                        <Grid item container alignItems={'center'} justifyContent={'center'} gap={1} mt={-1.5} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                            <span style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>Tipo de usuario</span>{usuario?.role === 'usuario' ? 'User basico' : usuario?.role === 'super_admin' ? 'Super admin' : 'Admin'}
                                            {usuario?.role === 'usuario' ?
                                                <FaUserCheck size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                                                : usuario?.role === 'super_admin' ? <Very size={25} color={'var(--check)'} /> : <MdAdminPanelSettings size={25} color={light ? "var(--dark2)" : "var(--cero)"} />}
                                        </Grid>
                                    </Grid>
                                    <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                        <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>
                                            Email
                                        </Grid>
                                        <Grid item sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                            {usuario?.email}
                                        </Grid>
                                    </Grid>
                                    <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                        <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>
                                            Fecha de nacimiento
                                        </Grid>
                                        <Grid item sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                            {usuario?.fecha_de_nacimiento}
                                        </Grid>
                                    </Grid>
                                    <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                        <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>
                                            Edad
                                        </Grid>
                                        <Grid item sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                            {`Tienes ${usuario?.edad} años`}
                                        </Grid>
                                    </Grid>
                                    <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                        <Grid item container alignItems={'center'} justifyContent={'center'} gap={1} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                            <span style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>Tu equipo</span>{usuario?.equipo} <IoIosFootball size={20} color={light ? "var(--dark2)" : "var(--cero)"} />
                                        </Grid>
                                    </Grid>
                                    <Grid item container mt={2}>
                                        <ButtomSend
                                            title="Editar"
                                            handleclick={handleEditar}
                                            icon={FaUserEdit}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>}
                </Paper>
            </Grid>
            {modalEditar && <ModalEditarPerfil open={modalEditar} setOpen={setModalEditar} data={usuario} />}
        </Grid>
    )
}