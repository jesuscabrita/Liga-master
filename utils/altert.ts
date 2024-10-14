import Swal from "sweetalert2";

export const alertaSubmit = (submit: boolean, message: string) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: { popup: 'colored-toast', container: 'custom-swal-container', },
        showConfirmButton: false,
        timer: 5500,
        timerProgressBar: true,
    });

    if (submit) {
        Toast.fire({
            icon: 'success',
            title: message
        });
    } else {
        Toast.fire({
            icon: 'error',
            title: message,
        });
    }
};

export const alertaQuestion = (id: string, formData: object, editarEstado: any, success: string, message: string, subMessage: string, error: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    const btnStyle = `
    .swal2-confirm.btn-success {
        background-color: var(--check);
        border-radius: 8px;
        padding:10px;
        color: var(--cero);
    }
    .swal2-cancel.btn-danger {
        background-color: var(--danger);
        border-radius: 8px;
        padding:10px;
        padding:10px;
        color: var(--cero);
    }
    .swal2-actions button + button {
        margin-left: 10px;
    }
`;
    const customStyle = document.createElement('style');
    customStyle.appendChild(document.createTextNode(btnStyle));
    document.head.appendChild(customStyle);

    swalWithBootstrapButtons.fire({
        title: 'Estas segur@?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: success,
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                message,
                subMessage,
                'success'
            );

            editarEstado(id, formData);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                error,
                'error'
            );
        }
    });
};
