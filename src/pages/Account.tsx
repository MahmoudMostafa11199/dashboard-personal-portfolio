import { useUser } from '../features/authentication/useUser';
import ProfileInfo from '../features/Profile/ProfileInfo';
import ProfilePhoto from '../features/Profile/ProfilePhoto';

function Account() {
  const { user, profile } = useUser();

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-1 mb-4 px-0 md:px-6">
        <h1 className="text-3xl font-semibold">Profile Settings</h1>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          Welcome back, {user?.displayName} 👋
        </p>
      </div>

      <div className="max-w-5xl py-6 md:py-8 px-0 md:px-6">
        {/* Profile Photo */}
        <ProfilePhoto user={user} />

        {/* Profile Info */}
        <ProfileInfo profile={profile} />
      </div>
    </>
  );
}

export default Account;
