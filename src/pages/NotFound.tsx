import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import Button from '../ui/Button';
import { Link, useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh flex items-center justify-center bg-stone-150 dark:bg-gray-800 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-stone-150 rounded-full dark:bg-gray-900">
            <HiOutlineExclamationTriangle
              size={48}
              className="text-primary-600 dark:text-primary-400"
            />
          </div>
        </div>

        <h1 className="text-6xl font-bold mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-3">Page not found</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-8">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button type="button" onClick={() => navigate(-1)}>
            Go Back
          </Button>

          <Link
            to="/dashboard"
            className="text-sm font-medium px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-stone-200 dark:hover:bg-gray-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
