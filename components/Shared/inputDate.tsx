import { useContext } from "react";
import { Grid } from "@mui/material";
import { IconoErrorInput } from "@/icons";
import { InputDateProps } from "@/interfaces";
import { DatePicker } from "@mui/x-date-pickers";
import Context from "@/context/contextPrincipal";

export const InputDate: React.FC<InputDateProps> = ({
    title,
    value,
    descripcion,
    textError,
    disabled = false,
    handleActive = false,
    error = false,
    requerido = false,
    setValue,
    handleChange,
}) => {
    const [light] = useContext(Context);
    return (
        <Grid item sx={{ width: '100%', display: 'flex', flexDirection: 'column', color: 'rgb(31 41 55)', fontSize: '10px' }}>
            <Grid mb={0.5} sx={{ color: disabled ? '#C4C7C7' : light ? 'var(--dark2)' : 'var(--gris)', lineHeight: '24px', fontSize: '14px', cursor: disabled ? 'not-allowed' : 'default', letterSpacing: '0.025px' }}>
                {title} {requerido && <span style={{ color: '#DE1212' }}>*</span>}
            </Grid>
            <DatePicker
                sx={{
                    borderRadius: "9px",
                    '& .MuiInputBase-input': { width: '100%', height: '12px', },
                    '& .MuiInputBase-root': {
                        color: light ? "#444748" : 'var(--gris)',
                        border: 'none',
                        borderRadius: "9px",
                    },
                    '& .MuiInputBase-root.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: light ? "#444748" : '#747878',
                        border: error ? "1px solid #DE1212 !important" : (light ? '1px solid #444748' : '1px solid #747878'),
                    },
                    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'none',
                    },
                    '& svg': {
                        color: light ? "#444748" : '#747878 ',
                    },
                }}
                value={value}
                onChange={handleActive ? handleChange : (date) => setValue(date)}
                disabled={disabled}
            />
            {error ? <span style={{ color: '#DE1212', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}> <IconoErrorInput />{textError}</span>
                : <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ color: disabled ? '#C4C7C7' : light ? 'var(--dark2)' : 'var(--gris)', fontSize: '10px' }}>{descripcion}</span>
                </div>}
        </Grid>
    );
};