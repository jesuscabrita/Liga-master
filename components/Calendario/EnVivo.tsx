import Context from "@/context/contextPrincipal";
import { Grid } from "@mui/material";
import { useContext } from "react";

export const EnVivo = () => {
    const [light] = useContext(Context);

    return (
        <Grid item sx={{
            width: '60px',
            background: light ? 'var(--gris4)' : '#D15A54',
            fontSize: '10px',
            borderRadius: '20px',
            color: light ? '#CC4746' : '#E5E5E5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5px',
        }}>
            <Grid item className="vivo" sx={{
                width: '10px',
                height: '10px',
                borderRadius: '100px',
                background: light ? '#CC4746' : '#E5E5E5',
                marginRight: '4px',
                border: '1px solid #fff',
            }} >
            </Grid>
            <Grid item>En vivo</Grid>
        </Grid>
    )
}