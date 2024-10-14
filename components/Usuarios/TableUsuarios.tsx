import { stringAvatar } from "@/utils";
import { Avatar, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import { ButtomSend } from "../Shared/ButtonSend";
import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp as ArrowUp } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { GoVerified as Very } from 'react-icons/go';
import { MdAdminPanelSettings } from "react-icons/md";
import { ImNotification } from "react-icons/im";
import { IoIosFootball } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete as Eliminar } from 'react-icons/md';
import { useContext, useState } from "react";
import Context from "@/context/contextPrincipal";
import { alertaQuestion, alertaSubmit } from "@/utils/altert";

interface TableUsuariosProps {
    searchQuery: string;
    queryClient: any;
    eliminarUsuario: any;
    data: { nombre: string; apellido: string; email: string; role: string; foto: string; fecha_de_nacimiento: string; edad: string; categoria: string; subCategoria: string; equipo: string, _id: string; }[]
    setOpenModal: React.Dispatch<React.SetStateAction<any>>;
    setUserSeleccionado: React.Dispatch<React.SetStateAction<any>>;
}

export const TableUsuarios: React.FC<TableUsuariosProps> = ({ data, eliminarUsuario, queryClient, searchQuery, setOpenModal, setUserSeleccionado }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});

    const handleRowClick = (index: number) => {
        setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const seleccionarData = (data: any, setDataSeleccion: any, setModalData: any) => {
        setDataSeleccion(data);
        setModalData(true);
    }

    const eliminarUsuarios = (userId: string, eliminarUser: any, queryClient: any) => {
        alertaQuestion(userId, {}, (userId: string) => {
            eliminarUser({ userId }, {
                onSuccess: (success: { message: string; }) => {
                    queryClient.invalidateQueries(["user"]);
                    alertaSubmit(true, success?.message);
                },
                onError: (err: any) => {
                    const errorMessage = err?.response?.data?.message || err.message;
                    alertaSubmit(false, errorMessage);
                },
            });
        }, 'Si, Eliminar!', 'Eliminado!', 'El usuario ha sido eliminado.', 'El usuario sigue en la liga :)')
    }


    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead sx={{ background: light ? 'var(--dark2)' : 'var(--gris4)' }}>
                    <TableCell sx={{ color: light ? "var(--cero)" : "var(--dark2)", letterSpacing: '2px', fontSize: '18px', fontWeight: '500' }} align="center">Usuarios</TableCell>
                </TableHead>
                {data && data.filter((usuario) => {
                    const fullName = `${usuario.nombre} ${usuario.apellido}`.toLowerCase();
                    const email = usuario.email.toLowerCase();
                    return fullName.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
                }).map((usuario, index) => {
                    const isOpen = openRows[index] || false;
                    return (
                        <TableBody>
                            <TableRow sx={{ '& > *': { borderBottom: 'unset', background: light ? 'var(--gris3)' : 'var(--dark4)', cursor: 'pointer' } }}>
                                <TableCell sx={{ color: light ? 'var(--dark2)' : 'var(--gris)', whiteSpace: 'nowrap' }}>
                                    <Grid container width={'280px'} flexDirection={'row'} alignItems={'center'}>
                                        <Grid item>
                                            <IconButton aria-label="expand row" size="small" sx={{ color: light ? 'black' : 'var(--cero)' }} onClick={() => handleRowClick(index)}>
                                                {isOpen ? <ArrowUp /> : <ArrowDown />}
                                            </IconButton>
                                        </Grid>
                                        <Grid item width={'240px'} container gap={1} flexDirection={'row'} alignItems={'center'} justifyContent={'start'} sx={{ marginLeft: '6px' }}>
                                            <Avatar {...stringAvatar(usuario?.nombre)} sx={{ height: '35px', width: '35px', background: !light ? '#aab4be' : '#1F2937', color: !light ? '#1F2937' : 'white' }} />
                                            <Grid item sx={{ fontSize: mobile ? '14px' : '16px', letterSpacing: '2px', fontWeight: '500' }}>{`${usuario?.nombre} ${usuario?.apellido}`}</Grid>
                                            {usuario?.role === 'usuario' ?
                                                <FaUserCheck size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                                                : usuario?.role === 'super_admin' ? <Very size={25} color={'var(--check)'} /> : <MdAdminPanelSettings size={25} color={light ? "var(--dark2)" : "var(--cero)"} />}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: light ? 'var(--gris3)' : 'var(--dark4)', borderColor: light ? 'var(--dark2)' : 'var(--gris)' }} colSpan={8}>
                                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                        <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ padding: mobile ? '0px' : '20px', paddingTop: '20px', paddingBottom: '20px' }}>
                                            <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                                                {usuario?.foto === 'no definida' ?
                                                    <Grid item container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} gap={2} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '16px', fontWeight: '500' }}>
                                                        <ImNotification size={mobile ? 50 : 100}  color="var(--warnning)"/>
                                                        {'No ha registrado su equipo'}
                                                    </Grid>
                                                    : <img style={{ height: mobile ? '100px' : '180px', marginTop: mobile ? '0px' : '0px', marginBottom: mobile ? '20px' : '120px' }} src={usuario?.foto} alt="logoEquipo" />}
                                            </Grid>
                                            <Grid item md={6} gap={2} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ padding: mobile ? '0px' : '20px', paddingTop: mobile ? '20px' : '0px' }}>
                                                <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                                                    {`${usuario?.nombre} ${usuario?.apellido}`}
                                                </Grid>
                                                <Grid item container alignItems={'center'} justifyContent={'center'} gap={1} mt={2}>
                                                    <Grid item container alignItems={'center'} justifyContent={'center'} gap={1} mt={-1.5} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                                        <span style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>Tipo de usuario</span>{usuario?.role === 'usuario' ? 'User basico' : usuario?.role === 'super_admin' ? 'Super admin' : 'Admin'}
                                                        {usuario?.role === 'usuario' ?
                                                            <FaUserCheck size={20} color={light ? "var(--dark2)" : "var(--cero)"} />
                                                            : usuario?.role === 'super_admin' ? <Very size={20} color={'var(--check)'} /> : <MdAdminPanelSettings size={20} color={light ? "var(--dark2)" : "var(--cero)"} />}
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
                                                        {`Tiene ${usuario?.edad} años`}
                                                    </Grid>
                                                </Grid>
                                                <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                                    <Grid item container alignItems={'center'} justifyContent={'center'} gap={1} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                                        <span style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>Equipo</span>{usuario?.equipo} <IoIosFootball size={18} color={light ? "var(--dark2)" : "var(--cero)"} />
                                                    </Grid>
                                                </Grid>
                                                <Grid item container mt={2}>
                                                    <ButtomSend
                                                        title="Editar"
                                                        handleclick={() => { seleccionarData(usuario, setUserSeleccionado, setOpenModal) }}
                                                        icon={FaUserEdit}
                                                    />
                                                </Grid>
                                                <Grid item container>
                                                    <ButtomSend
                                                        type="danger"
                                                        title="Eliminar"
                                                        handleclick={() => { eliminarUsuarios(usuario?._id, eliminarUsuario, queryClient) }}
                                                        icon={Eliminar}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )
                })}
            </Table>
        </TableContainer>
    )
}