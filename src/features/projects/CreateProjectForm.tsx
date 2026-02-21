import { useForm, type SubmitHandler } from 'react-hook-form';

import FormRow from '../../ui/FormRow';
import type { ProjectFormInput, ProjectType } from './types';
import { useCreateProject } from './useCreateProject';
import { useEditProject } from './useEditProject';

import { formatTimestampForInput } from '../../utils/helpers';

//
type CreateProjectFormProps = {
  projectToEdit?: ProjectType;
  onClose?: () => void;
};

function CreateProjectForm({
  projectToEdit = {} as ProjectType,
  onClose,
}: CreateProjectFormProps) {
  //
  const { createProject, isCreating } = useCreateProject();
  const { editProject, isEditing } = useEditProject();

  const isWorking = isCreating || isEditing;

  //
  const { id: projectId, ...editValues } = projectToEdit;

  const isEditSession = !!projectId;

  //
  const formattedEditValues = isEditSession
    ? {
        ...editValues,
        technologies: editValues.technologies.join(', '),
        assignees: editValues.assignees?.map((ass) => ass.name).join(', '),
        dueDate: formatTimestampForInput(editValues.dueDate),
        startDate: formatTimestampForInput(editValues.startDate),
        endDate: formatTimestampForInput(editValues.endDate),
        completionPercentage: String(editValues.completionPercentage || 0),
      }
    : {};

  const { register, handleSubmit, reset, formState, watch } =
    useForm<ProjectFormInput>({
      defaultValues: formattedEditValues,
    });

  const { errors } = formState;

  //
  const percentageValue = watch(
    'completionPercentage',
    String(editValues.completionPercentage || 0)
  );

  //
  const onSubmit: SubmitHandler<ProjectFormInput> = (data) => {
    const image =
      typeof data.image === 'string' ? data.image : data.image[0].name;

    if (!isEditSession) {
      createProject(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    } else {
      editProject(
        { newProjectData: { ...data, image: image }, projectId },
        {
          onSuccess: () => {
            onClose?.();
          },
        }
      );
    }
  };

  return (
    <form className="w-3xl space-y-2" onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <FormRow label="Project Title" error={errors?.title?.message}>
        <input
          type="text"
          id="title"
          {...register('title', {
            required: 'This field is requried',
          })}
          className="px-2 py-1 border-1 border-gray-300 shadow-sm rounded dark:border-gray-700"
        />
      </FormRow>

      {/* Status */}
      <FormRow label="Project Status" error={errors?.status?.message}>
        <select
          id="status"
          {...register('status', {
            required: 'This field is requried',
          })}
          className="px-2 py-1 border-1 border-gray-300 shadow-sm rounded dark:border-gray-700 dark:bg-gray-800"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </FormRow>

      {/* Description */}
      <FormRow label="Project Description" error={errors?.description?.message}>
        <textarea
          id="description"
          rows={3}
          {...register('description', {
            required: 'This field is requried',
          })}
          className="px-2 py-1 border-1 border-gray-300 shadow-sm rounded dark:border-gray-700"
        ></textarea>
      </FormRow>

      {/* Image */}
      <FormRow label="Project Photo" error={errors?.image?.message}>
        <input
          type="file"
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is requried',
          })}
          className="input__file dark:border-gray-700"
        />
      </FormRow>

      {/* Technologies */}
      <FormRow label="Technologies" error={errors?.technologies?.message}>
        <textarea
          id="technologies"
          rows={3}
          placeholder="React, Tailwind, Firebase..."
          {...register('technologies', {
            required: 'This field is requried',
          })}
          className="px-2 py-1 border-1 border-gray-300 shadow-sm rounded dark:border-gray-700"
        ></textarea>
      </FormRow>

      {/* Live Demo */}
      <FormRow label="Live demo link" error={errors?.liveLink?.message}>
        <input
          type="url"
          id="liveLink"
          placeholder="https://..."
          {...register('liveLink')}
          className="px-2 py-1 border-1 border-gray-300 shadow-sm rounded dark:border-gray-700"
        />
      </FormRow>

      {/* Github Link */}
      <FormRow label="Github link" error={errors?.githubLink?.message}>
        <input
          type="url"
          id="githubLink"
          placeholder="https://github.com/..."
          {...register('githubLink')}
          className="px-2 py-1 border-1 border-gray-300 shadow-sm rounded dark:border-gray-700"
        />
      </FormRow>

      {/* Due Date */}
      <FormRow label="Due Date" error={errors?.dueDate?.message}>
        <input
          type="date"
          id="dueDate"
          {...register('dueDate', {
            required: 'This field is requried',
          })}
          className="px-2 py-1 border-1 border-gray-300 shadow-sm rounded dark:border-gray-700 dark:bg-gray-800"
        />
      </FormRow>

      {/* Start Date */}
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <input
          type="date"
          id="startDate"
          placeholder="Select data start"
          {...register('startDate')}
          className="px-2 py-1 border-1 border-gray-300 shadow-sm rounded dark:border-gray-700 dark:bg-gray-800"
        />
      </FormRow>

      {/* End Date */}
      <FormRow label="End Date" error={errors?.endDate?.message}>
        <input
          type="date"
          id="endDate"
          placeholder="Select data end"
          {...register('endDate')}
          className="px-2 py-1 border-1 border-gray-300 shadow-sm rounded dark:border-gray-700 dark:bg-gray-800"
        />
      </FormRow>

      {/* Notes */}
      <FormRow label="Notes" error={errors?.notes?.message}>
        <textarea
          id="notes"
          {...register('notes')}
          className="px-2 py-1 border-1 border-gray-300 shadow-sm rounded dark:border-gray-700"
        ></textarea>
      </FormRow>

      {/* Assignees */}
      <FormRow label="Assignees" error={errors?.assignees?.message}>
        <textarea
          id="assignees"
          placeholder="Mahmoud Mostafa, Ahmed Hamdi, Sara..."
          {...register('assignees', {
            required: 'This field is requried',
          })}
          className="px-2 py-1 border-1 border-gray-300 shadow-sm rounded dark:border-gray-700"
        ></textarea>
      </FormRow>

      {/* Completion Percentage */}
      <FormRow
        label="Completion Percentage"
        error={errors?.completionPercentage?.message}
      >
        <div className="flex items-center gap-2">
          <input
            type="range"
            id="completionPercentage"
            min={0}
            max={100}
            {...register('completionPercentage', {
              required: 'This field is requried',
            })}
            className="flex-1 h-2 bg-gray-300 rounded-full appearance-none cursor-pointer slider dark:bg-gray-700"
          />
          <span className="w-12 text-right font-medium text-primary-600">
            {String(percentageValue)}%
          </span>
        </div>
      </FormRow>

      {/* Handle create or edit */}
      <FormRow hasButton={true}>
        <button
          className="px-6 py-2.5 rounded-md border border-gray-300 transition-colors hover:bg-gray-400 dark:border-gray-700 dark:hover:bg-gray-750"
          type="button"
          onClick={onClose}
          disabled={isWorking}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2.5 rounded-md text-white transition-colors bg-primary-700 hover:bg-primary-800"
          type="submit"
          disabled={isWorking}
        >
          {isEditSession ? 'Edit' : 'Create'}
        </button>
      </FormRow>
    </form>
  );
}

export default CreateProjectForm;
