import { stringAvatar } from "@/utils";
import { UserMenuProps } from "@/interfaces";
import { Avatar, Grid } from "@mui/material";

export const UserMenu: React.FC<UserMenuProps> = ({ handleLogout, user, router, equipoid, isMenuOpen, light, setIsMenuOpen }) => {
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <Grid item className="relative ml-3">
            <Grid item>
                <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={isMenuOpen}
                    aria-haspopup="true"
                    onClick={handleMenuToggle}
                >
                    <Avatar {...stringAvatar(user?.nombre)} sx={{ height: '35px', width: '35px', background: !light ? '#aab4be' : '#1F2937', color: !light ? '#1F2937' : 'white' }} />
                </button>
            </Grid>
            {isMenuOpen && (
                <Grid item sx={{ background: light ? "var(--light)" : "var(--dark2)", border: light ? '1px solid var(--dark2)' : '1px solid #aab4be' }} className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                    <Grid item sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} className="block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="user-menu-item-0"
                        onClick={() => { router.push("/perfil"); handleMenuClose(); }}>
                        Perfil
                    </Grid>
                    <Grid item sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} className="block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="user-menu-item-0"
                        onClick={() => { router.push(`/manager/${equipoid}`); handleMenuClose(); }}>
                        Mi equipo
                    </Grid>
                    {user?.role === 'super_admin' &&
                        <Grid item className="block px-4 py-2 text-sm" sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} role="menuitem" tabIndex={-1} id="user-menu-item-1"
                            onClick={() => { router.push("/admin/usuarios"); handleMenuClose(); }}>
                            Usuarios
                        </Grid>}
                    {(user?.role === 'super_admin' || user?.role === 'admin') &&
                        <Grid item className="block px-4 py-2 text-sm" sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} role="menuitem" tabIndex={-1} id="user-menu-item-1"
                            onClick={() => { router.push("/admin/panel"); handleMenuClose(); }}>
                            Panel Partidos
                        </Grid>}
                    {user?.role === 'super_admin' &&
                        <Grid item className="block px-4 py-2 text-sm" sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} role="menuitem" tabIndex={-1} id="user-menu-item-1"
                            onClick={() => { router.push("/admin/panelequipos"); handleMenuClose(); }}>
                            Panel Equipos
                        </Grid>}
                    <Grid item className="block px-4 py-2 text-sm" sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} role="menuitem" tabIndex={-1} id="user-menu-item-2"
                        onClick={() => { handleLogout(); handleMenuClose(); }}>
                        Cerrar sesión
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};