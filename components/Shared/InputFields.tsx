import { useContext } from "react";
import { IconoErrorInput } from "@/icons";
import { InputFieldsProps } from "@/interfaces";
import { Grid, TextField } from "@mui/material";
import Context from "@/context/contextPrincipal";

export const InputFields: React.FC<InputFieldsProps> = ({
    type,
    value,
    mt = 0,
    title,
    descripcion,
    placeholder,
    textError,
    max,
    disabled = false,
    handleActive = false,
    error = false,
    lengths = false,
    requerido = false,
    setValue,
    handleChange,
}) => {
    const [light] = useContext(Context);
    return (
        <Grid item container mt={mt}>
            <Grid mb={0.5} sx={{ color: disabled ? (light ? 'var(--gris4)' : '#444748') : (light ? 'var(--dark2)' : 'var(--gris)'), lineHeight: '24px', fontSize: '14px', cursor: disabled ? 'not-allowed' : 'default', letterSpacing: '0.025px' }}>
                {title} {requerido && <span style={{ color: '#DE1212' }}>*</span>}
            </Grid>
            <TextField
                placeholder={placeholder}
                type={type}
                variant="outlined"
                value={value}
                onChange={handleActive ? handleChange : (event) => setValue(event.target.value)}
                disabled={disabled}
                sx={{
                    width: '100%',
                    "& .MuiOutlinedInput-input": {
                        border: disabled ? (light ? "1px solid var(--gris4) !important" : '1px solid #444748 !important') : (error ? "1px solid #DE1212 !important" : '1px solid #747878 !important'),
                        borderRadius: "9px",
                        color: disabled ? (light ? 'var(--gris4) !important' : '#444748 !important') : light ? "#444748 !important" : 'var(--gris) !important',
                        outline: "none",
                        width: '100%',
                        height: '10px',
                        fontSize: '14px',
                        letterSpacing: '0.18%',
                        lineHeight: '20px',
                        background: disabled ? (light ? 'var(--gris)' : 'var(--dark2)') : 'none',
                        cursor: disabled ? 'no-drop' : '',
                        "&:focus": {
                            borderColor: disabled ? (light ? 'var(--gris4) !important' : '#444748 !important') : (error ? "#DE1212 !important" : "#747878 !important"),
                            borderRadius: "9px !important",
                        },
                    },
                    '& .Mui-disabled': {
                        WebkitTextFillColor: disabled ? (light ? 'var(--gris4) !important' : '#444748 !important') : light ? "#444748 !important" : 'var(--gris) !important',
                    },
                    "& .MuiInputLabel-root": {
                        color: disabled ? (light ? 'var(--gris4) !important' : '#444748 !important') : light ? "#444748 !important" : 'var(--gris) !important',
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#065fbe !important",
                    },
                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: disabled ? "none !important" : (error ? "#DE1212 !important" : "#747878 !important"),
                    },
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "10px !important",
                        border: "none !important"
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'none !important',
                        borderRadius: '9px !important',
                        border: 'none !important',
                    },
                }}
            />
            {error ? <span style={{ color: '#DE1212', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}> <IconoErrorInput />{textError}</span>
                : <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ color: disabled ? (light ? 'var(--gris4)' : '#444748') : (light ? 'var(--dark2)' : 'var(--gris)'), fontSize: '10px' }}>{descripcion}</span>
                    {lengths && <span style={{ color: disabled ? (light ? 'var(--gris4)' : '#444748') : (light ? 'var(--dark2)' : 'var(--gris)'), fontSize: '10px' }}>{`${value?.length}/${max}`}</span>}
                </div>}
        </Grid>
    )
}