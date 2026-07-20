import { useForm, type SubmitHandler } from 'react-hook-form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import { formatTimestampForInput } from '../../utils/helpers';
import type { SkillType } from '../skills/types';
import type { ExperienceFormType, ExperienceType } from './types';
import { useCreateExperience } from './useCreateExperience';
import { useUpdateExperience } from './useUpdateExperience';

// Props Types
type Props = {
  experienceToEdit?: ExperienceType;
  skills?: SkillType[];
  onClose?: () => void;
};

// Component
function CreateExperienceForm({
  experienceToEdit = {} as ExperienceType,
  skills = [] as SkillType[],
  onClose,
}: Props) {
  const { createExperience, isCreating } = useCreateExperience();
  const { editExperience, isEditing } = useUpdateExperience();
  const isWorking = isCreating || isEditing;

  const { id: experienceId, ...editValues } = experienceToEdit;
  const isEditSession = !!experienceId;

  const formattedEditValues = isEditSession
    ? {
        ...editValues,
        startDate: formatTimestampForInput(editValues.startDate),
        endDate: editValues.endDate
          ? formatTimestampForInput(editValues.endDate)
          : '',
      }
    : {};

  const { register, handleSubmit, reset, formState, watch } =
    useForm<ExperienceFormType>({
      defaultValues: formattedEditValues,
    });

  const { errors } = formState;
  const isCurrent = watch('current');

  const onSubmit: SubmitHandler<ExperienceFormType> = (data) => {
    if (!isEditSession) {
      createExperience(data, {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      });
    } else {
      editExperience(
        { newExperienceData: data, experienceId },
        {
          onSuccess: () => {
            onClose?.();
          },
        },
      );
    }
  };

  return (
    <div className="w-full space-y-4">
      <h2 className="text-lg font-semibold">
        {isEditSession ? 'Edit Experience' : 'Add New Experience'}
      </h2>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      {/* Title */}
      <FormRow label="Experience Title" error={errors?.title?.message}>
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

      {/* Type */}
      <FormRow label="Type" error={errors?.type?.message}>
        <select
          id="type"
          className="form__input"
          disabled={isWorking}
          {...register('type', { required: 'This field is required' })}
        >
          <option value="work">Work</option>
          <option value="training">Training</option>
          <option value="internship">Internship</option>
          <option value="other">Other</option>
        </select>
      </FormRow>

      {/* Description */}
      <FormRow label="Description" error={errors?.description?.message}>
        <textarea
          id="description"
          rows={4}
          className="form__input"
          disabled={isWorking}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      {/* Start date */}
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <input
          id="startDate"
          type="date"
          className="form__input"
          disabled={isWorking}
          {...register('startDate', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      {/* Current toggle */}
      <FormRow label="Currently ongoing">
        <input
          id="current"
          type="checkbox"
          className="w-4 h-4"
          disabled={isWorking}
          {...register('current')}
        />
      </FormRow>

      {/* End date — hidden while "current" is checked */}
      {!isCurrent && (
        <FormRow label="End Date" error={errors?.endDate?.message}>
          <input
            id="endDate"
            type="date"
            className="form__input"
            disabled={isWorking}
            {...register('endDate', {
              required: !isCurrent ? 'This field is required' : false,
            })}
          />
        </FormRow>
      )}

      {/* Company name */}
      <FormRow
        label="Company / Place Name"
        error={errors?.company?.name?.message}
      >
        <input
          id="company.name"
          type="text"
          className="form__input"
          disabled={isWorking}
          {...register('company.name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      {/* Company location */}
      <FormRow label="Location">
        <input
          id="company.location"
          type="text"
          className="form__input"
          placeholder="e.g. Cairo, Egypt"
          disabled={isWorking}
          {...register('company.location')}
        />
      </FormRow>

      {/* Work mode */}
      <FormRow label="Work Mode" error={errors?.company?.workMode?.message}>
        <select
          id="company.workMode"
          className="form__input"
          disabled={isWorking}
          {...register('company.workMode', {
            required: 'This field is required',
          })}
        >
          <option value="onsite">Onsite</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </FormRow>

      {/* Company url */}
      <FormRow label="Website (optional)">
        <input
          id="company.url"
          type="url"
          className="form__input"
          placeholder="https://..."
          disabled={isWorking}
          {...register('company.url')}
        />
      </FormRow>

      {/* Skills */}
      <FormRow label="Skills">
        <div className="flex flex-wrap gap-3 max-h-40 overflow-y-auto">
          {skills.length === 0 && (
            <p className="text-sm text-gray-500">
              No skills source connected yet — see notes.
            </p>
          )}
          {skills.map((skill) => (
            <label
              key={skill.id}
              className="flex items-center gap-1.5 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                value={skill.id}
                disabled={isWorking}
                {...register('skillIds')}
              />
              {skill.name}
            </label>
          ))}
        </div>
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
          {isEditSession ? 'Save changes' : 'Add Experience'}
        </Button>
      </FormRow>
    </form>
    </div>
  );
}

export default CreateExperienceForm;
