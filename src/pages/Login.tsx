import React from 'react';
import AuthLayout from '../components/AuthLayout';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Icon } from '@iconify/react';
import { useAuthStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import toastMessage from '../services/toasterService';
import { Helmet } from 'react-helmet-async';

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
      <AuthLayout>
        <div className="flex w-full justify-center">
          <Form
            className="w-full max-w-xs flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <Input
              isRequired
              errorMessage="Please enter a valid email"
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email"
              type="email"
              onValueChange={setEmail}
            />
            <Input
              isRequired
              label="Password"
              name="password"
              labelPlacement="outside"
              placeholder="Enter your password"
              value={password}
              onValueChange={setPassword}
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
                    className="text-default-400 text-lg"
                  />
                </Button>
              }
              type={isVisible ? 'text' : 'password'}
              className="mt-2"
            />
            <div className="w-full mt-2">
              <p className="text-md text-center">
                Not an user?&nbsp;
                <span
                  className="text-primary font-semibold cursor-pointer"
                  onClick={toRegister}
                >
                  Register
                </span>
              </p>
            </div>
            <div className="flex w-full py-2 justify-center">
              <Button variant="light" onPress={forgotPassword}>
                Forgot/Reset password?
              </Button>
            </div>
            <div className="flex w-full gap-2 justify-center mt-2">
              <Button
                color="primary"
                type="submit"
                variant="flat"
                className="w-32 font-semibold text-primary-400"
              >
                Log in
              </Button>
            </div>
          </Form>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
