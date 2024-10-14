import { Button, Grid } from "@mui/material";
import { useContext, useRef } from "react";
import { RiImageAddFill as Add } from 'react-icons/ri';
import { TiDeleteOutline as Delete } from 'react-icons/ti';
import { IoMdImages as Images } from 'react-icons/io';
import { IconoErrorInput } from "@/icons";
import { InputUploadProps } from "@/interfaces";
import Context from "@/context/contextPrincipal";

export const InputUpload: React.FC<InputUploadProps> = ({
    title,
    disabled = false,
    error,
    textError,
    descripcion,
    imageName,
    logoAdded,
    subtitle,
    setImage,
    setImageName,
    setLogoAdded,
    handleImageChange,
}) => {
    const [light] = useContext(Context);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const truncateText = (text: string, maxLength: number) => {
        if (text?.length <= maxLength) {
            return text;
        }
        return text?.slice(0, maxLength) + "...";
    };

    const handleFileDelete = () => {
        setImage(null);
        setLogoAdded(false);
        setImageName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Grid item container>
            <Grid mb={0.5} sx={{ color: disabled ? (light ? 'var(--gris2)' : '#444748') : (light ? 'var(--dark2)' : 'var(--gris)'), lineHeight: '24px', fontSize: '14px', cursor: disabled ? 'not-allowed' : 'default', letterSpacing: '0.025px' }}>
                {title}
            </Grid>
            <Button
                component="label"
                fullWidth
                sx={{
                    display: 'flex',
                    gap: '10px',
                    border: light ? (error ? "1px dashed #DE1212 !important" : '1px dashed var(--dark2)') : (error ? "1px dashed #DE1212 !important" : '1px dashed #747878'),
                    color: disabled ? (light ? 'var(--gris2)' : '#444748') : (light ? 'var(--dark2)' : 'var(--gris)'), lineHeight: '24px', fontSize: '14px',
                    textTransform: 'math-auto !important',
                    borderRadius: '9px',
                    height: '45px'
                }}>
                {logoAdded ?
                    <Grid item container justifyContent={'space-between'} sx={{ color: 'var(--check)' }}>
                        <Grid item container xs={10} md={9} alignItems={'center'} gap={1}>
                            {truncateText(imageName, 20)}
                            <Images size={25} />
                        </Grid>
                        <Grid item container xs={1} md={1} alignItems={'center'} sx={{ color: 'var(--danger)' }}>
                            <Delete
                                size={25}
                                style={{ cursor: 'pointer' }}
                                onClick={handleFileDelete}
                            />
                        </Grid>
                    </Grid>
                    :
                    <Grid item container alignItems={'center'} gap={1}>
                        <Add size={20} />
                        {subtitle}
                    </Grid>
                }
                <input ref={fileInputRef} hidden accept="image/*" multiple type="file" onChange={handleImageChange} />
            </Button>
            {error ? <span style={{ color: '#DE1212', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}> <IconoErrorInput />{textError}</span>
                : <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ color: disabled ? (light ? 'var(--gris2)' : '#444748') : (light ? 'var(--dark2)' : 'var(--gris)'), fontSize: '12px' }}>{descripcion}</span>
                </div>}
        </Grid>
    );
};