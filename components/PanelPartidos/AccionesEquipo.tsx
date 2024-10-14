import { anularAutoGol, editarAutoGol } from "@/lib/panelPartidos";
import { Grid, Tooltip, useMediaQuery } from "@mui/material"
import { useMutation, useQueryClient } from "react-query";
import { FaClipboardList as List } from 'react-icons/fa';
import { GiSoccerBall as Gol } from 'react-icons/gi';
import { edit_autogol } from "@/services/jugadores";
import { AccionesEquipoProps } from "@/interfaces";
import { ButtomSend } from "../Shared/ButtonSend"

export const AccionesEquipo: React.FC<AccionesEquipoProps> = ({ modal, setModal, setIsLoadinng, team, currentRound }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { mutate: editarAutogoles } = useMutation(edit_autogol);
    const queryClient = useQueryClient();

    return (
        <Grid mb={2} gap={1} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Tooltip title="Lista de convocados: podes pasar lista y verificar jugadores" placement="top">
                <ButtomSend
                    type="Secundario"
                    title="Lista"
                    icon={List}
                    width='90px'
                    widthBorder="92px"
                    iconSize={mobile ? 12 : 24}
                    handleclick={() => { setModal(!modal) }}
                />
            </Tooltip>
            <Tooltip title="Autogol: sumara un gol pero no es de ningun jugador de la plantilla" placement="top">
                <ButtomSend
                    type="Secundario"
                    title="Auto gol"
                    icon={Gol}
                    width={mobile ? "80px" : '120px'}
                    widthBorder={mobile ? "82px" : '122px'}
                    iconSize={mobile ? 12 : 24}
                    handleclick={() => {
                        editarAutoGol(
                            team._id,
                            1,
                            currentRound,
                            team.gol_partido[currentRound],
                            team.autogol_partido[currentRound],
                            team.goles_a_Favor,
                            team.gol_partido,
                            team.autogol_partido,
                            setIsLoadinng,
                            editarAutogoles,
                            queryClient
                        )
                    }} />
            </Tooltip>
            <Tooltip title="Anulara el autogol del partido" placement="top">
                <ButtomSend
                    type="Secundario"
                    title="- gol"
                    icon={Gol}
                    width={mobile ? "80px" : '120px'}
                    widthBorder={mobile ? "82px" : '122px'}
                    iconSize={mobile ? 12 : 24}
                    disabled={team.autogol_partido[currentRound] === 0}
                    handleclick={() => {
                        anularAutoGol(
                            team._id,
                            1,
                            currentRound,
                            team.gol_partido[currentRound],
                            team.autogol_partido[currentRound],
                            team.goles_a_Favor,
                            team.gol_partido,
                            team.autogol_partido,
                            setIsLoadinng,
                            editarAutogoles,
                            queryClient
                        )
                    }} />
            </Tooltip>
        </Grid>
    )
}