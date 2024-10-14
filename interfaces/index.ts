import { SelectChangeEvent, SwitchProps } from "@mui/material";
import { QueryClient } from "react-query";

export interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
    message: string;
}

export interface ApiJudaoresProps {
    form: any;
    equipoId: string;
    jugadorId: string;
}

export interface SignInProps {
    email: string;
    password: string;
    setErrorEmail: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorPassword: React.Dispatch<React.SetStateAction<boolean>>;
    setMessageErrorEmail: React.Dispatch<React.SetStateAction<string>>;
    setMessageErrorPassword: React.Dispatch<React.SetStateAction<string>>;
}

export interface UserMenuProps {
    user: { nombre: any; role: string; };
    router: any;
    equipoid: string;
    light: boolean;
    isMenuOpen: boolean;
    handleLogout: () => void;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<any>>;
}

export type CustomButtonProps = {
    isOpen: boolean;
    toggle: () => void;
};

export interface ButtonNavbarProps {
    title: string;
    href: string;
    mobile: boolean;
    light: Boolean;
    handleOpenRuta: () => void;
}

export interface MaterialUISwitchProps extends SwitchProps {
    light: boolean;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtomSendProps {
    title: string;
    width?: string;
    widthBorder?: string;
    disabled?: boolean;
    isLoading?: boolean;
    enter?: boolean;
    type?: 'Primario' | 'Secundario' | 'danger' | 'warnning'
    iconSize?: number;
    handleclick: (a?:any) => void;
    icon?: React.ElementType;
}

export interface UserProps {
    apellido: string;
    categoria: string;
    edad: number;
    email: string;
    equipo: string;
    fecha_de_nacimiento: string;
    foto: string;
    last_connection: string;
    nombre: any;
    role: string;
    subCategoria: string;
    tipo: string;
    _id: string;
}

export interface ContextType {
    state: {
        user: UserProps
    };
    dispatch: React.Dispatch<any>;
    SignIn: (props: SignInProps) => void;
    logout: () => void;
}

export interface InputFieldsProps {
    type: 'text' | 'email' | 'number';
    value: any
    mt?: number;
    title: string;
    disabled?: boolean;
    descripcion?: string;
    placeholder?: string;
    handleActive?: boolean;
    error?: boolean;
    textError?: string;
    lengths?: boolean;
    max?: number;
    requerido?: boolean;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface InputPasswordProps {
    title: string;
    mt?: number;
    disabled?: boolean;
    placeholder?: string
    value: any;
    handleActive?: boolean;
    error?: boolean;
    textError?: string;
    descripcion?: string;
    requerido?: boolean;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ModalPerfilProps {
    open: boolean;
    data: { nombre: string; apellido: string; email: string; fecha_de_nacimiento: string; _id: string; }
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface InputSelectProps {
    title: string;
    value: any;
    data?: { codigo: any; descripcion: any }[];
    mt?: number;
    disabled?: boolean;
    descripcion?: string;
    error?: boolean;
    textError?: string;
    requerido?: boolean;
    handleSelect?: (event: SelectChangeEvent<any>) => void;
}

export interface InputDateProps {
    title: string;
    disabled?: boolean;
    value: any;
    error?: boolean;
    descripcion?: string;
    textError?: string;
    handleActive?: boolean;
    requerido?: boolean;
    handleChange?: (date: any) => void
    setValue: React.Dispatch<React.SetStateAction<any>>;
}

export interface UsuariosPageProps {
    nombre: string;
    apellido: string;
    email: string;
    fecha_de_nacimiento: string;
    _id: string;
    role: string;
}

export interface EquipoProps {
    correo: string;
    name: string;
    logo: string;
    partidosJugados: number;
    puntaje_anterior: number;
    instagram: string;
    banco_fondo: number;
    categoria: string;
    tarjetasAmarillas: number;
    tarjetasRojas: number;
    puntos: number;
    empates: number;
    ganados: number;
    perdidos: number;
    goles_a_Favor: number;
    goles_en_Contra: number;
    diferencia_de_Goles: number;
    delegado: { name: string; _id: string }[];
    jugadores: {}[];
    director_tecnico: {}[];
    _id: string;
}

export interface DatosEquipoProps {
    data: {
        equipo: EquipoProps
    };
    isUserAdmin: boolean;
    isSameEmail: boolean;
    equipo_id: any;
    eliminarDelegado: any;
    equipoIndex: number;
    queryClient: any;
    setDelegadoSeleccionado: React.Dispatch<React.SetStateAction<any>>;
    setModalDelegadoChat: React.Dispatch<React.SetStateAction<any>>;
    setModalDelegadoEditar: React.Dispatch<React.SetStateAction<any>>;
}

export interface AccionesAdminProps {
    data: {
        equipo: EquipoProps
    };
    modalDelegado: boolean;
    modalJugador: boolean;
    setModalDelegado: React.Dispatch<React.SetStateAction<any>>;
    setModalJugador: React.Dispatch<React.SetStateAction<any>>;
}

export interface JugadorSeleccionadoProps {
    _id: string;
    transferible: string;
    name: string;
    oferta: {
        respuesta: string;
        logo: string;
        equipo: string;
        fecha_oferta: string;
        precio: number;
        tipo: string;
        sueldo: number;
        contrato: number;
        comentario: string;
        _id: string;
    }[]
}

export interface PlantillasProps {
    value: number;
    isUserAdmin: boolean;
    isSameEmail: boolean;
    data: EquipoProps;
    equipo_id: any;
    queryClient: QueryClient;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    setIsLoadinng: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalDelegadoEditarProps {
    open: boolean;
    id: string;
    data: { name: string; telefono: string; _id: string }
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalChatDelegadoProps {
    open: boolean;
    data: { correo: string; telefono: string; equipo: string }
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalJugadorCapitanProps {
    open: boolean;
    equipoId: string;
    jugador: any
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalJornadaProps {
    open: boolean;
    id: string;
    equipoId: string;
    data: any;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalGlobalProps {
    open: boolean;
    id: string
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalGlobalV2Props {
    open: boolean;
    data: any;
    equipoId: string;
    jugadorId: string;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalRecindirProps {
    open: boolean;
    data: any;
    equipoId: string;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalEditarJugadorProps {
    open: boolean;
    equipoId: any;
    jugadorId: string
    data: any
    setOpen: React.Dispatch<React.SetStateAction<any>>
}

export interface MenuJugadorProps {
    isOpen: boolean;
    index: number;
    isUserAdmin: boolean;
    isSameEmail: boolean;
    jugador: any;
    equipo: { _id: string; };
    lesion_jugador: any;
    eliminarJugador: any;
    inscribir: any;
    listaTransferibleJugador: any;
    queryClient: QueryClient;
    setJugadorSeleccionado: React.Dispatch<React.SetStateAction<any>>;
    setModalJugadorCapitan: React.Dispatch<React.SetStateAction<any>>;
    setModalEditarJugador: React.Dispatch<React.SetStateAction<any>>;
    setModalEditarJornada: React.Dispatch<React.SetStateAction<any>>;
    setOpenRows: React.Dispatch<React.SetStateAction<any>>;
    setModalRenovar: React.Dispatch<React.SetStateAction<any>>;
    setModalRecindir: React.Dispatch<React.SetStateAction<any>>;
    setModalDorsal: React.Dispatch<React.SetStateAction<any>>;
    setIsLoadinng: React.Dispatch<React.SetStateAction<any>>;
}

export interface TablaPlantillaProps {
    jugadores: any;
    equipo: { _id: string; correo: string; }
    queryClient: any;
    eliminarJugador: any;
    lesion_jugador: any;
    inscribir: any;
    listaTransferibleJugador: any;
    isUserAdmin: boolean;
    isSameEmail: boolean;
    setIsLoadinng: React.Dispatch<React.SetStateAction<any>>;
    setJugadorSeleccionado: React.Dispatch<React.SetStateAction<any>>;
    setModalEditarJugador: React.Dispatch<React.SetStateAction<any>>;
    setModalRecindir: React.Dispatch<React.SetStateAction<any>>;
    setModalRenovar: React.Dispatch<React.SetStateAction<any>>;
    setModalDorsal: React.Dispatch<React.SetStateAction<any>>;
    setModalJugadorCapitan: React.Dispatch<React.SetStateAction<any>>;
    setModalEditarJornada: React.Dispatch<React.SetStateAction<any>>;
    setModalJugadorInfo: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalJugadorInfoProps {
    open: boolean;
    jugador: any;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface TablaFichajesProps {
    jugadores: {}[];
    equipoId: any;
    data: { correo: string; };
    eliminarOfert: any;
    queryClient: any;
    setIsLoadinng: React.Dispatch<React.SetStateAction<any>>;
    setModalJugadorInfo: React.Dispatch<React.SetStateAction<any>>;
    setJugadorSeleccionado: React.Dispatch<React.SetStateAction<any>>;
    setModalOferta: React.Dispatch<React.SetStateAction<any>>;
    setModalOfertaRecibida: React.Dispatch<React.SetStateAction<any>>;
    setModalAceptarOferta: React.Dispatch<React.SetStateAction<any>>;
    setModalPrestamo: React.Dispatch<React.SetStateAction<any>>;
    setModalNegociar: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalOfertaRecibidaProps {
    open: boolean;
    equipoId: string;
    jugadorId: string;
    data: {
        transferible: string;
        name: string;
        _id: string;
        oferta: {
            respuesta: string;
            logo: string;
            equipo: string;
            fecha_oferta: string;
            precio: number;
            tipo: string;
            sueldo: number;
            contrato: number;
            comentario: string;
            _id: string;
        }[]
    }
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalOfertaProps {
    open: boolean;
    equipoId: string;
    jugadorId: string;
    data: any
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalNegociarProps {
    open: boolean;
    equipoId: string;
    jugadorId: string;
    data: any
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalPrestamoProps {
    open: boolean;
    equipoId: string;
    jugadorId: string;
    data: any
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface RowType {
    last5: Array<'neutral' | 'win' | 'loss' | 'draw'>;
}

export interface TablePosicionesProps {
    data: any[] | null;
    titleTable: string;
    SubTitle: string;
    isLoading: boolean;
}

export interface TableEstadisticasProps {
    data: { name: string; _id: string; }[];
    titleTable: string;
    SubTitle: string;
    nameEstadistida: string;
}

export interface ModalEditFechaProps {
    open: boolean;
    id: string;
    data: any;
    index: number;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalArbitroProps {
    open: boolean;
    id: string;
    data: any;
    index: number;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface Team {
    _id: string;
    name: string;
    fecha: string;
}

export interface Match {
    homeTeam: string;
    awayTeam: string;
    fecha: string;
}

export interface ButtonStatusProps {
    status: 'enVivo' | 'finPartido' | 'fechaInvalida' | 'agendar' | 'noEmpezado';
    gol_home: number;
    gol_away: number;
    minutosTranscurridos: number;
}

export interface forJugadorProps {
    _id: string;
    suspendido: string;
    name: string;
    jornadas_suspendido: number;
    tarjetas_acumuladas: number;
}

export interface CalcularPartidoProps {
    homeTeam: any;
    awayTeam: any;
    currentRound: number;
    data: any;
    setIsLoadinng: React.Dispatch<React.SetStateAction<any>>;
}

export interface AccionesEquipoProps {
    modal: boolean;
    team: any;
    currentRound: number;
    setModal: React.Dispatch<React.SetStateAction<any>>;
    setIsLoadinng: React.Dispatch<React.SetStateAction<any>>;
}

export interface AddActionProps {
    team: any;
    jugador: any;
    currentRound: number;
    index: number;
    setIsLoadinng: React.Dispatch<React.SetStateAction<any>>;
}

export interface AnularActionProps {
    team: any;
    jugador: any;
    currentRound: number;
    index: number;
    setIsLoadinng: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalListaProps {
    open: boolean;
    data: any;
    currentRound: number;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface dataModalProps {
    name: string;
    logo: any;
    correo: string;
    instagram: string;
    _id: string;
    categoria: string
}

export interface InputUploadProps {
    title: string;
    subtitle: string;
    disabled?: boolean;
    error?: boolean;
    textError?: string;
    descripcion?: string;
    imageName: string;
    logoAdded: boolean;
    setImage: React.Dispatch<React.SetStateAction<any>>;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setImageName: React.Dispatch<React.SetStateAction<any>>;
    setLogoAdded: React.Dispatch<React.SetStateAction<any>>;
}