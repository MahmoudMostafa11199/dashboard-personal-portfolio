import { useState } from 'react';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';

import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';
import Button from '../../ui/Button';

import { useLogin } from './useLogin';

function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { isLoggingIn, login } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSuccess: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  };

  return (
    <section className="container-xxl">
      <div className="text-center mb-5 px-3">
        <HiArrowRightOnRectangle className="icon w-10 h-10 mx-auto mb-4" />
        <h1 className="text-4xl font-semibold">Welcome</h1>
        <span className="text-sm">Sign in to your account</span>
      </div>

      <form className="text-sm" onSubmit={handleSubmit}>
        <FormRowVertical label="email">
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            className="px-4 py-2 border-1 border-gray-300 shadow-sm rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoggingIn}
          />
        </FormRowVertical>
        <FormRowVertical label="password">
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="password"
            className="px-4 py-2 border-1 border-gray-300 shadow-sm rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggingIn}
          />
        </FormRowVertical>

        <FormRowVertical>
          <Button type="submit" variation="primary" size="large">
            {isLoggingIn ? <SpinnerMini /> : 'Login'}
          </Button>
        </FormRowVertical>
      </form>
    </section>
  );
}

export default LoginForm;
