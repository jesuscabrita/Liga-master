"use client";
import { fetchEquiposSet } from "@/lib";
import { Grid, Paper, useMediaQuery, useTheme } from "@mui/material";
import { SetStateAction, useContext, useState } from "react";
import { TbError404 as Err404 } from 'react-icons/tb';
import { LoadingOnly } from "../Shared/LoadingOnly";
import { MenuTabla } from "../Shared/MenuTabla";
import { TabPanel } from "../Shared/TabPanel";
import { TablePosiciones } from "./TablePosiciones";
import { opcionSelectTabla } from "@/utils/arrays";
import { TableEstadisticas } from "./TableEstadisticas";
import { PlayOff } from "./PlayOff";
import SwipeableViews from "react-swipeable-views";
import Context from "@/context/contextPrincipal";

export const Tables = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [data, setData] = useState([]);
    const { isError, isLoading } = fetchEquiposSet(setData);
    const [value, setValue] = useState(0);
    const theme = useTheme();

    const handleChange = (newValue: SetStateAction<number>) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const filterEstado = (array: any[], estado: string) => {
        const newFilter = array?.filter(data => data.estado == estado);
        return newFilter;
    }

    const filteredData = filterEstado(data, 'registrado');

    return (
        <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 120px 60px 120px", height: '100%' }}>
            <Grid item mt={2} xs={12}>
                <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                    {isLoading ?
                        <Grid item container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={mobile ? "75vh" : '60vh'} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                            <LoadingOnly light={light} />
                            Cargando perfil..!
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
                                    Tablas
                                </Grid>
                                <Grid item container mt={2} xs={12} md={10} alignItems={'center'} justifyContent={'center'}>
                                    <Grid item container mt={4} alignItems={'center'} justifyContent={'center'} sx={{ height: 'min-content' }}>
                                        {opcionSelectTabla?.map(opcion => (
                                            <MenuTabla opcion={opcion} valueSelect={value} handleChange={handleChange} />
                                        ))}
                                        <Grid container sx={{ borderBottom: light ? '2px solid var(--dark2)' : '2px solid var(--gris)', marginTop: '0px' }}></Grid>
                                    </Grid>
                                    <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                                        <TabPanel value={value} index={0} dir={theme.direction}>
                                            <Grid item mt={4} xs={12} md={12} container sx={{ width: '140vh', }} >
                                                <TablePosiciones
                                                    data={filteredData}
                                                    titleTable="Primera"
                                                    SubTitle=""
                                                    isLoading={isLoading}
                                                />
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value={value} index={1} dir={theme.direction}>
                                            <Grid item mt={4} xs={12} md={12} container sx={{ width: '140vh', }} >
                                                <TableEstadisticas
                                                    data={filteredData}
                                                    SubTitle=""
                                                    titleTable="Primera"
                                                    nameEstadistida="Goles"
                                                />
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value={value} index={2} dir={theme.direction}>
                                            <Grid item mt={4} xs={12} md={12} container sx={{ width: '140vh', }} >
                                                <TableEstadisticas
                                                    data={filteredData}
                                                    SubTitle=""
                                                    titleTable="Primera"
                                                    nameEstadistida="Asistencias"
                                                />
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value={value} index={3} dir={theme.direction}>
                                            <Grid item mt={4} xs={12} md={12} container sx={{ width: '140vh', }} >
                                                <TableEstadisticas
                                                    data={filteredData}
                                                    SubTitle=""
                                                    titleTable="Primera"
                                                    nameEstadistida="Amarillas"
                                                />
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value={value} index={4} dir={theme.direction}>
                                            <Grid item mt={4} xs={12} md={12} container sx={{ width: '140vh', }} >
                                                <TableEstadisticas
                                                    data={filteredData}
                                                    SubTitle=""
                                                    titleTable="Primera"
                                                    nameEstadistida="Rojas"
                                                />
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value={value} index={5} dir={theme.direction}>
                                            <Grid item mt={4} xs={12} md={12} container sx={{ width: '140vh', }} >
                                                <PlayOff
                                                    data={filteredData}
                                                    SubTitle=""
                                                    titleTable="Primera"
                                                    nameEstadistida="Play-off"
                                                />
                                            </Grid>
                                        </TabPanel>
                                    </SwipeableViews>
                                </Grid>
                            </Grid>
                    }
                </Paper>
            </Grid>
        </Grid>
    )
}