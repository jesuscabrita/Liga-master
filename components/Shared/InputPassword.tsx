import { IconoErrorInput } from "@/icons";
import { useContext, useState } from "react";
import Context from "@/context/contextPrincipal";
import { InputPasswordProps } from "@/interfaces";
import { MdOutlineVisibility as Visibility } from "react-icons/md";
import { MdOutlineVisibilityOff as VisibilityOff } from "react-icons/md";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";

export const InputPassword: React.FC<InputPasswordProps> = ({
    title,
    placeholder,
    value,
    textError,
    descripcion,
    mt = 0,
    disabled = false,
    handleActive = false,
    error = false,
    requerido = false,
    setValue,
    handleChange,
}) => {
    const [light] = useContext(Context);
    const [showPassword, setShowPassword] = useState(false);
    return (
        <Grid item container mt={mt}>
            <Grid mb={0.5} sx={{ color: disabled ? '#C4C7C7' : light ? 'var(--dark2)' : 'var(--gris)', lineHeight: '24px', fontSize: '14px', cursor: disabled ? 'not-allowed' : 'default', letterSpacing: '0.025px' }}>
                {title} {requerido && <span style={{ color: '#DE1212' }}>*</span>}
            </Grid>
            <TextField
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                variant="outlined"
                value={value}
                onChange={handleActive ? handleChange : (event) => setValue(event.target.value)}
                disabled={disabled}
                autoComplete="off"
                sx={{
                    width: '100%',
                    border: disabled ? "none !important" : (error ? "1px solid #DE1212 !important" : '1px solid #747878 !important'),
                    borderRadius: "11px",
                    padding: '-2px',
                    "& .MuiOutlinedInput-input": {
                        borderRadius: "9px",
                        color: light ? "#444748" : 'var(--gris)',
                        outline: "none",
                        height: '10px',
                        fontSize: '14px',
                        letterSpacing: '0.18%',
                        lineHeight: '20px',
                        background: disabled ? '#EFF1F1' : 'none',
                        cursor: disabled ? 'no-drop' : '',
                        "&:focus": {
                            borderColor: disabled ? '#d5d5d5' : (error ? "#DE1212" : "#747878"),
                            borderRadius: "9px !important",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "#747878",
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#065fbe !important",
                    },
                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: disabled ? "#5155586a" : (error ? "#DE1212" : "#747878"),
                    },
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "10px !important",
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                sx={{ color: light ? "var(--dark2)" : "var(--cero)" }}
                                edge="end"
                                tabIndex={-1}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {error ? <span style={{ color: '#DE1212', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}> <IconoErrorInput />{textError}</span>
                : <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ color: disabled ? '#C4C7C7' : light ? 'var(--dark2)' : 'var(--gris)', fontSize: '10px' }}>{descripcion}</span>
                </div>}
        </Grid>
    );
};