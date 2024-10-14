import Context from "@/context/contextPrincipal";
import { IconoErrorInput } from "@/icons";
import { Grid, InputAdornment, TextField } from "@mui/material";
import { useContext } from "react";
import { CiSearch as Search } from "react-icons/ci";

interface InputBuscadorProps {
    title: string;
    mt?: number;
    disabled?: boolean;
    placeholder?: string
    value: any;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleActive?: boolean;
    error?: boolean;
    textError?: string;
    descripcion?: string;
}

export const InputBuscador: React.FC<InputBuscadorProps> = ({ title, mt = 0, disabled = false, placeholder, value, setValue, handleChange, handleActive = false, error = false, textError, descripcion }) => {
    const [light] = useContext(Context);
    return (
        <Grid item container mt={mt}>
            <Grid mb={0.5} sx={{ color: disabled ? '#C4C7C7' : light ? 'var(--dark2)' : 'var(--gris)', lineHeight: '24px', fontSize: '14px', cursor: disabled ? 'not-allowed' : 'default', letterSpacing: '0.025px' }}>
                {title}
            </Grid>
            <TextField
                autoComplete="off"
                variant="outlined"
                fullWidth
                type="text"
                value={value}
                onChange={handleActive ? handleChange : (event) => setValue(event.target.value)}
                disabled={disabled}
                placeholder={placeholder}
                sx={{
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
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search style={{ color: light ? "var(--dark2)" : "var(--cero)" }} />
                        </InputAdornment>
                    ),
                }}
            />
            {error ? <span style={{ color: '#DE1212', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}> <IconoErrorInput />{textError}</span>
                : <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ color: disabled ? '#C4C7C7' : light ? 'var(--dark2)' : 'var(--gris)', fontSize: '10px' }}>{descripcion}</span>
                </div>}
        </Grid >
    )
}