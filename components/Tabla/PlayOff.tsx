import Context from "@/context/contextPrincipal";
import { Grid, Paper, useMediaQuery } from "@mui/material"
import { useContext } from "react";
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { BsFillShieldFill as Time } from 'react-icons/bs';

interface Equipo {
    logo: string;
    name: string;
    partidos: number;
    statusPlayOff: any;
    isChampion?: boolean;
}

interface Enfrentamiento {
    0: Equipo;
    1: Equipo;
}

interface Data {
    logo: string;
    name: string;
    statusPlayOff: string;
    isChampion?: boolean;
}

interface PlayOffProps {
    data: Data[];
    titleTable: string;
    SubTitle: string;
    nameEstadistida: string;
}


export const PlayOff: React.FC<PlayOffProps> = ({ data, SubTitle, nameEstadistida, titleTable }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const equiposCuartos: Equipo[] = data.slice(0, 8).map((equipo: Data) => ({
        logo: equipo.logo,
        name: equipo.name,
        partidos: 0,
        statusPlayOff: equipo.statusPlayOff,
        isChampion: equipo.isChampion
    }));

    const generarEnfrentamientos = (equipos: Equipo[]): Enfrentamiento[] => {
        const enfrentamientos: Enfrentamiento[] = [];
        const mitadEquipos = Math.floor(equipos.length / 2);

        for (let i = 0; i < mitadEquipos; i++) {
            const enfrentamiento: Enfrentamiento = [equipos[i], equipos[equipos.length - 1 - i]];
            enfrentamientos.push(enfrentamiento);
        }

        return enfrentamientos;
    };

    const enfrentamientosCuartos: Enfrentamiento[] = generarEnfrentamientos(equiposCuartos);

    const equiposSemis: Equipo[] = data.slice(0, 4).map((equipo: Data) => ({
        logo: equipo.logo,
        name: equipo.name,
        partidos: 0,
        statusPlayOff: equipo.statusPlayOff,
        isChampion: equipo.isChampion
    }));

    const enfrentamientosSemis: Enfrentamiento[] = generarEnfrentamientos(equiposSemis);

    const equiposFinal: Equipo[] = data.slice(0, 2).map((equipo: Data) => ({
        logo: equipo.logo,
        name: equipo.name,
        partidos: 0,
        statusPlayOff: equipo.statusPlayOff,
        isChampion: equipo.isChampion
    }));

    const enfrentamientoFinal: Enfrentamiento = [equiposFinal[0], equiposFinal[1]];

    const campeon = data.find(equipo => equipo.isChampion);

    return (
        <Grid item container>
            {data?.length === 0 ? (
                <Grid item height={mobile ? "55vh" : '50vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px' }}>
                    <Vacio size={140} />
                    {`No hay equipos en ${titleTable}`}
                </Grid>
            ) : (
                <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris3)' : 'var(--dark4)', width: '100%' }}>
                    <Grid item container mb={1} alignItems={'center'} flexDirection={'column'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                        {`${nameEstadistida} en  ${titleTable}`}
                        <span style={{ fontSize: '14px', fontWeight: '400' }}>{SubTitle}</span>
                    </Grid>
                    <Grid item container mb={2} gap={3} justifyContent={'center'}>
                        <Grid item mt={4} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '16px', fontWeight: '500' }}>
                            Cuartos de final
                        </Grid>
                        {enfrentamientosCuartos.map((enfrentamiento, index) => (
                            <Paper key={index} elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", width: '100%', background: light ? 'var(--gris3)' : 'var(--dark4)', border: light ? '1px var(--dark4) solid' : '1px var(--gris3) solid' }}>
                                <Grid item container gap={4} alignItems={'center'} justifyContent={'center'}>
                                    {enfrentamiento[0].partidos >= 8 ? (
                                        <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                            <img style={{ height: mobile ? '40px' : '70px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
                                            <Grid item mt={0.5} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>{enfrentamiento[0].name}</Grid>
                                        </Grid>
                                    ) : (
                                        <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
                                                <Time size={mobile ? 40 : 70} color={light ? 'var(--gris2)' : 'var(--dark2)'} />
                                            </Grid>
                                            <Grid item mt={1} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>Por definir</Grid>
                                        </Grid>
                                    )}
                                    <Grid item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>
                                    {enfrentamiento[1].partidos >= 8 ? (
                                        <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                            <img style={{ height: mobile ? '40px' : '70px' }} src={enfrentamiento[1].logo} alt={enfrentamiento[1].name} />
                                            <Grid item mt={0.5} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>{enfrentamiento[1].name}</Grid>
                                        </Grid>
                                    ) : (
                                        <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
                                                <Time size={mobile ? 40 : 70} color={light ? 'var(--gris2)' : 'var(--dark2)'} />
                                            </Grid>
                                            <Grid item mt={1} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>Por definir</Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </Paper>
                        ))}
                    </Grid>
                    <Grid item container mb={2} gap={3} justifyContent={'center'}>
                        <Grid item mt={4} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '16px', fontWeight: '500' }}>
                            Semifinales
                        </Grid>
                        {enfrentamientosSemis.map((enfrentamiento, index) => (
                            <Paper key={index} elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", width: '100%', background: light ? 'var(--gris3)' : 'var(--dark4)', border: light ? '1px var(--dark4) solid' : '1px var(--gris3) solid' }}>
                                <Grid item container gap={4} alignItems={'center'} justifyContent={'center'}>
                                    {enfrentamiento[0].partidos >= 8 ? (
                                        <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                            <img style={{ height: mobile ? '40px' : '70px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
                                            <Grid item mt={0.5} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>{enfrentamiento[0].name}</Grid>
                                        </Grid>
                                    ) : (
                                        <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
                                                <Time size={mobile ? 40 : 70} color={light ? 'var(--gris2)' : 'var(--dark2)'} />
                                            </Grid>
                                            <Grid item mt={1} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>Por definir</Grid>
                                        </Grid>
                                    )}
                                    <Grid item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>
                                    {enfrentamiento[1].partidos >= 8 ? (
                                        <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                            <img style={{ height: mobile ? '40px' : '70px' }} src={enfrentamiento[1].logo} alt={enfrentamiento[1].name} />
                                            <Grid item mt={0.5} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>{enfrentamiento[1].name}</Grid>
                                        </Grid>
                                    ) : (
                                        <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
                                                <Time size={mobile ? 40 : 70} color={light ? 'var(--gris2)' : 'var(--dark2)'} />
                                            </Grid>
                                            <Grid item mt={1} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>Por definir</Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </Paper>
                        ))}
                    </Grid>
                    <Grid item container mb={2} gap={3} justifyContent={'center'}>
                        <Grid item mt={4} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '16px', fontWeight: '500' }}>
                            Final
                        </Grid>
                        <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", width: '100%', background: light ? 'var(--gris3)' : 'var(--dark4)', border: light ? '1px var(--dark4) solid' : '1px var(--gris3) solid' }}>
                            <Grid item container gap={4} alignItems={'center'} justifyContent={'center'}>
                                {enfrentamientoFinal[0].partidos >= 8 ? (
                                    <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                        <img style={{ height: mobile ? '40px' : '70px' }} src={enfrentamientoFinal[0].logo} alt={enfrentamientoFinal[0].name} />
                                        <Grid item mt={0.5} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>{enfrentamientoFinal[0].name}</Grid>
                                    </Grid>
                                ) : (
                                    <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                        <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
                                            <Time size={mobile ? 40 : 70} color={light ? 'var(--gris2)' : 'var(--dark2)'} />
                                        </Grid>
                                        <Grid item mt={1} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>Por definir</Grid>
                                    </Grid>
                                )}
                                <Grid item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>
                                {enfrentamientoFinal[1].partidos >= 8 ? (
                                    <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                        <img style={{ height: mobile ? '40px' : '70px' }} src={enfrentamientoFinal[1].logo} alt={enfrentamientoFinal[1].name} />
                                        <Grid item mt={0.5} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>{enfrentamientoFinal[1].name}</Grid>
                                    </Grid>
                                ) : (
                                    <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                        <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
                                            <Time size={mobile ? 40 : 70} color={light ? 'var(--gris2)' : 'var(--dark2)'} />
                                        </Grid>
                                        <Grid item mt={1} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>Por definir</Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>
                    {campeon && (
                        <Grid item container mb={2} gap={3} justifyContent={'center'}>
                            <Grid item mt={4} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '16px', fontWeight: '500' }}>
                                Campeón
                            </Grid>
                            <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", width: '100%', background: light ? 'var(--gris3)' : 'var(--dark4)', border: light ? '1px var(--dark4) solid' : '1px var(--gris3) solid' }}>
                                <Grid item container gap={4} alignItems={'center'} justifyContent={'center'}>
                                    <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                        <img style={{ height: mobile ? '40px' : '70px' }} src={campeon.logo} alt={campeon.name} />
                                        <Grid item mt={0.5} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>{campeon.name}</Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    )}
                </Paper>
            )}
        </Grid>
    )
}