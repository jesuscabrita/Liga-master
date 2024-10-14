import { styled, TableRow, TableRowProps } from "@mui/material";

interface StyledTableRowProps extends TableRowProps {
    light?: boolean;
    disabled?: boolean;
}

export const StyledTableRow = styled(({ light, disabled, ...other }: StyledTableRowProps) => (
    <TableRow {...other} />
))(({ theme, light, disabled }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: light ? 'var(--gris3)' : 'var(--dark4)',
    },
    '&:nth-of-type(even)': {
        backgroundColor: light ? 'var(--gris4)' : 'var(--dark2)',
    },
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
}));

export default StyledTableRow;