import toast from 'react-hot-toast';
import type { ToastOptions } from 'react-hot-toast';

const errorOptions: ToastOptions = {
  style: {
    fontFamily: 'Inter',
    fontSize: '0.8rem',
    fontWeight: 600,
    background: '#121212',
    color: 'red',
  },
  iconTheme: {
    primary: 'red',
    secondary: '#0f1219',
  },
  duration: 3000,
};

const successptions: ToastOptions = {
  style: {
    fontFamily: 'Inter',
    fontSize: '0.8rem',
    fontWeight: 600,
    background: '#202020',
    color: '#00e500',
  },
  iconTheme: {
    primary: '#00e500',
    secondary: '#0f1219',
  },
  duration: 2000,
};

const toastMessage = (
  type: 'success' | 'error' | 'warning',
  message: string
) => {
  if (type === 'success') {
    toast.success(message, successptions);
  } else if (type === 'error') {
    toast.error(message, errorOptions);
  }
};

export default toastMessage;
