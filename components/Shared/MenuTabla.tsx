import Context from "@/context/contextPrincipal";
import { Grid, useMediaQuery } from "@mui/material";
import { useContext } from "react";

interface MenuTablaProps {
    opcion: { id: number; name: string; icono: React.ElementType, color?: string }
    valueSelect: number;
    handleChange: (option: number) => void;
}

export const MenuTabla: React.FC<MenuTablaProps> = ({ opcion, valueSelect, handleChange }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const Icono = opcion.icono;

    return (
        <Grid
            item
            key={opcion.name}
            id={opcion.name}
            sx={{
                width: !mobile ? '150px' : '50px',
                background:  valueSelect === opcion.id ? (light ?'var(--dark4)': 'var(--gris4)') : light && valueSelect === opcion.id ? 'var(--gris3)' : '',
                height: '48px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: valueSelect === opcion.id ? (light ?'3px solid var(--gris)': '3px solid var(--dark2)') : valueSelect === opcion.id ? '3px solid var(--cero)' : 'none',
                color: valueSelect === opcion.id ? (!light ?'var(--dark4)': 'var(--cero)')  : light && valueSelect === opcion.id ? 'var(--dark2)' : light ? 'var(--dark3)' : 'var(--neutral)',
                cursor: 'pointer',
                gap: '8px',
                fontSize: mobile ? '10px' : '14px',
            }}
            onClick={() => handleChange(opcion.id)}
        >
            <Icono size={25} color={opcion.color} />
            {!mobile && opcion.name}
        </Grid>
    );
}