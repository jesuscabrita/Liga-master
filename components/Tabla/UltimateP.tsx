import { Grid, useMediaQuery } from '@mui/material'
import { BsFillCheckCircleFill as Check } from 'react-icons/bs';
import { BsFillXCircleFill as Error } from 'react-icons/bs';
import { AiOutlineMinusCircle as Empate } from 'react-icons/ai';
import { BsFillCircleFill as Neutral } from 'react-icons/bs';
import React from 'react';

interface UltimatePProps {
    last5: Array<'win' | 'loss' | 'draw' | 'neutral'>;
}

export const UltimateP: React.FC<UltimatePProps> = ({ last5 }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const icons = {
        'win': <Check size={20} style={{ color: 'var(--check)' }} />,
        'loss': <Error size={20} style={{ color: 'var(--danger)' }} />,
        'draw': <Empate size={20} style={{ color: 'var(--neutral)' }} />,
        'neutral': <Neutral size={20} style={{ color: 'var(--gris)' }} />,
    }

    return (
        <Grid container alignItems={'center'} justifyContent={'center'} gap={1} sx={{ width: mobile ? '140px' : '140px', whiteSpace: 'nowrap' }}>
            {last5.map((result, index) => (
                <React.Fragment key={index}>
                    {icons[result]}
                </React.Fragment>
            ))}
        </Grid>
    )
}