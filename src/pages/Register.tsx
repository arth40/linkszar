import React from 'react';
import AuthLayout from '../components/AuthLayout';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Icon } from '@iconify/react';
import { useAuthStore } from '../store/userStore';
import { getUserData, saveUserData } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Register: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  const { signUp } = useAuthStore();
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Add password validation function
  const validatePassword = (value: string) => {
    const hasMinLength = value.length >= 8;
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

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

  // Add effect to validate password on change
  React.useEffect(() => {
    const validation = validatePassword(password);
    setIsValid(validation.isValid);
  }, [password]);

  const handleUsernameChange = (value: string) => {
    const worldAlphaNumRegex = /^[\p{L} ]$/u;
    if (!value || worldAlphaNumRegex.test(value[value.length - 1])) {
      setUsername(value);
    }
    setIsValid(value.length <= 40);
  };

  // Get validation results for rendering
  const validation = validatePassword(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    const user = await signUp(email, password);
    await saveUserData(
      {
        email,
        role: 'user',
        username,
      },
      user?.uid
    );

    await getUserData(user?.uid);
  };

  const toLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>Linkszar ~ Register</title>
        <meta name="description" content="Register to Linkszar" />
        <link rel="canonical" href="https://linkszar.com/register" />
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
              label="Name"
              labelPlacement="outside"
              name="username"
              value={username}
              placeholder="Enter your Name"
              type="text"
              isInvalid={username.length > 40}
              onValueChange={handleUsernameChange}
              errorMessage={'Max. length 40'}
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
            {password && (
              <div className="space-y-2 px-4 text-small">
                <p className="font-medium">Password requirements:</p>
                <ul className="space-y-1">
                  <li
                    className={`flex items-center gap-2 ${validation.hasMinLength ? 'text-success' : 'text-danger'}`}
                  >
                    <Icon
                      icon={
                        validation.hasMinLength
                          ? 'lucide:check-circle'
                          : 'lucide:x-circle'
                      }
                    />
                    <span>At least 8 characters</span>
                  </li>
                  <li
                    className={`flex items-center gap-2 ${validation.hasLowerCase ? 'text-success' : 'text-danger'}`}
                  >
                    <Icon
                      icon={
                        validation.hasLowerCase
                          ? 'lucide:check-circle'
                          : 'lucide:x-circle'
                      }
                    />
                    <span>One lowercase letter</span>
                  </li>
                  <li
                    className={`flex items-center gap-2 ${validation.hasUpperCase ? 'text-success' : 'text-danger'}`}
                  >
                    <Icon
                      icon={
                        validation.hasUpperCase
                          ? 'lucide:check-circle'
                          : 'lucide:x-circle'
                      }
                    />
                    <span>One uppercase letter</span>
                  </li>
                  <li
                    className={`flex items-center gap-2 ${validation.hasNumber ? 'text-success' : 'text-danger'}`}
                  >
                    <Icon
                      icon={
                        validation.hasNumber
                          ? 'lucide:check-circle'
                          : 'lucide:x-circle'
                      }
                    />
                    <span>One number</span>
                  </li>
                  <li
                    className={`flex items-center gap-2 ${validation.hasSpecialChar ? 'text-success' : 'text-danger'}`}
                  >
                    <Icon
                      icon={
                        validation.hasSpecialChar
                          ? 'lucide:check-circle'
                          : 'lucide:x-circle'
                      }
                    />
                    <span>One special character</span>
                  </li>
                </ul>
              </div>
            )}
            <div className="w-full my-2">
              <p className="text-md text-center">
                Already an user?&nbsp;
                <span
                  className="text-primary font-semibold cursor-pointer"
                  onClick={() => toLogin()}
                >
                  Log in
                </span>
              </p>
            </div>
            <div className="flex w-full gap-2 justify-center mt-4">
              <Button
                color="primary"
                type="submit"
                variant="flat"
                className="w-32 font-semibold text-primary-400"
              >
                Register
              </Button>
            </div>
          </Form>
        </div>
      </AuthLayout>
    </>
  );
};

export default Register;
