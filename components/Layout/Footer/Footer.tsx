import { Container, Grid, useMediaQuery } from "@mui/material";
import { BsFacebook as Facebook } from 'react-icons/bs';
import { BsInstagram as Instagram } from 'react-icons/bs';
import { useState } from "react";
import Link from "next/link";

export const Footer = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [mensajeAutomatico] = useState(`Hola, Necesito más información!`);

    const buttonStyles = {
        display: "block",
        padding: "8px 12px 8px 12px",
        borderRadius: "6px",
        fontSize: mobile ? '12px' : '14px',
        background: "transparent",
        opacity: 0.7,
        textDecoration: "none",
        cursor: "pointer",
        letterSpacing: '3px',
    };

    const handleChatClick = () => {
        const numeroArgentina = `+541166439380`;
        const mensaje = encodeURIComponent(mensajeAutomatico);
        const whatsappLink = `https://api.whatsapp.com/send?phone=${numeroArgentina}&text=${mensaje}`;
        window.open(whatsappLink, '_blank');
    };

    const handleCorreoClick = () => {
        const correoLink = `mailto:jesusarnaldo115@gmail.com?subject=Solicitud&body=${mensajeAutomatico}`;
        window.open(correoLink);
    }

    const openInstagramProfile = () => {
        window.open(`https://www.instagram.com/ligamaster`, '_blank');
    }

    const handleClickLink = (href: string) => {
        const targetElement = document.getElementById(href.slice(1));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer id='contactos' style={{ background: 'var(--dark2)', color: '#fff', paddingTop: '40px' }}>
            <Container maxWidth="lg">
                <Grid container sx={{ justifyContent: 'center' }}>
                    <Grid item xs={10} sm={6} md={3} mb={4}>
                        <img src={'/images/logoDark1.png'} alt="Liga master" style={{ height: mobile ? '120px' : '180px' }} />
                    </Grid>
                    <Grid item xs={10} sm={6} md={3} mb={4}>
                        <h2 style={{ letterSpacing: '2px' }}>Enlaces Rápidos</h2>
                        <Link href={'/'} className="cursor-pointer">
                            <Grid item style={buttonStyles}>
                                Home
                            </Grid>
                        </Link>
                        <Link href={'/calendario'} className="cursor-pointer">
                            <Grid item style={buttonStyles}>
                                Calendario
                            </Grid>
                        </Link>
                        <Link href={'/tabla'} className="cursor-pointer">
                            <Grid item style={buttonStyles}>
                                Tabla
                            </Grid>
                        </Link>
                        <Link href={'/noticias'} className="cursor-pointer">
                            <Grid item style={buttonStyles}>
                                Noticias
                            </Grid>
                        </Link>
                    </Grid>
                    <Grid item xs={10} sm={6} md={3} mb={4}>
                        <h2 style={{ letterSpacing: '2px' }}>Contacto</h2>
                        <Grid item mb={1} mt={2} sx={{ fontSize: mobile ? '12px' : '14px', opacity: 0.7, cursor: 'pointer' }} onClick={handleCorreoClick}>
                            <strong>Email:</strong> jesusarnaldo115@gmail.com
                        </Grid>
                        <Grid item mb={1} sx={{ fontSize: mobile ? '12px' : '14px', opacity: 0.7, cursor: 'pointer' }} onClick={handleChatClick}>
                            <strong>Teléfono:</strong> (+54 911) 6643-9380
                        </Grid>
                    </Grid>
                </Grid>
                <div className="flex flex-col items-center mt-8">
                    <h2 className="text-lg mb-4">Redes Sociales</h2>
                    <div className="flex space-x-4" style={{ marginBottom: '30px' }}>
                        <Link href={'/'} className="cursor-pointer">
                            <Facebook size={25} aria-label="Facebook" />
                        </Link>
                        <Link href={'/'} className="cursor-pointer">
                            <Instagram size={25} aria-label="Instagram" />
                        </Link>
                    </div>
                </div>
            </Container>
            <div className="bg-gray-700 py-4 flex flex-col items-center">
                <p className="text-xs text-gray-300">© 2024 LIGA MASTER. TODOS LOS DERECHOS RESERVADOS.</p>
                <a href="https://goatdata.com.ar/" target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center">
                    <span className="text-xs text-gray-300 underline">Diseñado y desarrollado por</span>
                    <img src={'/images/logos08.png'} alt="Goat Data Logo" className="h-2.5 mx-1" />
                    <span className="text-xs text-gray-300">DATA</span>
                </a>
            </div>
        </footer>
    )
}