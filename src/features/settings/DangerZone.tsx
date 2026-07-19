import { type User } from 'firebase/auth';
import { BsFillExclamationTriangleFill, BsTrash } from 'react-icons/bs';
import Button from '../../ui/Button';
import { useDeleteUser } from './useDeleteUser';

function DangerZone({ user }: { user: User }) {
  const {
    password,
    showConfirm,
    setPassword,
    setShowConfirm,
    isDeleting,
    handleDeleteAccount,
  } = useDeleteUser(user);

  return (
    <div className="bg-white shadow-xs py-5 px-4 sm:py-7 sm:px-6 rounded-md dark:bg-gray-700 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-red-400/10 text-red-700 p-3 rounded-md dark:text-red-600 shrink-0">
          <BsFillExclamationTriangleFill size={24} />
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-red-700 dark:text-red-500">
          Danger Zone
        </h3>
      </div>

      <p className="text-sm sm:text-base">
        <strong>Delete Account</strong> - Once you deactivate your account.
        there is no going back. All project data and insights will be
        permanently purged. Please be certain.
      </p>

      {!showConfirm ? (
        <Button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="flex items-center justify-center w-full gap-3 text-base! bg-red-700 hover:bg-red-800"
        >
          <BsTrash />
          <span>Delete Account</span>
        </Button>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-red-600 font-medium">
            Enter your password to confirm deletion:
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="form__input w-full bg-gray-300 dark:bg-gray-600 disabled:opacity-50"
          />
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              type="button"
              variation="secondary"
              onClick={() => setShowConfirm(false)}
              className="flex-1 py-1.5! px-1! text-[13px]!"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleDeleteAccount}
              disabled={!password || isDeleting}
              className="flex-1 py-1.5! px-1! text-[13px]! bg-red-700 hover:bg-red-800 text-white"
            >
              {isDeleting ? 'Deleting...' : 'Confirm Delete'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DangerZone;
