import toast from 'react-hot-toast';
import type { ToastOptions } from 'react-hot-toast';

const errorOptions: ToastOptions = {
  style: {
    fontFamily: 'Inter',
    fontSize: '0.8rem',
    fontWeight: 600,
    background: '#ffffff',
    color: '#ef4444',
  },
  iconTheme: {
    primary: '#ef4444',
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
    color: '#3fbe7d',
  },
  iconTheme: {
    primary: '#3fbe7d',
    secondary: '#ffffff',
  },
  duration: 3000,
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
