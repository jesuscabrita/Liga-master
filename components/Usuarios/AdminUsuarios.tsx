"use client";
import { fetchUserGet } from "@/lib";
import { Grid, Paper, useMediaQuery } from "@mui/material"
import { TableUsuarios } from "./TableUsuarios"
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { userDelete } from "@/services/user";
import { InputBuscador } from "../Shared/InputBuscador";
import { LoadingOnly } from "../Shared/LoadingOnly";
import { TbError404 as Err404 } from 'react-icons/tb';
import { ModalUser } from "../Modals/User/ModalUser";
import { UsuariosPageProps } from "@/interfaces";
import Context from "@/context/contextPrincipal";

export const AdminUsuarios = () => {
    const [light] = useContext(Context);
    const [searchQuery, setSearchQuery] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [userSeleccionado, setUserSeleccionado] = useState<UsuariosPageProps | null>(null);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const queryClient = useQueryClient();
    const { mutate: eliminarUsuario } = useMutation(userDelete);
    const { isLoading, isError, data } = fetchUserGet()

    return (
        <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 120px 60px 120px", height: '100%' }}>
            <Grid item mt={6} xs={12}>
                <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                    {isLoading ?
                        <Grid item container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={mobile ? "75vh" : '60vh'} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                            <LoadingOnly light={light} />
                            Cargando usuarios..!
                        </Grid>
                        : isError ?
                            <Grid item container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={mobile ? "75vh" : '60vh'} sx={{ color: light ? "var(--dark2)" : "var(--gris)", textAlign: 'center' }}>
                                <Err404 size={140} />
                                Ha ocurrido un error al cargar los usuarios
                            </Grid>
                            : <Grid item container alignItems={'center'} justifyContent={'center'}>
                                <Grid item container alignItems={'center'} justifyContent={'center'}>
                                    <img style={{ height: mobile ? '140px' : '150px' }} src={`/images/${light ? 'logoLight.png' : 'logoDark1.png'}`} alt="logo" />
                                </Grid>
                                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                                    Administrar usuarios
                                </Grid>
                                <Grid item container xs={12} md={9} alignItems={'center'} justifyContent={'center'}>
                                    <InputBuscador
                                        title="Buscar"
                                        descripcion="Buscar por nombre, apellido o email"
                                        placeholder="Buscar por nombre, apellido o email"
                                        setValue={setSearchQuery}
                                        value={searchQuery}
                                    />
                                </Grid>
                                <Grid item container mt={2} xs={12} md={9} alignItems={'center'} justifyContent={'center'}>
                                    <TableUsuarios
                                        data={data?.data}
                                        eliminarUsuario={eliminarUsuario}
                                        queryClient={queryClient}
                                        searchQuery={searchQuery}
                                        setOpenModal={setOpenModal}
                                        setUserSeleccionado={setUserSeleccionado}
                                    />
                                </Grid>
                            </Grid>}
                </Paper>
            </Grid>
            {openModal && userSeleccionado && <ModalUser open={openModal} setOpen={setOpenModal} data={userSeleccionado} />}
        </Grid>
    )
}