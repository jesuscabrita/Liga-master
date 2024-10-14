"use client";
import { Grid, Pagination, Paper, useMediaQuery } from "@mui/material";
import { filterEstado, generateCalendar } from "@/utils";
import { TbError404 as Err404 } from 'react-icons/tb';
import { LoadingOnly } from "../Shared/LoadingOnly";
import { useContext, useState } from "react";
import { fetchEquiposSet } from "@/lib";
import { PanelRow } from "./PanelRow";
import { Match } from "@/interfaces";
import Context from "@/context/contextPrincipal";

export const PanelPartidos = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [data, setData] = useState([]);
    const [currentRound, setCurrentRound] = useState(0);
    const { isLoading, isError } = fetchEquiposSet(setData)
    const matches: Match[][] = generateCalendar(filterEstado(data, 'registrado'));

    const handleRoundChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentRound(value - 1);
    };

    return (
        <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 120px 60px 120px", height: '100%' }}>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                    {isLoading ?
                        <Grid item container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={mobile ? "75vh" : '60vh'} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                            <LoadingOnly light={light} />
                            Cargando Panel..!
                        </Grid>
                        : isError ?
                            <Grid item container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={mobile ? "75vh" : '60vh'} sx={{ color: light ? "var(--dark2)" : "var(--gris)", textAlign: 'center' }}>
                                <Err404 size={140} />
                                Ha ocurrido un error al cargar el panel
                            </Grid>
                            :
                            <Grid item container alignItems={'center'} justifyContent={'center'}>
                                <Grid item container alignItems={'center'} justifyContent={'center'}>
                                    <img style={{ height: mobile ? '140px' : '150px' }} src={`/images/${light ? 'logoLight.png' : 'logoDark1.png'}`} alt="logo" />
                                </Grid>
                                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                                    Panel Partidos
                                </Grid>
                                <Grid item container mt={2} xs={12} md={9} alignItems={'center'} justifyContent={'center'}>
                                    <Grid container sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', borderRadius: '10px' }}>
                                        {matches[currentRound]?.map((match, index) => {
                                            const homeTeam = filterEstado(data, 'registrado').find(team => team._id === match.homeTeam);
                                            const awayTeam = filterEstado(data, 'registrado').find(team => team._id === match.awayTeam);
                                            return (
                                                <>
                                                    <PanelRow
                                                        index={index}
                                                        awayTeam={awayTeam}
                                                        homeTeam={homeTeam}
                                                        currentRound={currentRound}
                                                        data={filterEstado(data, 'registrado')}
                                                        isLoading={isLoading} />
                                                </>
                                            )
                                        })}
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
                            </Grid>
                    }
                </Paper>
            </Grid>
        </Grid>
    )
}