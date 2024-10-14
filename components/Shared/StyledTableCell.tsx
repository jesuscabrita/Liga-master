import { styled, TableCell, TableCellProps } from "@mui/material";

interface StyledTableCellProps extends TableCellProps {
    light?: boolean;
}

export const StyledTableCell = styled(({ light, ...other }: StyledTableCellProps) => (
    <TableCell {...other} />
))(({ theme, light }) => ({
    '&.MuiTableCell-head': {
        background: light ? 'var(--dark2)' : 'var(--gris4)',
        color: light ? "var(--cero)" : "var(--dark2)",
        letterSpacing: '2px',
        fontSize: '12.5px',
        fontWeight: '500',
        whiteSpace: 'nowrap',
    },
    '&.MuiTableCell-body': {
        fontSize: 12,
        color: light ? 'black' : 'var(--cero)',
    },
}));

export default StyledTableCell;