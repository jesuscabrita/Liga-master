"use client";
import Link from "next/link";
import { fetchEquipos } from "@/lib";
import { filterEstado } from "@/utils";
import { useContext, useState } from "react";
import { LoadingOnly } from "../Shared/LoadingOnly";
import { TbError404 as Err404 } from 'react-icons/tb';
import { TbMoodEmptyFilled as Vacio } from 'react-icons/tb';
import { Box, Grid, Tabs, useMediaQuery } from "@mui/material";
import Context from "@/context/contextPrincipal";

export const CarrouselEquipos = () => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [valueTabs, setValueTabs] = useState(0);
    const { isLoading, isError, data } = fetchEquipos()

    return (
        <Grid item container>
            <Grid container columnSpacing={4} alignItems={'center'} justifyContent={'center'} sx={{ paddingTop: '80px' }}>
                {isLoading ?
                    <Grid item container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                        <LoadingOnly light={light} />
                        Cargando equipos..!
                    </Grid>
                    : isError ?
                        <Grid item container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                            <Err404 size={85} />
                            Ha ocurrido un error al cargar los equipos
                        </Grid>
                        : filterEstado(data, 'registrado').length === 0 ?
                            <Grid item container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                                <Vacio size={85} />
                                No hay equipos en la liga
                            </Grid>
                            :
                            <Box sx={{ overflowX: 'auto' }}>
                                <Tabs
                                    value={valueTabs}
                                    onChange={(_, newValue) => setValueTabs(newValue)}
                                    variant="scrollable"
                                    allowScrollButtonsMobile={true}
                                    scrollButtons='auto'
                                    sx={{
                                        width: 'inherit',
                                        flexGrow: 1,
                                        paddingLeft: '20px',
                                        '& .MuiSvgIcon-fontSizeSmall': { color: light ? 'black' : 'white' },
                                        '& .MuiTabs-flexContainer': { gap: '16px' },
                                        '& .MuiTabs-indicator': { backgroundColor: 'inherit' }
                                    }}>
                                    <>
                                        {filterEstado(data, 'registrado').map((equipo) => (
                                            <Link href={`/manager/${equipo._id}`} key={equipo._id}>
                                                <Grid sx={{
                                                    display: "flex", padding: mobile ? '2px' : "10px", minHeight: mobile ? '65px' : "120px", minWidth: mobile ? '65px' : "140px", justifyContent: "center", alignItems: 'center',
                                                    "&:hover": { background: !light ? "var(--dark2)" : "var(--gris)", borderRadius: "16px", },
                                                }}>
                                                    <img src={equipo.logo} alt={equipo.name} style={{ height: mobile ? '40px' : "80px", cursor: "pointer" }} />
                                                </Grid>
                                            </Link>
                                        ))}
                                    </>
                                </Tabs>
                            </Box>
                }
            </Grid>
        </Grid>
    )
}