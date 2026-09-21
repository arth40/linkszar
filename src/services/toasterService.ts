import toast from 'react-hot-toast';
import type { ToastOptions } from 'react-hot-toast';

const errorOptions: ToastOptions = {
  style: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 600,
    background: '#FFFFFF',
    color: '#C6402F',
    border: '1px solid #E4DDCB',
  },
  iconTheme: {
    primary: '#C6402F',
    secondary: '#ffffff',
  },
  duration: 3000,
};

const successptions: ToastOptions = {
  style: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 600,
    background: '#FFFFFF',
    color: '#191712',
    border: '1px solid #E4DDCB',
  },
  iconTheme: {
    primary: '#3D4FD1',
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
