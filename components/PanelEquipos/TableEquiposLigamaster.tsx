import { Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import { ModalEditarEquipo } from "../Modals/Equipos/ModalEditarEquipo";
import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp as ArrowUp } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { equiposEstadosPut } from "@/services/equipos";
import { editarEstadoSuspender } from "@/lib/equipos";
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { ButtomSend } from "../Shared/ButtonSend";
import { dataModalProps } from "@/interfaces";
import { useContext, useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { seleccionarData } from "@/utils";
import Context from "@/context/contextPrincipal";

export const TableEquiposLigamaster = ({ dataEquipos }: { dataEquipos: any[]; }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});
    const [modalEdit, setModalEdit] = useState(false);
    const { mutate: editarEstados } = useMutation(equiposEstadosPut);
    const queryClient = useQueryClient();
    const [equipoSeleccionado, setEquipoSeleccionado] = useState<dataModalProps | null>(null);

    const handleRowClick = (index: number) => {
        setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <Grid item container>
            {dataEquipos?.length === 0 ?
                <Grid item container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={mobile ? "75vh" : '60vh'} sx={{ color: light ? "var(--dark2)" : "var(--gris)", textAlign: 'center' }}>
                    <Vacio size={140} />
                    No hay equipos en la Ligamaster
                </Grid>
                : <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead sx={{ background: light ? 'var(--dark2)' : 'var(--gris4)' }}>
                            <TableCell sx={{ color: light ? "var(--cero)" : "var(--dark2)", letterSpacing: '2px', fontSize: '18px', fontWeight: '500' }} align="center">Equipos en Liga master</TableCell>
                        </TableHead>
                        {dataEquipos && dataEquipos?.map((equipo, index) => {
                            const isOpen = openRows[index] || false;
                            return (
                                <TableBody>
                                    <TableRow sx={{ '& > *': { borderBottom: 'unset', background: light ? 'var(--gris3)' : 'var(--dark4)', cursor: 'pointer' } }}>
                                        <TableCell sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', whiteSpace: 'nowrap' }}>
                                            <Grid container width={'340px'} flexDirection={'row'} alignItems={'center'}>
                                                <Grid item>
                                                    <IconButton aria-label="expand row" size="small" sx={{ color: light ? 'black' : 'var(--cero)' }} onClick={() => handleRowClick(index)}>
                                                        {isOpen ? <ArrowUp /> : <ArrowDown />}
                                                    </IconButton>
                                                </Grid>
                                                <Grid item width={'280px'} container gap={1} flexDirection={'row'} alignItems={'center'} justifyContent={'start'} sx={{ marginLeft: '6px' }}>
                                                    <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '55px', height: '35px' }}>
                                                        <img src={equipo?.logo} alt={equipo?.name} style={{ height: '35px' }} />
                                                    </Grid>
                                                    <Grid item sx={{ fontSize: mobile ? '12px' : '16px', letterSpacing: '2px', fontWeight: '500' }}>{equipo?.name}</Grid>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: light ? 'var(--gris3)' : 'var(--dark4)', borderColor: light ? 'var(--dark2)' : 'var(--gris)' }} colSpan={8}>
                                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ padding: mobile ? '0px' : '20px', paddingTop: '20px', paddingBottom: '20px' }}>
                                                    <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                                                        <img src={equipo?.logo} alt={equipo?.name} style={{ height: mobile ? '100px' : '180px', marginTop: mobile ? '0px' : '0px', marginBottom: mobile ? '20px' : '120px' }} />
                                                    </Grid>
                                                    <Grid item md={6} gap={2} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ padding: mobile ? '0px' : '20px', paddingTop: mobile ? '20px' : '0px' }}>
                                                        <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                                                            {equipo?.name}
                                                        </Grid>
                                                        <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                                            <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>
                                                                Email
                                                            </Grid>
                                                            <Grid item mt={0.4} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                                                {equipo?.correo}
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                                            <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>
                                                                Categoria
                                                            </Grid>
                                                            <Grid item mt={0.4} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                                                {equipo?.categoria}
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item container>
                                                            <ButtomSend
                                                                type="warnning"
                                                                title="Suspender"
                                                                icon={FaPowerOff}
                                                                handleclick={() => {
                                                                    editarEstadoSuspender(
                                                                        equipo?._id,
                                                                        "enCola",
                                                                        editarEstados,
                                                                        queryClient,
                                                                        equipo?.subCategoria,
                                                                    )
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item container>
                                                            <ButtomSend
                                                                title="Editar"
                                                                icon={FaUserEdit}
                                                                handleclick={() => {
                                                                    seleccionarData(
                                                                        equipo,
                                                                        setEquipoSeleccionado,
                                                                        setModalEdit
                                                                    )
                                                                }}
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
                </TableContainer>}
            {modalEdit && equipoSeleccionado && <ModalEditarEquipo open={modalEdit} setOpen={setModalEdit} data={equipoSeleccionado} />}
        </Grid>
    )
}