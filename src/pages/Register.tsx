import React from 'react';
import AuthSplitLayout from '../components/AuthSplitLayout';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Icon } from '@iconify/react';
import { useAuthStore } from '../store/userStore';
import { getUserData, saveUserData } from '../services/userService';
import {
  claimHandle,
  isHandleAvailable,
  isHandleFormatValid,
  sanitizeHandle,
} from '../services/handleService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toastMessage from '../services/toasterService';

const inputClassNames = {
  label: 'text-[12.5px] font-semibold text-ink-70',
  inputWrapper:
    'border-[1.5px] border-ink rounded-xl bg-white data-[hover=true]:border-ink group-data-[focus=true]:border-ink shadow-none',
  input: 'font-sans text-[14.5px]',
};

type HandleStatus = 'idle' | 'checking' | 'available' | 'taken' | 'invalid';

const Register: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [handle, setHandle] = React.useState(
    sanitizeHandle(searchParams.get('handle') || '')
  );
  const [handleStatus, setHandleStatus] = React.useState<HandleStatus>('idle');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { signUp, deleteCurrentUser } = useAuthStore();
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validatePassword = (value: string) => {
    const hasMinLength = value.length >= 8;
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);

    return {
      isValid:
        hasMinLength &&
        hasLowerCase &&
        hasUpperCase &&
        hasNumber &&
        hasSpecialChar,
      hasMinLength,
      hasLowerCase,
      hasUpperCase,
      hasNumber,
      hasSpecialChar,
    };
  };

  const validation = validatePassword(password);

  React.useEffect(() => {
    if (!handle) {
      setHandleStatus('idle');
      return;
    }
    if (!isHandleFormatValid(handle)) {
      setHandleStatus('invalid');
      return;
    }
    setHandleStatus('checking');
    const timeout = setTimeout(async () => {
      const available = await isHandleAvailable(handle);
      setHandleStatus(available ? 'available' : 'taken');
    }, 450);
    return () => clearTimeout(timeout);
  }, [handle]);

  const handleHandleChange = (value: string) => {
    setHandle(sanitizeHandle(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validation.isValid || handleStatus !== 'available') return;

    setIsSubmitting(true);
    try {
      const user = await signUp(email, password);
      if (!user) return;

      const claimed = await claimHandle(handle, user.uid);
      if (!claimed) {
        toastMessage('error', 'That handle was just taken — try another');
        setHandleStatus('taken');
        await deleteCurrentUser();
        return;
      }

      const name = handle.charAt(0).toUpperCase() + handle.slice(1);
      await saveUserData({ email, role: 'user', name, handle }, user.uid);
      await getUserData(user.uid);
      toastMessage('success', 'Welcome to linkszar');
      navigate('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toLogin = () => navigate('/login');

  const requirements: Array<[boolean, string]> = [
    [validation.hasMinLength, 'At least 8 characters'],
    [validation.hasLowerCase, 'One lowercase letter'],
    [validation.hasUpperCase, 'One uppercase letter'],
    [validation.hasNumber, 'One number'],
    [validation.hasSpecialChar, 'One special character'],
  ];

  return (
    <>
      <Helmet>
        <title>Linkszar ~ Create your link</title>
        <meta name="description" content="Create your linkszar" />
        <link rel="canonical" href="https://linkszar.com/register" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <AuthSplitLayout
        tagline="Your links deserve one door, not ten tabs."
        footerLabel="Already have a linkszar?"
        footerLinkText="Log in instead"
        footerLinkTo="/login"
      >
        <div>
          <p className="font-display font-semibold text-[28px] m-0">
            Create your linkszar
          </p>
          <p className="text-[14px] text-mist mt-2 mb-0">
            Takes under a minute. No credit card.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-cobalt text-paper text-[11px] font-bold flex items-center justify-center">
              1
            </span>
            <span className="text-[12px] font-semibold">Account</span>
          </div>
          <span className="flex-1 h-px bg-line" />
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-line text-mist text-[11px] font-bold flex items-center justify-center">
              2
            </span>
            <span className="text-[12px] font-semibold text-mist">
              Verify email
            </span>
          </div>
          <span className="flex-1 h-px bg-line" />
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-line text-mist text-[11px] font-bold flex items-center justify-center">
              3
            </span>
            <span className="text-[12px] font-semibold text-mist">
              Go live
            </span>
          </div>
        </div>

        <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="handle"
              className="text-[12.5px] font-semibold text-ink-70"
            >
              Your handle
            </label>
            <div className="flex items-center border-[1.5px] border-ink rounded-xl px-4 py-3 gap-0.5">
              <span className="text-[14.5px] text-mist">linkszar.com/</span>
              <input
                id="handle"
                type="text"
                value={handle}
                onChange={(e) => handleHandleChange(e.target.value)}
                className="border-none outline-none text-[14.5px] font-sans font-semibold flex-1 bg-transparent min-w-0"
                placeholder="yourname"
              />
              {handleStatus === 'checking' && (
                <Icon icon="svg-spinners:ring-resize" className="text-mist" />
              )}
              {handleStatus === 'available' && (
                <Icon icon="lucide:check" className="text-cobalt" />
              )}
              {(handleStatus === 'taken' || handleStatus === 'invalid') && (
                <Icon
                  icon="lucide:x"
                  className="text-danger-ink"
                />
              )}
            </div>
            {handleStatus === 'taken' && (
              <span className="text-[12px] text-danger-ink">
                That handle is already taken
              </span>
            )}
            {handleStatus === 'invalid' && (
              <span className="text-[12px] text-danger-ink">
                3-30 characters: lowercase letters, numbers, hyphens
              </span>
            )}
          </div>

          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="you@example.com"
            type="email"
            onValueChange={setEmail}
            classNames={inputClassNames}
          />

          <Input
            isRequired
            label="Password"
            name="password"
            labelPlacement="outside"
            placeholder="Enter your password"
            value={password}
            onValueChange={setPassword}
            classNames={inputClassNames}
            endContent={
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={toggleVisibility}
                className="focus:outline-none"
                aria-label={isVisible ? 'Hide password' : 'Show password'}
              >
                <Icon
                  icon={isVisible ? 'lucide:eye-off' : 'lucide:eye'}
                  className="text-mist text-lg"
                />
              </Button>
            }
            type={isVisible ? 'text' : 'password'}
          />

          {password && (
            <ul className="flex flex-col gap-1 px-1 text-[12.5px]">
              {requirements.map(([met, label]) => (
                <li
                  key={label}
                  className={`flex items-center gap-2 ${met ? 'text-cobalt' : 'text-mist'}`}
                >
                  <Icon icon={met ? 'lucide:check-circle' : 'lucide:circle'} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          )}

          <Button
            type="submit"
            isDisabled={!validation.isValid || handleStatus !== 'available'}
            isLoading={isSubmitting}
            className="mt-1 bg-ink text-paper font-sans font-semibold rounded-xl h-[50px] text-[15px]"
          >
            Create account
          </Button>

          <div className="flex items-start gap-2.5 bg-white border border-line rounded-xl px-3.5 py-3">
            <Icon
              icon="lucide:mail-check"
              className="text-cobalt text-[16px] mt-0.5 shrink-0"
            />
            <p className="text-[12.5px] leading-[1.5] text-ink-70 m-0">
              We'll send a verification link to your email — your page goes
              live once it's confirmed.
            </p>
          </div>

          <p className="md:hidden text-[14px] text-center w-full text-ink-70">
            Already a user?{' '}
            <span
              className="text-cobalt font-semibold cursor-pointer"
              onClick={toLogin}
            >
              Log in
            </span>
          </p>
        </Form>
      </AuthSplitLayout>
    </>
  );
};

export default Register;
