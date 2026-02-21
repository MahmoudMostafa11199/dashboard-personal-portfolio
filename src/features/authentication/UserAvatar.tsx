import { useUser } from './useUser';

function UserAvatar() {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-4">
      <img
        className="w-10 aspect-square rounded-full object-cover object-top overflow-hidden outline-2 outline-gray-100"
        src={`${user?.photoURL}`}
        alt={`Avatar to ${user?.displayName}`}
      />
      <span>{user?.displayName}</span>
    </div>
  );
}

export default UserAvatar;
