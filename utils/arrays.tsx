import { TbTemplate as Plantilla } from 'react-icons/tb';
import { GiSoccerKick as Asistir } from 'react-icons/gi';
import { GiSoccerBall as Goles } from 'react-icons/gi';
import { BiTransfer as Fichaje } from 'react-icons/bi';
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { GiSoccerBall as Gol } from 'react-icons/gi';
import { MdOutlineTableChart as Tablas } from 'react-icons/md';
import { GiChampions as Play } from 'react-icons/gi';
import { TbCircleLetterBFilled as B } from "react-icons/tb";
import { TbCircleLetterCFilled as C } from "react-icons/tb";
import { MdAdminPanelSettings as Admin } from "react-icons/md";
import { MdStars as Liga } from "react-icons/md";
import { GiSandsOfTime as Espera } from 'react-icons/gi';

export const NavbarListData = [
    { href: '/', title: 'Home', requiresLogin: false },
    { href: '/calendario', title: 'Calendario', requiresLogin: false },
    { href: '/tabla', title: 'Tabla', requiresLogin: false },
    { href: '/noticias', title: 'Noticias', requiresLogin: false },
    { href: '/registrar', title: 'Registrar', requiresLogin: true },
    { href: '/libres', title: 'J. Libre', requiresLogin: true },
];

export const opcionSelectTabla = [
    { id: 0, name: 'Posiciones', icono: Tablas },
    { id: 1, name: 'Goleadores', icono: Gol },
    { id: 2, name: 'Asistidores', icono: Asistir },
    { id: 3, name: 'Amarillas', icono: Tarjeta, color: 'var(--warnning)' },
    { id: 4, name: 'Rojas', icono: Tarjeta, color: 'var(--danger)' },
    { id: 5, name: 'PlayOff', icono: Play },
]

export const opcionSelectEquipoId = [
    { id: 0, name: 'Plantilla', icono: Plantilla },
    { id: 1, name: 'Goles', icono: Goles },
    { id: 2, name: 'Asistencias', icono: Asistir },
    { id: 3, name: 'Amarillas', icono: Tarjeta, color: 'var(--warnning)' },
    { id: 4, name: 'Rojas', icono: Tarjeta, color: 'var(--danger)' },
    { id: 5, name: 'Fichajes', icono: Fichaje },
];

export const opcionSelectEquipos = [
    { id: 0, name: 'Ligamaster', icono: Liga },
    { id: 1, name: 'Equipos en cola', icono: Espera },
    { id: 2, name: 'Acciones', icono: Admin }
]

export const posiciones = [
    { codigo: 'Portero', descripcion: 'Portero' },
    { codigo: 'Defensa', descripcion: 'Defensa' },
    { codigo: 'Medio', descripcion: 'Medio' },
    { codigo: 'Delantero', descripcion: 'Delantero' }
]

export const nationalities = [
    { codigo: 'Argentina', descripcion: 'Argentina' },
    { codigo: 'Peru', descripcion: 'Peru' },
    { codigo: 'Bolivia', descripcion: 'Bolivia' },
    { codigo: 'Brazil', descripcion: 'Brazil' },
    { codigo: 'Chile', descripcion: 'Chile' },
    { codigo: 'Colombia', descripcion: 'Colombia' },
    { codigo: 'Costa Rica', descripcion: 'Costa Rica' },
    { codigo: 'Cuba', descripcion: 'Cuba' },
    { codigo: 'Republica Dominicana', descripcion: 'Republica Dominicana' },
    { codigo: 'Paraguay', descripcion: 'Paraguay' },
    { codigo: 'Uruguay', descripcion: 'Uruguay' },
    { codigo: 'Mexico', descripcion: 'Mexico' },
    { codigo: 'Ecuador', descripcion: 'Ecuador' },
    { codigo: 'Venezuela', descripcion: 'Venezuela' },
    { codigo: 'Estados Unidos', descripcion: 'Estados Unidos' },
];

export const contratos = [
    { codigo: 0.5, descripcion: 'Media temporada' },
    { codigo: 1, descripcion: '1 Temporada' },
    { codigo: 1.5, descripcion: 'Temporada y media' },
    { codigo: 2, descripcion: '2 Temporadas' },
    { codigo: 2.5, descripcion: '2 Temporadas y media' },
    { codigo: 3, descripcion: '3 Temporadas' },
    { codigo: 3.5, descripcion: '3 Temporadas y media' },
    { codigo: 4, descripcion: '4 Temporadas' },
    { codigo: 4.5, descripcion: '4 Temporada y media' },
    { codigo: 5, descripcion: '5 Temporadas' },
]

export const optionJornada = [
    { codigo: 1, descripcion: '1 jornada' },
    { codigo: 2, descripcion: '2 jornadas' },
    { codigo: 3, descripcion: '3 jornadas' },
    { codigo: 4, descripcion: '4 jornadas' }
]

export const posicionesOrdenadas = {
    'Portero': 1,
    'Defensa': 2,
    'Medio': 3,
    'Delantero': 4,
};

export const arbitros = [
    { codigo: 'Negreira', descripcion: 'Negreira' },
    { codigo: 'Fulanito Perez', descripcion: 'Fulanito Perez' },
    { codigo: 'Jesus Cabrita', descripcion: 'Jesus Cabrita' },
    { codigo: 'Gil Manzano', descripcion: 'Gil Manzano' }
]

export const headers = [
    { label: 'Equipo', align: 'center' },
    { label: 'PTS', align: 'center' },
    { label: 'PJ', align: 'center' },
    { label: 'G', align: 'center' },
    { label: 'E', align: 'center' },
    { label: 'P', align: 'center' },
    { label: 'GF', align: 'center' },
    { label: 'GC', align: 'center' },
    { label: 'DG', align: 'center' },
    { label: 'Ultimos 5', align: 'center' },
];