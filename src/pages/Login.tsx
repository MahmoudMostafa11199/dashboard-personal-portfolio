import LoginForm from '../features/authentication/LoginForm';

function Login() {
  return (
    <main className="min-h-dvh grid grid-cols-1 sm:grid-cols-[480px] gap-14 px-5 sm:px-10 items-center justify-center">
      <LoginForm />
    </main>
  );
}

export default Login;
