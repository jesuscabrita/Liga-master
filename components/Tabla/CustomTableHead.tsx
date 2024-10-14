import { useContext } from "react";
import { TableHead, TableRow } from "@mui/material";
import StyledTableCell from "../Shared/StyledTableCell";
import Context from "@/context/contextPrincipal";

export const CustomTableHead = ({ headers }: { headers: { align: any; label: string }[] }) => {
    const [light] = useContext(Context);
    return (
        <TableHead>
            <TableRow>
                {headers.map((header, index) => (
                    <StyledTableCell key={index} light={light} align={header.align}>
                        {header.label}
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};