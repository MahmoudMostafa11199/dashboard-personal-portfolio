import { useForm } from 'react-hook-form';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import FileUploadModal from '../../ui/FileUploadModal';
import { HiPhoto } from 'react-icons/hi2';
import { useState } from 'react';
import { useCreateAndUpdateMember } from './useCreateAndUpdateMember';
import type { MemberFormType, MemberType } from './types';

type CreateMemberFormProps = {
  memberToEdit?: MemberType;
  onClose?: () => void;
};

function CreateMemberForm({
  memberToEdit = {} as MemberType,
  onClose,
}: CreateMemberFormProps) {
  const [photoURL, setPhotoURL] = useState(memberToEdit?.photoURL ?? '');

  const { createAndUpdateMemberMutation, isCreatingOrUpdating } =
    useCreateAndUpdateMember();

  const { id: memberId, ...editValues } = memberToEdit;
  const isEditSession = !!memberId;

  const { register, handleSubmit, formState, watch, setFocus, setError } =
    useForm<MemberFormType>({
      defaultValues: isEditSession ? editValues : {},
    });
  const memberName = watch('name');
  const { errors } = formState;

  const onSubmit = (data: MemberFormType) => {
    createAndUpdateMemberMutation(
      { memberData: { ...data, photoURL }, id: memberId },
      {
        onSuccess: () => onClose?.(),
        onError: (err) => {
          setFocus('name');
          setError('name', { message: err?.message });
        },
      },
    );
  };

  return (
    <div className="w-80 space-y-4">
      <h2 className="text-lg font-semibold">
        {isEditSession ? 'Edit Member' : 'Add New Member'}
      </h2>

      {/* Photo Upload */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary-700 text-white font-semibold text-lg uppercase place-content-center text-center overflow-hidden">
          {photoURL ? (
            <img
              src={photoURL}
              alt="member"
              className="w-full h-full object-cover"
            />
          ) : (
            <HiPhoto size={24} className="mx-auto text-white/70" />
          )}
        </div>

        <Modal>
          <div className="relative group">
            <Modal.Open opens="upload-member-photo">
              <Button
                disabled={!memberName}
                type="button"
                variation="secondary"
                size="small"
              >
                Upload Photo
              </Button>
            </Modal.Open>
            {!memberName && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Enter a name first
              </div>
            )}
          </div>

          <Modal.Window name="upload-member-photo">
            <FileUploadModal
              acceptImages={true}
              enableCrop={true}
              cropAspect={1}
              onSave={(url) => setPhotoURL(url as string)}
              folder="Members"
              fileName={memberName}
            />
          </Modal.Window>
        </Modal>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <FormRowVertical label="Name" error={errors.name?.message}>
          <input
            type="text"
            className="form__input"
            placeholder="Ahmed Ali"
            {...register('name', {
              required: 'Name is required',
            })}
          />
        </FormRowVertical>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variation="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isCreatingOrUpdating}>
            {isCreatingOrUpdating
              ? 'Saving...'
              : isEditSession
                ? 'Save Changes'
                : 'Add Member'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateMemberForm;
