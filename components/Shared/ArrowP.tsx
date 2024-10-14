import { BsCaretUpFill as ArrowTop } from 'react-icons/bs';
import { BsCaretDownFill as ArrowBottom } from 'react-icons/bs';
import { FaMinus as Igual } from 'react-icons/fa';
import { Grid } from '@mui/material'

export const ArrowP = ({ currentPos, prevPos, light }: { currentPos: number; prevPos: number; light: boolean; }) => {
    let arrowIcon;
    if (currentPos < prevPos) {
        arrowIcon = <ArrowTop size={20} style={{ color: 'var(--check)' }} />;
    } else if (currentPos > prevPos) {
        arrowIcon = <ArrowBottom size={20} style={{ color: 'var(--danger)' }} />;
    } else {
        arrowIcon = <Igual size={20} style={{ color: light ? 'var(--gris)' : 'var(--gris4)' }} />;
    }

    return (
        <Grid item>
            {arrowIcon}
        </Grid>
    );
}