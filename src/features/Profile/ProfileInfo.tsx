import { useForm, type SubmitHandler } from 'react-hook-form';
import FormRowVertical from '../../ui/FormRowVertical';
import type { CurrentUser, ProfileFormInput } from '../authentication/types';
import { useUpdateProfileInfo } from './useUpdateProfileInfo';

type ProfileInfoProps = {
  profile: CurrentUser['profile'] | null;
};

function ProfileInfo({ profile }: ProfileInfoProps) {
  console.log(profile);
  const { register, handleSubmit, formState, reset, setValue } = useForm({
    defaultValues: {
      displayName: profile?.displayName || '',
      email: profile?.email || '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      phoneNumber: profile?.phoneNumber || '',
      githubProfile: profile?.githubProfile || '',
      linkedinUrl: profile?.linkedinUrl || '',
      description: profile?.description || '',
      twitterUrl: profile?.twitterUrl || '',
      resumeUrl: profile?.resumeUrl || '',
      titleWork: profile?.titleWork || '',
      status: profile?.status || 'available',
    },
  });
  const { updatedUser, isEditing } = useUpdateProfileInfo();

  const { errors } = formState;

  const onSubmit: SubmitHandler<ProfileFormInput> = (data) => {
    updatedUser(data);
  };

  return (
    <form
      className="bg-white dark:bg-gray-700 py-7.5 px-7 rounded-lg gap-x-8 mb-5 grid grid-cols-1 md:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRowVertical label="Name" error={errors.displayName?.message}>
        <input
          type="text"
          id="displayName"
          className="form__input bg-gray-300 dark:bg-gray-600 disabled:opacity-50"
          disabled={isEditing}
          {...register('displayName', { required: 'Name is required' })}
        />
      </FormRowVertical>

      <FormRowVertical label="Email" error={errors.email?.message}>
        <input
          type="email"
          id="email"
          className="form__input bg-gray-300 dark:bg-gray-600 disabled:opacity-50"
          disabled={isEditing}
          {...register('email', { required: 'Email is required' })}
        />
      </FormRowVertical>

      <FormRowVertical label="Title Work" error={errors.titleWork?.message}>
        <input
          type="text"
          id="titleWork"
          className="form__input bg-gray-300 dark:bg-gray-600 disabled:opacity-50"
          disabled={isEditing}
          {...register('titleWork', { required: 'Title Work is required' })}
        />
      </FormRowVertical>

      <FormRowVertical label="Status" error={errors.status?.message}>
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              profile?.status === 'available'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
            }`}
            onClick={() => setValue('status', 'available')}
            disabled={isEditing}
          >
            Available
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              profile?.status === 'unavailable'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
            }`}
            onClick={() => setValue('status', 'unavailable')}
            disabled={isEditing}
          >
            Unavailable
          </button>
        </div>
      </FormRowVertical>

      <div className="md:col-span-2">
        <FormRowVertical label="Bio" error={errors.bio?.message}>
          <textarea
            id="bio"
            rows={4}
            className="form__input bg-gray-300 dark:bg-gray-600 disabled:opacity-50"
            disabled={isEditing}
            {...register('bio', { required: 'Bio is required' })}
          ></textarea>
        </FormRowVertical>
        <FormRowVertical label="description">
          <textarea
            id="description"
            rows={4}
            className="form__input bg-gray-300 dark:bg-gray-600 disabled:opacity-50"
            disabled={isEditing}
            {...register('description')}
          ></textarea>
        </FormRowVertical>
      </div>

      <FormRowVertical label="Location" error={errors.location?.message}>
        <input
          type="text"
          id="location"
          className="form__input bg-gray-300 dark:bg-gray-600 disabled:opacity-50"
          disabled={isEditing}
          {...register('location', { required: 'Location is required' })}
        />
      </FormRowVertical>

      <FormRowVertical label="Phone Number" error={errors.phoneNumber?.message}>
        <input
          type="tel"
          id="phoneNumber"
          className="form__input bg-gray-300 dark:bg-gray-600 disabled:opacity-50"
          disabled={isEditing}
          {...register('phoneNumber', {
            required: 'Phone number is required',
            pattern: {
              value: /^\+?[1-9]\d{6,14}$/,
              message: 'Invalid phone number',
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical label="Resume URL" error={errors.resumeUrl?.message}>
        <input
          type="text"
          id="resumeUrl"
          className="form__input bg-gray-300 dark:bg-gray-600 disabled:opacity-50"
          disabled={isEditing}
          {...register('resumeUrl', { required: 'Resume url is required' })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="GitHub Profile"
        error={errors.githubProfile?.message}
      >
        <input
          type="text"
          id="githubProfile"
          className="form__input bg-gray-300 dark:bg-gray-600 disabled:opacity-50"
          disabled={isEditing}
          {...register('githubProfile')}
        />
      </FormRowVertical>

      <FormRowVertical label="LinkedIn URL" error={errors.linkedinUrl?.message}>
        <input
          type="text"
          id="linkedinUrl"
          className="form__input bg-gray-300 dark:bg-gray-600 disabled:opacity-50"
          disabled={isEditing}
          {...register('linkedinUrl')}
        />
      </FormRowVertical>

      <FormRowVertical label="Twitter/X URL" error={errors.twitterUrl?.message}>
        <input
          type="text"
          id="twitterUrl"
          className="form__input bg-gray-300 dark:bg-gray-600 disabled:opacity-50"
          disabled={isEditing}
          {...register('twitterUrl')}
        />
      </FormRowVertical>

      <div className="md:col-span-2 flex items-center justify-end gap-x-3.5 mt-5">
        <button
          className="px-6 py-2.5 rounded-md border border-gray-300 transition-colors hover:bg-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 disabled:opacity-50"
          type="button"
          onClick={() => reset()}
          disabled={isEditing}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2.5 rounded-md text-white transition-colors bg-primary-700 hover:bg-primary-800 disabled:opacity-50"
          type="submit"
          disabled={isEditing}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default ProfileInfo;
