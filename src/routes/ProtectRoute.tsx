import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import Spinner from '../ui/Spinner';

import { useUser } from '../features/authentication/useUser';

function ProtectRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate('/login', { replace: true });
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading)
    return (
      <div className="h-dvh flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (isAuthenticated) return children;

  return null;
}

export default ProtectRoute;
