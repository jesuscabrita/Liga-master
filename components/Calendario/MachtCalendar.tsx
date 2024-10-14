"use client";
import { Grid, Pagination, Paper, Table, TableBody, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import { filterEstado, generateCalendar } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { ContextType, Match, Team } from "@/interfaces";
import { TbError404 as Err404 } from 'react-icons/tb';
import { LoadingOnly } from "../Shared/LoadingOnly";
import { fetchEquiposSet } from "@/lib";
import { Row } from "./Row";
import StyledTableCell from "../Shared/StyledTableCell";
import ContextRefac from "@/context/contextLogin";
import Context from "@/context/contextPrincipal";

export const MachtCalendar = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const { state: { user } } = useContext(ContextRefac) as ContextType;
    const [data, setData] = useState<Team[]>([]);
    const { isLoading, isError } = fetchEquiposSet(setData);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const matches: Match[][] = generateCalendar(filterEstado(data, 'registrado'));

    const handleRoundChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentRound(value - 1);
    };

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
                            Cargando Calendario..!
                        </Grid>
                        : isError ?
                            <Grid item container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={mobile ? "75vh" : '60vh'} sx={{ color: light ? "var(--dark2)" : "var(--gris)", textAlign: 'center' }}>
                                <Err404 size={140} />
                                Ha ocurrido un error al cargar del equipo
                            </Grid>
                            :
                            <Grid item container alignItems={'center'} justifyContent={'center'}>
                                <Grid item container alignItems={'center'} justifyContent={'center'}>
                                    <img style={{ height: mobile ? '140px' : '150px' }} src={`/images/${light ? 'logoLight.png' : 'logoDark1.png'}`} alt="logo" />
                                </Grid>
                                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                                    Calendario
                                </Grid>
                                <Grid item sx={{ fontSize: '16px', color: light ? 'black' : 'var(--cero)' }}>Jornada {currentRound + 1}</Grid>
                                <Grid container mt={2} alignItems={'center'} justifyContent={'center'}>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="collapsible table">
                                            <TableHead>
                                                <TableRow>
                                                    {!mobile && <StyledTableCell light={light} align="center">Fecha</StyledTableCell>}
                                                    {mobile && isUserAdmin && <StyledTableCell light={light} align="center">Fecha</StyledTableCell>}
                                                    {!mobile && <StyledTableCell light={light} align="center">Ubicacion</StyledTableCell>}
                                                    <StyledTableCell light={light} align="center">Partidos</StyledTableCell>
                                                    {!mobile && <StyledTableCell light={light} align="center">Arbitro</StyledTableCell>}
                                                    {mobile && isUserAdmin && <StyledTableCell light={light} align="center">Arbitro</StyledTableCell>}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {matches[currentRound]?.map((match, index) => {
                                                    const homeTeam = filterEstado(data, 'registrado').find(team => team._id === match.homeTeam);
                                                    const awayTeam = filterEstado(data, 'registrado').find(team => team._id === match.awayTeam);
                                                    return (
                                                        <Row
                                                            key={index}
                                                            homeTeam={homeTeam}
                                                            awayTeam={awayTeam}
                                                            currentRound={currentRound}
                                                            isLoading={isLoading}
                                                        />
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid container mt={2} justifyContent={mobile ? 'center' : "end"} alignItems="center">
                                    <Pagination
                                        sx={{
                                            '& .MuiButtonBase-root': {
                                                color: !light ? "var(--cero) !important" : "var(--dark2) !important",
                                            },
                                            '& .Mui-selected': {
                                                background: light ? 'var(--dark2) !important' : 'var(--gris4) !important',
                                                color: light ? "var(--cero) !important" : "var(--dark) !important",
                                            }
                                        }}
                                        count={matches.length}
                                        page={currentRound + 1}
                                        onChange={handleRoundChange}
                                        color="primary"
                                        size={mobile ? "small" : 'medium'}
                                    />
                                </Grid>
                            </Grid>
                    }
                </Paper >
            </Grid>
        </Grid>
    )
}