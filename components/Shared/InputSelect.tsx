import { useContext } from "react";
import { IconoErrorInput } from "@/icons";
import { InputSelectProps } from "@/interfaces";
import { FormControl, Grid, MenuItem, Select, useMediaQuery } from "@mui/material";
import Context from "@/context/contextPrincipal";

export const InputSelects: React.FC<InputSelectProps> = ({
    title,
    value,
    data,
    mt = 0,
    disabled = false,
    descripcion,
    error = false,
    textError,
    requerido = false,
    handleSelect,
}) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const optionsWithDefault = data ? [{ codigo: "Elija una opción", descripcion: "Elija una opción" }, ...data] : [];
    return (
        <Grid item container mt={mt} sx={{ width: '100%', display: 'flex', flexDirection: 'column', color: 'rgb(31 41 55)', fontSize: '10px' }}>
            <Grid mb={0.5} sx={{ color: disabled ? (light ? 'var(--gris4)' : '#444748') : light ? "#444748" : 'var(--gris)', lineHeight: '24px', fontSize: '14px', cursor: disabled ? 'not-allowed' : 'default', letterSpacing: '0.025px' }}>
                {title} {requerido && <span style={{ color: '#DE1212' }}>*</span>}
            </Grid>
            <Grid item container>
                <FormControl disabled={disabled} sx={{ width: '100%', minWidth: 200 }}>
                    <Select
                        value={value}
                        onChange={handleSelect}
                        MenuProps={{ sx: { '& .MuiList-root.MuiMenu-list': { background: light ? 'var(--gris)' : 'var(--dark2)' } } }}
                        sx={{
                            height: '46px',
                            fontSize: '14px',
                            cursor: disabled ? 'no-drop' : 'pointer',
                            '& .MuiInputBase-input': {
                                color: disabled ? (light ? 'var(--gris4) !important' : '#444748 !important') : light ? "#444748 !important" : 'var(--gris) !important',
                                border: disabled ? (light ? "1px solid var(--gris4) !important": '1px solid #444748 !important') : (error ? "1px solid #DE1212 !important" : '1px solid #747878 !important'),
                                borderRadius: '9px !important',
                                padding: disabled ? '12.5px !important' : '12px !important',
                                background: disabled ? (light ? 'var(--gris)' : 'var(--dark2)') : 'none',
                                cursor: disabled ? 'no-drop' : 'pointer',
                            },
                            '& .Mui-disabled': {
                                WebkitTextFillColor: disabled ? (light ? 'var(--gris4) !important' : '#444748 !important') : light ? "#444748 !important" : 'var(--gris) !important',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'none !important',
                                borderRadius: '9px !important',
                                border: 'none !important',
                            },
                            '& .MuiSvgIcon-root': {
                                color: disabled ? (light ? 'var(--gris4) !important' : '#444748 !important') : light ? "#444748 !important" : 'var(--gris) !important',
                            },
                            '&.Mui-focused': {
                                color: 'initial',
                                fontWeight: 'normal',
                                '& fieldset': {
                                    border: 'none !important',
                                },
                                '&:hover fieldset': {
                                    border: 'none !important',
                                },
                            },
                            '&:hover fieldset': {
                                border: disabled ? "none !important" : (error ? "none !important" : '1px solid #7478781 !important'),
                            },
                        }}
                    >
                        {optionsWithDefault && optionsWithDefault.map((option, optionIndex: number) => (
                            <MenuItem
                                key={optionIndex}
                                value={option?.codigo}
                                sx={{
                                    background: light ? 'var(--gris)' : 'var(--dark2)',
                                    color: light ? "#444748" : 'var(--gris)',
                                    fontSize: mobile ? '12px' : '14px',
                                    letterSpacing: '0.18%',
                                    lineHeight: '20px',
                                    '&:hover': {
                                        background: light ? 'var(--dark2)' : 'var(--gris)',
                                        color: light ? "var(--gris)" : 'var(--dark2)',
                                    },
                                    '&.Mui-selected': {
                                        background: light ? 'var(--dark2) !important' : 'var(--gris) !important',
                                        color: light ? "var(--gris)" : 'var(--dark2)',
                                        '&:hover': {
                                            background: light ? 'var(--dark2)' : 'var(--gris)',
                                        },
                                    },
                                }}
                            >
                                {option?.descripcion}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            {error ? <span style={{ color: '#DE1212', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}> <IconoErrorInput /> {textError}</span>
                : <span style={{ color: disabled ? (light ? 'var(--gris4)' : '#444748') : light ? "#444748" : 'var(--gris)', fontSize: '10px' }}>{descripcion}</span>}
        </Grid>
    )
}