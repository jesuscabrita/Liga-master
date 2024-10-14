"use client";
import { TableEquiposLigamaster } from "./TableEquiposLigamaster";
import { Grid, Paper, useMediaQuery, useTheme } from "@mui/material"
import { SetStateAction, useContext, useState } from "react";
import { TableEquiposCola } from "./TableEquiposCola";
import { TbError404 as Err404 } from 'react-icons/tb';
import { opcionSelectEquipos } from "@/utils/arrays";
import { LoadingOnly } from "../Shared/LoadingOnly";
import { MenuTabla } from "../Shared/MenuTabla";
import { PanelAcciones } from "./PanelAcciones";
import { TabPanel } from "../Shared/TabPanel";
import { fetchEquiposSet } from "@/lib";
import { filterEstado } from "@/utils";
import SwipeableViews from "react-swipeable-views";
import Context from "@/context/contextPrincipal";

export const PanelEquiposAdmin = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [value, setValue] = useState(0);
    const [data, setData] = useState([]);
    const theme = useTheme();
    const { isLoading, isError } = fetchEquiposSet(setData);

    const handleChange = (newValue: SetStateAction<number>) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const filterEstadoCategoria = (array: any[], estado: string, subCategoria: string) => {
        const newFilter = array?.filter(data => data.estado == estado && data.subCategoria === subCategoria);
        return newFilter;
    }

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
                                    Panel equipos
                                </Grid>
                                <Grid item container mt={2} xs={12} md={9} alignItems={'center'} justifyContent={'center'}>
                                    <Grid item container mt={4} alignItems={'center'} justifyContent={'center'} sx={{ height: 'min-content' }}>
                                        {opcionSelectEquipos?.map(opcion => (
                                            <MenuTabla opcion={opcion} valueSelect={value} handleChange={handleChange} />
                                        ))}
                                        <Grid container sx={{ borderBottom: light ? '2px solid var(--dark2)' : '2px solid var(--gris)', marginTop: '0px' }}></Grid>
                                    </Grid>
                                    <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                                        <TabPanel value={value} index={0} dir={theme.direction}>
                                            <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                                <TableEquiposLigamaster dataEquipos={filterEstadoCategoria(data, 'registrado', 'Primera')} />
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value={value} index={1} dir={theme.direction}>
                                            <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                                <TableEquiposCola dataEquiposLiga={filterEstado(data, 'enCola')} />
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value={value} index={2} dir={theme.direction}>
                                            <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                                <PanelAcciones data={data} />
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