import { CircularProgress, Grid, Paper, Table, TableBody, TableContainer, useMediaQuery } from "@mui/material"
import { BsFillCheckCircleFill as Check } from 'react-icons/bs';
import { BsFillXCircleFill as Error } from 'react-icons/bs';
import { AiOutlineMinusCircle as Empate } from 'react-icons/ai';
import { BsFillCircleFill as Neutral } from 'react-icons/bs';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { useContext, useEffect, useState } from "react";
import { ArrowP } from "../Shared/ArrowP";
import { useRouter } from "next/navigation";
import { CustomTableHead } from "./CustomTableHead";
import { TablePosicionesProps } from "@/interfaces";
import { headers } from "@/utils/arrays";
import { UltimateP } from "./UltimateP";
import { LoadingOnly } from "../Shared/LoadingOnly";
import { getLast5ToShow, ordenPosition } from "@/utils";
import Context from "@/context/contextPrincipal";
import StyledTableRow from "../Shared/StyledTableRow";
import StyledTableCell from "../Shared/StyledTableCell";

export const TablePosiciones: React.FC<TablePosicionesProps> = ({ data, titleTable, SubTitle, isLoading }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [showImage, setShowImage] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && data) {
            const timeoutId = setTimeout(() => {
                setShowImage(true);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading, data]);

    return (
        <Grid item container>
            {isLoading || !data ?
                (<Grid item height={mobile ? "55vh" : '50vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px' }}>
                    <LoadingOnly light={light} />
                    Cargando perfil..!
                </Grid>)
                : data?.length === 0 ?
                    <Grid item height={mobile ? "55vh" : '50vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px' }}>
                        <Vacio size={140} />
                        {`No hay equipos en ${titleTable}`}
                    </Grid>
                    :
                    <Grid item container>
                        <Grid item container mb={1} alignItems={'center'} flexDirection={'column'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                            {titleTable}
                            <span style={{ fontSize: '14px', fontWeight: '400' }}>{SubTitle}</span>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <CustomTableHead headers={headers} />
                                <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                                    {data && ordenPosition(data).map((row, index) => {
                                        return (
                                            <StyledTableRow light={light} key={row._id}>
                                                <StyledTableCell light={light} component="th" scope="row">
                                                    <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', whiteSpace: 'nowrap', width: !mobile ? '300px' : '100%' }}>
                                                        <Grid container sx={{ gap: '8px', alignItems: 'center', whiteSpace: 'nowrap', width: '40px' }}>
                                                            {(index + 1 == 1) &&
                                                                <Grid sx={{ background: 'var(--check)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                                            {(index + 1 == 2 || index + 1 == 3 || index + 1 == 4 || index + 1 == 5 || index + 1 == 6 || index + 1 == 7 || index + 1 == 8) &&
                                                                <Grid sx={{ background: 'var(--primario)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                                            {(index + 1 == 13 || index + 1 == 14) &&
                                                                <Grid sx={{ background: 'var(--danger)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                                            {(index + 1 == 9 || index + 1 == 10 || index + 1 == 11 || index + 1 == 12) &&
                                                                <Grid sx={{ background: 'var(--warnning)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                                            <Grid>{index + 1}</Grid>
                                                        </Grid>
                                                        <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: mobile ? '35px' : '55px', height: '30px', cursor: 'pointer' }} onClick={() => { router.push(`/manager/${row._id}`) }}>
                                                            {isLoading || !showImage ?
                                                                (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                                                                : showImage ? <img src={row.logo} alt={row.name} style={{ height: mobile ? '20px' : '35px' }} />
                                                                    : null}
                                                        </Grid>
                                                        <Grid item sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', width: !mobile ? '140px' : '150px', cursor: 'pointer', letterSpacing: mobile ? '1px' : '2px', fontSize: mobile ? '10px' : '14px', fontWeight: '500' }} onClick={() => { router.push(`/manager/${row._id}`) }}>
                                                            {row.name}
                                                            {row.partidosJugados >= 1 &&
                                                                <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap', width: '30px' }}>
                                                                    <ArrowP light={light} currentPos={index} prevPos={row.puntaje_anterior} />
                                                                </Grid>}
                                                        </Grid>
                                                    </Grid>
                                                </StyledTableCell>
                                                <StyledTableCell light={light} align="center" style={{ fontWeight: 700, fontSize: '15px' }}>{row.puntos}</StyledTableCell>
                                                <StyledTableCell light={light} align="center">{row.partidosJugados}</StyledTableCell>
                                                <StyledTableCell light={light} align="center">{row.ganados}</StyledTableCell>
                                                <StyledTableCell light={light} align="center">{row.empates}</StyledTableCell>
                                                <StyledTableCell light={light} align="center">{row.perdidos}</StyledTableCell>
                                                <StyledTableCell light={light} align="center">{row.goles_a_Favor}</StyledTableCell>
                                                <StyledTableCell light={light} align="center">{row.goles_en_Contra}</StyledTableCell>
                                                <StyledTableCell light={light} align="center">{row.diferencia_de_Goles}</StyledTableCell>
                                                <StyledTableCell light={light} align="center"><UltimateP last5={getLast5ToShow(row, 5).reverse()} /></StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris3)' : 'var(--dark4)', width: '100%', mt: 4 }}>
                            <Grid item container flexDirection={'column'}>
                                <Grid item mb={4} sx={{ letterSpacing: '2px', fontSize: mobile ? '12px' : '16px', fontWeight: '600', color: light ? "var(--dark2)" : "var(--cero)" }}>Últimos 5 partidos</Grid>
                                <Grid item container gap={1} sx={{ letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500', color: light ? "var(--dark2)" : "var(--gris)" }}><Check size={20} style={{ color: 'var(--check)' }} /> Gano</Grid>
                                <Grid item container mt={0.5} gap={1} sx={{ letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500', color: light ? "var(--dark2)" : "var(--gris)" }}><Error size={20} style={{ color: 'var(--danger)' }} /> Perdio</Grid>
                                <Grid item container mt={0.5} gap={1} sx={{ letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500', color: light ? "var(--dark2)" : "var(--gris)" }}><Empate size={20} style={{ color: 'var(--neutral)' }} /> Empato</Grid>
                                <Grid item container mt={0.5} gap={1} sx={{ letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500', color: light ? "var(--dark2)" : "var(--gris)" }}><Neutral size={20} style={{ color: 'var(--gris)' }} /> No jugo</Grid>
                            </Grid>
                        </Paper>
                    </Grid>
            }
        </Grid>
    )
}