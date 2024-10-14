import { Avatar, FormControlLabel, Grid, useMediaQuery } from "@mui/material";
import { CustomButton, CustomButtonDark } from "./CustomButton";
import { useContext, useEffect, useState } from "react";
import { MaterialUISwitch } from "./MaterialUISwitch";
import { filterEmail, stringAvatar } from "@/utils";
import { fetchEquiposSet } from "@/lib";
import { ContextType } from "@/interfaces";
import { UserMenu } from "./UserMenu";
import { useRouter } from "next/navigation";
import { ButtonNavbar } from "./ButtonNavbar";
import { NavbarListData } from "@/utils/arrays";
import Context from "@/context/contextPrincipal";
import ContextRefac from "@/context/contextLogin";

export const Navbar = () => {
    const router = useRouter();
    const [light, setLight] = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { state: { user }, logout } = useContext(ContextRefac) as ContextType;
    const [isSwitchChecked, setIsSwitchChecked] = useState(light);
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);
    const [equipo, setEquipo] = useState([]);
    fetchEquiposSet(setEquipo)

    useEffect(() => {
        setIsLoggedIn(!!user);
        setIsSwitchChecked(light);
    }, [user, light]);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setLight(checked);
        setIsSwitchChecked(checked);
        localStorage.setItem("light", checked ? "true" : "false");
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const setChangeDark = () => {
        setLight(light ? false : true);
        localStorage.setItem("light", "false");
    };

    const handleLogout = async () => {
        await logout();
        setIsLoggedIn(false);
    }

    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-10 bg-opacity-0' ${light ? 'bg-light' : 'bg-dark'}`}>
            <>
                <Grid item className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <Grid item className="relative flex h-16 items-center justify-between">
                        <Grid item className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {!light ?
                                <CustomButton isOpen={isOpen} toggle={toggleMenu} />
                                : <CustomButtonDark isOpen={isOpen} toggle={toggleMenu} />}
                        </Grid>
                        <Grid item sx={{ justifyContent: 'center' }} className="flex flex-1 items-center justify-center sm:items-sr4tretch sm:justify-start">
                            <Grid item className="flex flex-shrink-0 items-center">
                                <img
                                    alt="logo"
                                    className="block w-auto lg:hidden"
                                    style={{ height: '60px', width: '42px' }}
                                    src={light ? "/images/logo1.png" : "/images/logo2.png"}
                                />
                                <img
                                    alt="logo"
                                    className="hidden lg:block"
                                    style={{ height: '60px', width: '42px' }}
                                    src={light ? "/images/logo1.png" : "/images/logo2.png"}
                                />
                            </Grid>
                            <Grid item className="hidden sm:ml-6 sm:block">
                                <Grid item className="flex space-x-4">
                                    {NavbarListData.map((nav, index) => {
                                        if ((nav.requiresLogin && isLoggedIn && user) || !nav.requiresLogin) {
                                            return (
                                                <ButtonNavbar
                                                    key={index}
                                                    href={nav.href}
                                                    handleOpenRuta={toggleMenu}
                                                    mobile={mobile}
                                                    light={light}
                                                    title={nav.title}
                                                />
                                            );
                                        }
                                        return null;
                                    })}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <FormControlLabel
                                onClick={() => setChangeDark()}
                                label=""
                                control={<MaterialUISwitch light={light} checked={isSwitchChecked} onChange={handleSwitchChange} sx={{ m: 0 }} />}
                            />
                            {isLoggedIn && !mobile ? (
                                <UserMenu equipoid={filterEmail(equipo, user)[0]?._id} handleLogout={handleLogout} user={user} router={router} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} light={light} />
                            ) : (
                                !mobile &&
                                <ButtonNavbar href="/login" handleOpenRuta={toggleMenu} mobile={false} light={light} title="Login" />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                {isOpen &&
                    <Grid item className="space-y-1 px-2 pt-2 pb-3">
                        {!isLoggedIn && <ButtonNavbar href='/login' handleOpenRuta={toggleMenu} mobile={mobile} light={light} title="Login" />}
                        <ButtonNavbar href='/' handleOpenRuta={toggleMenu} mobile={mobile} light={light} title="Home" />
                        <ButtonNavbar href='/calendario' handleOpenRuta={toggleMenu} mobile={mobile} light={light} title="Calendario" />
                        <ButtonNavbar href='/tabla' handleOpenRuta={toggleMenu} mobile={mobile} light={light} title="Tabla" />
                        <ButtonNavbar href='/noticias' handleOpenRuta={toggleMenu} mobile={mobile} light={light} title="Noticias" />
                        {isLoggedIn && user && <ButtonNavbar href='/registrar' handleOpenRuta={toggleMenu} mobile={mobile} light={light} title="Registrar" />}
                        {isLoggedIn && user && <ButtonNavbar href='/libres' handleOpenRuta={toggleMenu} mobile={mobile} light={light} title="J. Libre" />}
                        {isLoggedIn &&
                            <>
                                <Grid item sx={{ border: light ? '1px solid var(--dark2)' : '1px solid var(--cero)' }} />
                                <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primario)', paddingTop: '10px' }}>
                                    <Avatar {...stringAvatar(user?.nombre)} sx={{ height: '35px', width: '35px', background: !light ? '#aab4be' : '#1F2937', color: !light ? '#1F2937' : 'white' }} />
                                    <Grid item sx={{ color: light ? "var(--dark2)" : "white", fontWeight: '700', letterSpacing: '2px', }}>{`${user?.nombre} ${user?.apellido}`}</Grid>
                                </Grid>
                                <ButtonNavbar href='/perfil' handleOpenRuta={toggleMenu} mobile={mobile} light={light} title="Perfil" />
                                <ButtonNavbar href={`manager/${filterEmail(equipo, user)[0]?._id}`} handleOpenRuta={toggleMenu} mobile={mobile} light={light} title="Mi equipo" />
                                {user?.role === 'super_admin' && <ButtonNavbar href='/admin/usuarios' handleOpenRuta={toggleMenu} mobile={mobile} light={light} title="Usuarios" />}
                                {isLoggedIn && (user?.role === 'super_admin' || user?.role === 'admin') && <ButtonNavbar href='/admin/panel' handleOpenRuta={toggleMenu} mobile={mobile} light={light} title="Panel partidos" />}
                                {isLoggedIn && (user?.role === 'super_admin') && <ButtonNavbar href='/admin/panelequipos' handleOpenRuta={toggleMenu} mobile={mobile} light={light} title="Panel equipos" />}
                                <Grid onClick={() => { handleLogout(); }} item className={`${light ? "text-dark" : "text-[#aab4be]"}`} sx={{ cursor: 'pointer', display: "block", padding: "8px 12px 8px 12px", fontSize: "12px", letterSpacing: '2px', fontWeight: light ? '900' : '400' }}>
                                    Cerrar cesion
                                </Grid>
                            </>}
                    </Grid>
                }
            </>
        </nav>
    )
}