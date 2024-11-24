import { useContext } from "react";
import { Grid, TableHead, TableRow, useMediaQuery } from "@mui/material";
import StyledTableCell from "../Shared/StyledTableCell";
import Context from "@/context/contextPrincipal";

export const CustomTableHead = ({ headers }: { headers: { align: any; label: string }[] }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    return (
        <TableHead>
            <TableRow>
                {headers.map((header, index) => (
                    <StyledTableCell key={index} light={light} align={header.align}>
                        <Grid item sx={{ fontSize: mobile ? '10px' : '12px' }}>
                            {header.label}
                        </Grid>
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};