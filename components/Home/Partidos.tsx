"use client";
import { filterEstado, generateCalendar, isToday } from "@/utils";
import { Box, Grid, Tabs, useMediaQuery } from "@mui/material"
import { TbMoodEmptyFilled as Vacio } from 'react-icons/tb';
import { useContext, useState } from "react";
import { InfoPartido } from "./InfoPartido";
import { Match, Team } from "@/interfaces";
import { fetchEquiposSet } from "@/lib";
import Context from "@/context/contextPrincipal";

export const Partidos = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [currentRound, setCurrentRound] = useState(0);
    const [data, setData] = useState<Team[]>([]);
    const { isLoading, isError } = fetchEquiposSet(setData);
    const matches: Match[][] = generateCalendar(filterEstado(data, 'registrado'));
    const [valueTabs, setValueTabs] = useState(0);
    const partidosHoy = matches[currentRound]?.filter((match) => {
        return isToday(match.fecha);
    }) || [];

    return (
        <Grid item container>
            <Grid item container justifyContent={'center'} mt={5} mb={2} ml={mobile ? 2 : 5} mr={mobile ? 2 : 5} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', fontSize: '16px', background: light ? 'var(--gris)' : 'var(--dark2)', padding: '10px', borderRadius: '4px' }}>
                Partios de hoy
            </Grid>
            {partidosHoy.length === 0 &&
                <Grid item container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                    <Vacio size={55} />
                    No hay partidos hoy
                </Grid>}
            <Box sx={{ overflowX: 'auto', mb: 6, }}>
                <Tabs
                    value={valueTabs}
                    onChange={(_, newValue) => setValueTabs(newValue)}
                    variant="scrollable"
                    allowScrollButtonsMobile={true}
                    scrollButtons='auto'
                    sx={{
                        width: 'inherit',
                        flexGrow: 1,
                        paddingLeft: mobile || partidosHoy.length > 3 ? '0px' : '40px',
                        '& .MuiSvgIcon-fontSizeSmall': { color: light ? 'black' : 'white' },
                        '& .MuiTabs-flexContainer': { gap: '16px' },
                        '& .MuiTabs-indicator': { backgroundColor: 'inherit' },
                        '& .MuiTabScrollButton-root': {
                            width: mobile ? '20px' : 'none'
                        }
                    }}>
                    <>
                        {partidosHoy.map((match, index) => {
                            const homeTeam = filterEstado(data, 'registrado').find(team => team._id === match.homeTeam);
                            const awayTeam = filterEstado(data, 'registrado').find(team => team._id === match.awayTeam);
                            return (
                                <InfoPartido
                                    key={index}
                                    homeTeam={homeTeam}
                                    awayTeam={awayTeam}
                                    currentRound={currentRound}
                                    isLoading={isLoading} />
                            );
                        })
                        }
                    </>
                </Tabs>
            </Box>
        </Grid>
    )
}