import { alertaSubmit } from "@/utils/altert";

export const handleSolicitarPassword = (
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    solicitarContraseña: any,
    email: string,
    queryClient: any,
    router: any,
    setEmailError: React.Dispatch<React.SetStateAction<any>>,
    setEmailErrorText: React.Dispatch<React.SetStateAction<any>>,
) => {
    setIsLoading(true);
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    if (!isValidEmail(email)) {
        alertaSubmit(false, 'Debes escribir un email válido');
        setEmailError(true)
        setEmailErrorText('Debes escribir un email válido')
        setIsLoading(false);
        return;
    }
    solicitarContraseña({ form: { email } }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["login"]);
            alertaSubmit(true, success?.data.message);
            setIsLoading(false);
            router.push("/login");
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const handleCrearUser = (
    nombre: string,
    apellido: string,
    fecha_de_nacimiento: string,
    email: string,
    password: string,
    repeated_password: string,
    equipo: string,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    crearUser: any,
    queryClient: any,
    router: any,
    setErrorNombre: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageNombre: React.Dispatch<React.SetStateAction<any>>,
    setErrorApellido: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageApellido: React.Dispatch<React.SetStateAction<any>>,
    setErrorEmail: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageEmail: React.Dispatch<React.SetStateAction<any>>,
    setErrorPassword: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessagePassword: React.Dispatch<React.SetStateAction<any>>,
    setErrorRepeated_password: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageRepeated_password: React.Dispatch<React.SetStateAction<any>>,
    setErrorFecha_de_nacimiento: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageFecha_de_nacimiento: React.Dispatch<React.SetStateAction<any>>,
    setErrorEquipo: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageEquipo: React.Dispatch<React.SetStateAction<any>>,
) => {
    setIsLoading(true);
    const formData = { nombre, apellido, fecha_de_nacimiento, email, password, repeated_password, equipo };
    crearUser({ form: formData }, {
        onSuccess: (success: { data: { data: { message: string; }; }; }) => {
            queryClient.invalidateQueries(["login"]);
            alertaSubmit(true, success?.data?.data?.message);
            setIsLoading(false);
            router.push("/login");
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            setIsLoading(false);
            alertaSubmit(false, errorMessage);
            if (errorMessage === 'El nombre del usuario es requerido') {
                setErrorNombre(true)
                setErrorMessageNombre(errorMessage)
            }
            if (errorMessage === 'El apellido del usuario es requerido') {
                setErrorApellido(true)
                setErrorMessageApellido(errorMessage)
            }
            if (errorMessage === 'El correo electrónico no es válido' || errorMessage === 'El correo electrónico ya está en uso') {
                setErrorEmail(true)
                setErrorMessageEmail(errorMessage)
            }
            if (errorMessage === 'La contraseña es requerida' ||
                errorMessage === 'La contraseña debe tener al menos 8 caracteres' ||
                errorMessage === 'La contraseña no puede contener números secuenciales' ||
                errorMessage === 'La contraseña no puede contener espacios en blanco' ||
                errorMessage === 'La contraseña no puede ser igual al nombre o apellido del usuario'
            ) {
                setErrorPassword(true)
                setErrorMessagePassword(errorMessage)
            }
            if (errorMessage === 'La contraseña repetida es requerida' || errorMessage === 'La contraseña repetida no coincide con la contraseña original') {
                setErrorRepeated_password(true)
                setErrorMessageRepeated_password(errorMessage)
            }
            if (errorMessage === 'La fecha nacimiento del usuario es requerida' || errorMessage === 'Debes tener al menos 18 años para registrarte') {
                setErrorFecha_de_nacimiento(true)
                setErrorMessageFecha_de_nacimiento(errorMessage)
            }
            if (errorMessage === 'Debes ingresar el nombre de tu equipo' || errorMessage === 'El nombre del equipo ya está en uso') {
                setErrorEquipo(true)
                setErrorMessageEquipo(errorMessage)
            }
        },
    });
}

export const handleResetPassword = (
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    cambiarContraseñas: any,
    password: string,
    repeated_password: string,
    queryClient: any,
    router: any,
    setPasswordError: React.Dispatch<React.SetStateAction<any>>,
    setPasswordErrorText: React.Dispatch<React.SetStateAction<any>>,
    setRepeatedPasswordError: React.Dispatch<React.SetStateAction<any>>,
    setRepeatedPasswordErrorText: React.Dispatch<React.SetStateAction<any>>,
    email: string,
) => {
    setIsLoading(true);

    const isValidPassword = (password: string) => {
        return password.length >= 8;
    };

    const arePasswordsEqual = (password: string, repeated_password: string) => {
        return password === repeated_password;
    };

    if (!isValidPassword(password)) {
        alertaSubmit(false, 'La contraseña debe tener al menos 8 caracteres');
        setPasswordError(true)
        setPasswordErrorText('Debes escribir un email válido')
        setIsLoading(false);
        return;
    }

    if (!arePasswordsEqual(password, repeated_password)) {
        alertaSubmit(false, 'Las contraseñas no coinciden');
        setRepeatedPasswordError(true);
        setRepeatedPasswordErrorText('Las contraseñas no coinciden');
        setIsLoading(false);
        return;
    }

    cambiarContraseñas({ form: { email, password, repeated_password } }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["login"]);
            alertaSubmit(true, success?.data.message);
            setIsLoading(false);
            router.push("/login");
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};