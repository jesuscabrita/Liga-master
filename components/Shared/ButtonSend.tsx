import { ButtomSendProps } from "@/interfaces";
import Context from "@/context/contextPrincipal";
import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";

export const ButtomSend: React.FC<ButtomSendProps> = ({
    title,
    width,
    widthBorder,
    disabled = false,
    isLoading = false,
    enter = false,
    type = 'Primario',
    iconSize = 24,
    icon: IconComponent,
    handleclick,
}) => {
    const [light] = useContext(Context);
    const [isClicked, setIsClicked] = useState(false);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    const fondoBotton =
        type === 'Primario' ? disabled ? (light ? '#1f293790 !important' : '#aab4be58 !important') : (light ? 'var(--dark2) !important' : '#aab4be !important') :
            type === 'Secundario' ? disabled ? ('transparent !important') : 'transparent !important' :
                type === 'warnning' ? disabled ? '#a5712855 !important' : (light ? '#a57128 !important' : '#90662b !important') :
                    type === 'danger' ? disabled ? (light ? '#b7484882 !important' : '#b748483f !important') : 'var(--danger) !important'
                        : '';

    const borderBotton = isClicked
        ? type === 'Primario' ? (light ? '1px solid var(--dark2)' : '1px solid #aab4be')
            : type === 'Secundario' ? (light ? '1px solid var(--dark2)' : '1px solid #aab4be')
                : type === 'warnning' ? (light ? '1px solid #a57128' : '1px solid #90662b')
                    : type === 'danger' ? '1px solid var(--danger)' : 'none'
        : 'none';

    const colorBottom =
        type === 'Primario' ? disabled ? (light ? '#d1d1d186' : '#1f293781') : (light ? '#FEFEFE' : 'var(--dark2)')
            : type === 'Secundario' ? disabled ? (light ? '#1f293736' : '#d1d1d137') : (light ? 'var(--dark2)' : 'var(--cero)')
                : type === 'warnning' ? disabled ? '#d1d1d17d' : (light ? '#FEFEFE' : '#FEFEFE')
                    : type === 'danger' ? disabled ? (light ? '#d1d1d186' : '#1f293781') : '#FEFEFE'
                        : '';

    const hoverBottom = disabled ? '#E1E3E3' :
        type === 'Primario' ? (light ? 'var(--dark4) !important' : 'var(--gris3) !important')
            : type === 'Secundario' ? light ? '#aab4be67 !important' : '#aab4be2d !important'
                : type === 'warnning' ? (light ? '#a57128ec !important' : '#90662ba2 !important')
                    : type === 'danger' ? '#b74848e2 !important'
                        : '';

    const BorderBottom2 =
        type === 'Primario' ? disabled ? 'none' : 'none'
            : type === 'Secundario' ? disabled ? (light ? '1px #1f293736 solid' : '1px #d1d1d137 solid') : (light ? '1px #1f29376f solid' : '1px #d1d1d13d solid')
                : type === 'danger' ? 'none'
                    : 'none'

    const handleMouseDown = () => {
        if (!disabled) {
            setIsClicked(true);
        }
    };

    const handleMouseUp = () => {
        if (!disabled) {
            handleclick();
            setTimeout(() => setIsClicked(false), 8000);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (enter && event.key === 'Enter' && !disabled) {
                handleclick();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [enter, handleclick, disabled]);

    return (
        <Grid
            item
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsClicked(false)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                width: widthBorder ? widthBorder : '100%',
                height: '50px',
                border: borderBotton
            }}>
            <Grid
                item
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '45px',
                    borderRadius: '7px',
                    background: fondoBotton,
                    color: colorBottom,
                    border: BorderBottom2,
                    fontSize: mobile ? '11px' : '16px',
                    cursor: disabled ? 'no-drop' : 'pointer',
                    gap: '10px',
                    width: width ? width : '100%',
                    userSelect: 'none',
                    fontWeight: '700',
                    '&:hover': {
                        background: hoverBottom
                    }
                }}
            >
                {isLoading && <CircularProgress size={25} color={"inherit"} sx={{ color: colorBottom }} />}
                {title}
                {IconComponent && (
                    <IconComponent size={iconSize} color={colorBottom} />
                )}
            </Grid>
        </Grid>
    )
}