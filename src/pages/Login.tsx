import React from 'react';
import AuthSplitLayout from '../components/AuthSplitLayout';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Icon } from '@iconify/react';
import { useAuthStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import toastMessage from '../services/toasterService';
import { Helmet } from 'react-helmet-async';

const inputClassNames = {
  label: 'text-[12.5px] font-semibold text-ink-70',
  inputWrapper:
    'border-[1.5px] border-ink rounded-xl bg-white data-[hover=true]:border-ink group-data-[focus=true]:border-ink shadow-none',
  input: 'font-sans text-[14.5px]',
};

const Login: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn, sendPasswordReset } = useAuthStore();
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const toRegister = () => {
    navigate('/register');
  };

  const forgotPassword = async () => {
    if (!email) {
      toastMessage('error', 'Enter email to send reset password mail');
      return;
    }
    await sendPasswordReset(email);
  };

  return (
    <>
      <Helmet>
        <title>Linkszar ~ Login</title>
        <meta name="description" content="Login to Linkszar" />
        <link rel="canonical" href="https://linkszar.com/login" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <AuthSplitLayout
        tagline="Your links deserve one door, not ten tabs."
        footerLabel="New to linkszar?"
        footerLinkText="Create your link"
        footerLinkTo="/register"
      >
        <div>
          <p className="font-display font-semibold text-[28px] m-0">
            Welcome back
          </p>
          <p className="text-[14px] text-mist mt-2 mb-0">
            Log in to edit your links.
          </p>
        </div>

        <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

          <Button
            type="submit"
            className="mt-1 bg-ink text-paper font-sans font-semibold rounded-xl h-[50px] text-[15px]"
          >
            Log in
          </Button>

          <div className="flex w-full justify-center">
            <Button
              variant="light"
              onPress={forgotPassword}
              className="text-[13px] text-mist font-sans"
            >
              Forgot / reset password?
            </Button>
          </div>

          <p className="md:hidden text-[14px] text-center w-full text-ink-70">
            Not a user?{' '}
            <span
              className="text-cobalt font-semibold cursor-pointer"
              onClick={toRegister}
            >
              Register
            </span>
          </p>
        </Form>
      </AuthSplitLayout>
    </>
  );
};

export default Login;
