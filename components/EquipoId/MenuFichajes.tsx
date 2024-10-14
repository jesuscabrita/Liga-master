import { Grid } from "@mui/material";
import { useContext } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { BsCashCoin as Cash } from 'react-icons/bs';
import { MdOutlineAssignmentReturn as Prestamo } from 'react-icons/md';
import { seleccionarData } from "@/utils";
import Context from "@/context/contextPrincipal";

interface MenuFichajesProps {
    isOpen: boolean;
    index: number;
    jugador: any;
    setOpenRows: React.Dispatch<React.SetStateAction<any>>;
    setJugadorSeleccionado: React.Dispatch<React.SetStateAction<any>>;
    setModalOferta: React.Dispatch<React.SetStateAction<any>>;
    setModalPrestamo: React.Dispatch<React.SetStateAction<any>>;
}

export const MenuFichajes: React.FC<MenuFichajesProps> = ({
    isOpen,
    index,
    jugador,
    setOpenRows,
    setJugadorSeleccionado,
    setModalOferta,
    setModalPrestamo
}) => {
    const [light] = useContext(Context);

    const handleRowClick = (index: number) => {
        setOpenRows((prev: any[]) => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <Grid item className="relative ml-3">
            <Grid item>
                <button
                    type="button"
                    className={`flex rounded-full ${!light ? 'bg-gray-800' : 'bg-[transparent]'} text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                    id="user-menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => handleRowClick(index)}
                >
                    <HiMenuAlt1 size={30} style={{ cursor: 'pointer' }} onClick={() => { }} />
                </button>
            </Grid>
            {isOpen && (
                <Grid item sx={{ background: light ? "var(--gris)" : "var(--dark2)", border: light ? '1px solid var(--dark2)' : '1px solid #aab4be' }} className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                    <Grid item container alignItems={'center'} gap={1} sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} className="block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="user-menu-item-0"
                        onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalOferta); setOpenRows({}) }}>
                        Compra
                        <Cash />
                    </Grid>
                    <Grid item container alignItems={'center'} gap={1} sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} className="block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="user-menu-item-0"
                        onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalPrestamo); setOpenRows({}) }}>
                        Prestamo
                        <Prestamo />
                    </Grid>
                </Grid>
            )}
        </Grid>
    )
}