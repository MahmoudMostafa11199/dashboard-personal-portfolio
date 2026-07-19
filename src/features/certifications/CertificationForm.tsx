import { useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { HiPhoto } from 'react-icons/hi2';
import Button from '../../ui/Button';
import FileUploadModal from '../../ui/FileUploadModal';
import FormRow from '../../ui/FormRow';
import Modal from '../../ui/Modal';
import SearchableSelect from '../../ui/SearchableSelect';
import { CERTIFICATION_ISSUERS } from '../../utils/certificationsIssuers';
import type { CertificationFormType, CertificationType } from './types';
import { useCreateCertification } from './useCreateCertification';
import { useUpdateCertification } from './useUpdateCertification';
import { formatTimestampForInput } from '../../utils/helpers';

type Props = {
  certificationToEdit?: CertificationType;
  onClose?: () => void;
};

function CreateCertificationForm({
  certificationToEdit = {} as CertificationType,
  onClose,
}: Props) {
  const [imageURL, setImageURL] = useState(certificationToEdit?.imageURL ?? '');

  const { createCertification, isCreating } = useCreateCertification();
  const { editCertification, isEditing } = useUpdateCertification();
  const isWorking = isCreating || isEditing;

  const { id: certificationId, ...editValues } = certificationToEdit;
  const isEditSession = !!certificationId;

  const formattedEditValues = isEditSession
    ? {
        ...editValues,
        issueDate: formatTimestampForInput(editValues.issueDate),
      }
    : {};

  const { register, handleSubmit, control, formState, watch, reset } =
    useForm<CertificationFormType>({ defaultValues: formattedEditValues });

  const { errors } = formState;
  const certTitle = watch('title');

  const onSubmit: SubmitHandler<CertificationFormType> = (data) => {
    const payload = { ...data, imageURL };

    if (!isEditSession) {
      createCertification(payload, {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      });
    } else {
      editCertification(
        { updatedCertification: payload, id: certificationId },
        {
          onSuccess: () => {
            onClose?.();
          },
        },
      );
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        {isEditSession ? 'Edit Certification' : 'Add New Certification'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Title */}
        <FormRow label="Certification Title" error={errors?.title?.message}>
          <input
            id="title"
            type="text"
            className="form__input"
            disabled={isWorking}
            {...register('title', {
              required: 'This field is required',
            })}
          />
        </FormRow>

        {/* Certificate image upload */}
        <FormRow label="Certificate Image">
          <div className="flex items-center gap-2">
            <div className="h-14 rounded-md bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
              {imageURL ? (
                <img
                  src={imageURL}
                  alt="certificate"
                  className="w-full h-full object-cover"
                />
              ) : (
                <HiPhoto size={22} className="text-gray-400" />
              )}
            </div>

            <Modal>
              <div className="relative group flex-1">
                <Modal.Open opens="upload-certification-image">
                  <Button
                    disabled={!certTitle}
                    type="button"
                    variation="secondary"
                    size="small"
                  >
                    Upload Certificate Image
                  </Button>
                </Modal.Open>
                {!certTitle && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Enter a title first
                  </div>
                )}
              </div>

              <Modal.Window name="upload-certification-image">
                <FileUploadModal
                  acceptImages={true}
                  enableCrop={false}
                  onSave={(url) => setImageURL(url as string)}
                  folder="Certificates"
                  fileName={`${certTitle}-${Date.now()}`}
                />
              </Modal.Window>
            </Modal>
          </div>
        </FormRow>

        {/* Issuer — searchable select */}
        <FormRow label="Issuer" error={errors?.issuer?.message}>
          <Controller
            name="issuer"
            control={control}
            rules={{ required: 'This field is required' }}
            render={({ field }) => (
              <SearchableSelect
                id="issuer"
                options={CERTIFICATION_ISSUERS}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select issuer..."
                searchPlaceholder="Search issuers..."
                disabled={isWorking}
              />
            )}
          />
        </FormRow>

        {/* Description */}
        <FormRow label="Description (optional)">
          <textarea
            id="description"
            rows={2}
            className="form__input"
            disabled={isWorking}
            {...register('description')}
          />
        </FormRow>

        {/* Issue date */}
        <FormRow label="Issue Date" error={errors?.issueDate?.message}>
          <input
            id="issueDate"
            type="date"
            className="form__input"
            disabled={isWorking}
            {...register('issueDate', {
              required: 'This field is required',
            })}
          />
        </FormRow>

        {/* Credential URL */}
        <FormRow label="Credential URL (optional)">
          <input
            id="credentialUrl"
            type="url"
            className="form__input"
            placeholder="https://..."
            disabled={isWorking}
            {...register('credentialUrl')}
          />
        </FormRow>

        {/* Actions */}
        <FormRow hasButton={true}>
          <button
            type="button"
            className="px-6 py-2.5 rounded-md border border-gray-300 transition-colors hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-750"
            onClick={() => onClose?.()}
            disabled={isWorking}
          >
            Cancel
          </button>
          <Button type="submit" disabled={isWorking}>
            {isWorking
              ? 'Saving...'
              : isEditSession
                ? 'Save Changes'
                : 'Add Certification'}
          </Button>
        </FormRow>
      </form>
    </div>
  );
}

export default CreateCertificationForm;
