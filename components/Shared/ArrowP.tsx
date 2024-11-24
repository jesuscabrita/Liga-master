import { BsCaretUpFill as ArrowTop } from 'react-icons/bs';
import { BsCaretDownFill as ArrowBottom } from 'react-icons/bs';
import { FaMinus as Igual } from 'react-icons/fa';
import { Grid, useMediaQuery } from '@mui/material'

export const ArrowP = ({ currentPos, prevPos, light }: { currentPos: number; prevPos: number; light: boolean; }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    let arrowIcon;
    if (currentPos < prevPos) {
        arrowIcon = <ArrowTop size={mobile ? 12 : 20} style={{ color: 'var(--check)' }} />;
    } else if (currentPos > prevPos) {
        arrowIcon = <ArrowBottom size={mobile ? 12 : 20} style={{ color: 'var(--danger)' }} />;
    } else {
        arrowIcon = <Igual size={mobile ? 12 : 20} style={{ color: light ? 'var(--gris)' : 'var(--gris4)' }} />;
    }

    return (
        <Grid item>
            {arrowIcon}
        </Grid>
    );
}