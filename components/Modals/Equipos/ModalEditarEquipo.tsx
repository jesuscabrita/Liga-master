import Context from "@/context/contextPrincipal";
import { equiposPut } from "@/services/equipos";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, SelectChangeEvent, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { FaUserEdit } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { InputFields } from "@/components/Shared/InputFields";
import { InputSelects } from "@/components/Shared/InputSelect";
import { InputUpload } from "@/components/Shared/InputUpload";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { alertaSubmit } from "@/utils/altert";

interface ModalEditarEquipoProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
    data: { name: string; logo: any; correo: string; instagram: string; _id: string; categoria: string; }
}

const dataCategoria = [
    { codigo: 'Libre - Masculino', descripcion: 'Libre - Masculino' },
    { codigo: 'Libre - Femenino', descripcion: 'Libre - Femenino' },
]

export const ModalEditarEquipo: React.FC<ModalEditarEquipoProps> = ({ open, setOpen, data }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [name, setName] = useState(data?.name);
    const [image, setImage] = useState(data?.logo);
    const [correo, setCorreo] = useState(data?.correo);
    const [instagram, setInstagram] = useState(data?.instagram);
    const [selectCategoria, setSelectCategoria] = useState(data?.categoria);
    const [logoAdded, setLogoAdded] = useState(false);
    const [imageName, setImageName] = useState('');
    const { mutate: editarEquipo } = useMutation(equiposPut);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setSelectCategoria(event.target.value)
    }

    useEffect(() => {
        setName(data?.name);
        setCorreo(data?.correo);
        setImage(data?.logo);
        setInstagram(data?.instagram)
        setLogoAdded(true);
        setImageName(data?.logo);
        setSelectCategoria(data?.categoria)
    }, [data]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (typeof result === 'string') {
                    setImage(result);
                    setLogoAdded(true);
                    setImageName(file.name);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const editarEquipos = (
        id: string,
        name: string,
        logo: any,
        correo: string,
        instagram: string,
        setIsLoading: React.Dispatch<React.SetStateAction<any>>,
        editarEquipo: any,
        queryClient: QueryClient,
        handleClose: () => void,
        categoria: string
    ) => {
        setIsLoading(true);
        const formData = { name, logo, correo, instagram, categoria };
        editarEquipo({ form: formData, id }, {
            onSuccess: (success: any) => {
                queryClient.invalidateQueries(["/api/liga"]);
                alertaSubmit(true, success?.message);
                setIsLoading(false);
                handleClose()
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
                setIsLoading(false);
            },
        });
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {"Editar Equipo"}
                    <FaUserEdit size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Grid item container>
                    <InputFields
                        title="Nombre"
                        descripcion="Escribir nombre del equipo"
                        placeholder="Nombre"
                        type="text"
                        setValue={setName}
                        value={name}
                    />
                </Grid>
                <Grid item container>
                    <InputFields
                        title="Email"
                        descripcion="Escribir email"
                        placeholder="Email"
                        type="text"
                        setValue={setCorreo}
                        value={correo}
                    />
                </Grid>
                <Grid item container>
                    <InputSelects
                        title="Categoria"
                        descripcion="Seleccionar una categoria"
                        value={selectCategoria}
                        data={dataCategoria}
                        handleSelect={handleSelectChange}
                    />
                </Grid>
                <Grid item container>
                    <InputFields
                        title="Instagram"
                        descripcion="Escribir instagram"
                        placeholder="Instagram"
                        type="text"
                        value={instagram}
                        setValue={setInstagram}
                    />
                </Grid>
                <Grid item container>
                    <InputUpload
                        subtitle="Carga o arrastra aqui tu logo"
                        title='Logo'
                        descripcion="Carga o arrastra aqui tu logo"
                        handleImageChange={handleImageChange}
                        imageName={imageName}
                        setImage={setImage}
                        setImageName={setImageName}
                        logoAdded={logoAdded}
                        setLogoAdded={setLogoAdded}
                    />
                </Grid>
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSend
                            title="Editar"
                            icon={FaUserEdit}
                            handleclick={() => {
                                editarEquipos(
                                    data?._id,
                                    name,
                                    image,
                                    correo,
                                    instagram,
                                    setIsLoading,
                                    editarEquipo,
                                    queryClient,
                                    handleClose,
                                    selectCategoria
                                )
                            }}
                        />
                    </Grid>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSend
                            type="Secundario"
                            title="Cancelar"
                            icon={IoExit}
                            handleclick={handleClose}
                        />
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}