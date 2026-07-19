import { useState } from 'react';
import { useMembers } from '../features/settings/useMembers';

type Props = {
  assigneeName: string;
  memberId?: string;
};

function AssigneeAvatar({ assigneeName, memberId }: Props) {
  const [isImageValid, setIsImageValid] = useState<boolean>(true);
  const { members } = useMembers();

  const member = members?.find((m) => m.id === memberId);
  const photoURL = member?.photoURL;

  const showFallback = !isImageValid || !photoURL;

  return (
    <div className="flex items-center gap-1.5">
      {!showFallback ? (
        <img
          src={photoURL}
          alt={assigneeName}
          className="w-8 h-8 rounded-full border border-gray-400 object-cover object-top dark:border-gray-800"
          loading="lazy"
          width="32"
          height="32"
          onError={() => setIsImageValid(false)}
        />
      ) : (
        <span className="text-sm w-8 h-8 place-content-center text-center rounded-full text-primary-100 bg-orange-600">
          {assigneeName
            .split(' ')
            .slice(0, 2)
            .map((n) => n[0])
            .join('')}
        </span>
      )}
      <span>{assigneeName}</span>
    </div>
  );
}

export default AssigneeAvatar;
