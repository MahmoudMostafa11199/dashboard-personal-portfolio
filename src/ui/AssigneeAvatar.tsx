import { useState } from 'react';
import { IMAGE_URL } from '../utils/constants';

type Props = {
  assigneeName: string;
  assigneeImage?: string;
};

function AssigneeAvatar({ assigneeName, assigneeImage }: Props) {
  const [isImageValid, setIsImageValid] = useState<boolean>(true);

  assigneeImage =
    assigneeName == 'Mahmoud Mostafa' ? 'mahmoud.png' : assigneeImage;

  const showFallback = !isImageValid || !assigneeImage;

  return (
    <div className="flex items-center gap-1.5">
      {!showFallback ? (
        <img
          src={`${IMAGE_URL}/about/${assigneeImage}?raw=true`}
          alt={assigneeName}
          className="w-8 h-8 rounded-full border border-gray-400 object-contain dark:border-gray-800"
          loading="lazy"
          width="32"
          height="32"
          onError={() => setIsImageValid(false)}
        />
      ) : (
        <span className="text-sm w-8 h-8 place-content-center text-center rounded-full text-primary-100 bg-orange-600">
          {assigneeName.split(' ').map((n) => n[0])}
        </span>
      )}
      <span>{assigneeName}</span>
    </div>
  );
}

export default AssigneeAvatar;
