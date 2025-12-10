import toast from 'react-hot-toast';
import type { ToastOptions } from 'react-hot-toast';

const errorOptions: ToastOptions = {
  style: {
    fontFamily: 'Inter',
    fontSize: '0.8rem',
    fontWeight: 600,
    background: '#ffffff',
    color: '#990000',
  },
  iconTheme: {
    primary: '#990000',
    secondary: '#ffffff',
  },
  duration: 3000,
};

const successptions: ToastOptions = {
  style: {
    fontFamily: 'Inter',
    fontSize: '0.8rem',
    fontWeight: 600,
    background: '#ffffff',
    color: '#0d5231',
  },
  iconTheme: {
    primary: '#0d5231',
    secondary: '#ffffff',
  },
  duration: 3000,
};

const toastMessage = (type: 'success' | 'error', message: string) => {
  if (type === 'success') {
    toast.success(message, successptions);
  } else if (type === 'error') {
    toast.error(message, errorOptions);
  }
};

export default toastMessage;
