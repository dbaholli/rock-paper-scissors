import { toast } from 'react-toastify';

export const showToast = (message: string, type: 'info' | 'success' | 'error') => {
    toast[type](message);
};