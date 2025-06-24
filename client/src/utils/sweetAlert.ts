import Swal from 'sweetalert2';

export const showSuccess = (message: string) => {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
    confirmButtonColor: '#c09cc1',
  });
};

export const showError = (message: string) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    confirmButtonColor: '#c09cc1',
  });
};