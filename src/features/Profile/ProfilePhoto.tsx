import ConfirmDelete from '../../ui/ConfirmDelete';
import FileUploadModal from '../../ui/FileUploadModal';
import Modal from '../../ui/Modal';
import type { UserData } from '../authentication/types';
import { useUpdateProfilePhoto } from './useUpdateProfilePhoto';

type ProfilePhotoProps = {
  user: UserData | null;
};

function ProfilePhoto({ user }: ProfilePhotoProps) {
  const { updatedPhoto, isEditing } = useUpdateProfilePhoto();

  return (
    <div className="bg-white dark:bg-gray-700 py-7.5 px-7 rounded-lg flex flex-col sm:flex-row items-center text-center sm:text-start gap-8 mb-4.5">
      <img
        src={user?.photoURL || ''}
        alt="user photo"
        className="object-cover object-top w-30 aspect-square bg-primary-500 rounded-full overflow-hidden outline-2 outline-gray-300 dark:bg-primary-600 dark:outline-gray-600"
      />

      <div>
        <h3 className="text-xl mb-0.5 font-semibold">Profile Photo</h3>
        <p className="text-sm mb-3 text-gray-500 dark:text-gray-300">
          Update your photo to persionalize your dashboard
        </p>

        <div className="space-x-4">
          <Modal>
            <Modal.Open opens="change-photo">
              <button
                className="text-sm px-4 py-1.5 rounded-md text-white transition-colors bg-teal-700 hover:bg-teal-600 dark:hover:bg-teal-800"
                disabled={isEditing}
              >
                Change photo
              </button>
            </Modal.Open>

            <Modal.Window name="change-photo">
              <FileUploadModal
                acceptImages={true}
                enableCrop={true}
                cropAspect={1}
                onSave={(url) => updatedPhoto(url as string)}
                folder="Profile"
              />
            </Modal.Window>

            <Modal.Open opens="remove-photo">
              <button
                disabled={isEditing}
                className="text-sm px-4 py-1.5 rounded-md border border-gray-300 transition-colors hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Remove
              </button>
            </Modal.Open>
            <Modal.Window name="remove-photo">
              <ConfirmDelete
                resourceName="Remove Photo"
                onConfirm={() => updatedPhoto('')}
              />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ProfilePhoto;
