import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';
import { HiPhoto, HiPlus, HiXMark } from 'react-icons/hi2';

import type { ProjectFormInput, ProjectType } from './types';
import { useCreateProject } from './useCreateProject';
import { useEditProject } from './useEditProject';
import { formatTimestampForInput } from '../../utils/helpers';
import { useMembers } from '../settings/useMembers';

import FormRow from '../../ui/FormRow';
import { useState } from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import FileUploadModal from '../../ui/FileUploadModal';

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
  const { members } = useMembers();

  const [imageURL, setImageURL] = useState(projectToEdit?.image ?? '');

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
        assignees:
          editValues.assignees?.map((ass) => ({
            memberId: ass.memberId ?? '',
            name: ass.name,
          })) ?? [],
        dueDate: formatTimestampForInput(editValues.dueDate),
        startDate: formatTimestampForInput(editValues.startDate),
        endDate: formatTimestampForInput(editValues.endDate),
        completionPercentage: String(editValues.completionPercentage || 0),
      }
    : {
        completionPercentage: '0',
        assignees: [{ memberId: '', name: '' }],
      };

  const { register, handleSubmit, reset, formState, watch, control } =
    useForm<ProjectFormInput>({
      defaultValues: formattedEditValues,
    });

  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'assignees',
  });

  //
  const percentageValue = watch('completionPercentage');
  const titleValue = watch('title');

  //
  const onSubmit: SubmitHandler<ProjectFormInput> = (data) => {
    const assignees = data.assignees
      ?.map((ass) => {
        const member = members?.find((m) => m.id === ass.memberId);
        return member ? { memberId: member.id, name: member.name } : null;
      })
      .filter((ass): ass is { memberId: string; name: string } => ass !== null);

    const projectData = { ...data, image: imageURL, assignees };

    if (!isEditSession) {
      createProject(projectData, {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      });
    } else {
      editProject(
        { newProjectData: projectData, projectId },
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
        {isEditSession ? 'Edit Project' : 'Add New Project'}
      </h2>

      <form
        className="w-full max-w-4xl space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title */}
        <FormRow label="Project Title" error={errors?.title?.message}>
          <input
            type="text"
            id="title"
            {...register('title', {
              required: 'This field is requried',
            })}
            className="form__input"
          />
        </FormRow>

        {/* Status */}
        <FormRow label="Project Status" error={errors?.status?.message}>
          <select
            id="status"
            {...register('status', {
              required: 'This field is requried',
            })}
            className="form__input dark:bg-gray-800"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </FormRow>

        {/* Description */}
        <FormRow
          label="Project Description"
          error={errors?.description?.message}
        >
          <textarea
            id="description"
            rows={3}
            {...register('description', {
              required: 'This field is requried',
            })}
            className="form__input"
          ></textarea>
        </FormRow>

        {/* Image */}
        <FormRow label="Project Photo">
          <div className="flex items-center gap-4">
            <div className="w-24 h-16 rounded-md bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
              {imageURL ? (
                <img
                  src={imageURL}
                  alt="project"
                  className="w-full h-full object-cover"
                />
              ) : (
                <HiPhoto size={22} className="text-gray-400" />
              )}
            </div>

            <Modal>
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <Modal.Open opens="upload-project-image">
                    <Button
                      disabled={!titleValue}
                      type="button"
                      variation="secondary"
                      size="small"
                    >
                      {imageURL ? 'Change Photo' : 'Upload Photo'}
                    </Button>
                  </Modal.Open>
                  {!titleValue && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Enter a title first
                    </div>
                  )}
                </div>

                {imageURL && (
                  <button
                    type="button"
                    onClick={() => setImageURL('')}
                    className="text-sm px-4 py-1.5 rounded-md border border-gray-300 transition-colors hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Remove
                  </button>
                )}
              </div>

              <Modal.Window name="upload-project-image">
                <FileUploadModal
                  acceptImages={true}
                  enableCrop={false}
                  onSave={(url) => setImageURL(url as string)}
                  folder="Projects"
                  fileName={`${titleValue}-${Date.now()}`}
                />
              </Modal.Window>
            </Modal>
          </div>
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
            className="form__input"
          ></textarea>
        </FormRow>

        {/* Live Demo */}
        <FormRow label="Live demo link" error={errors?.liveLink?.message}>
          <input
            type="url"
            id="liveLink"
            placeholder="https://..."
            {...register('liveLink')}
            className="form__input"
          />
        </FormRow>

        {/* Github Link */}
        <FormRow label="Github link" error={errors?.githubLink?.message}>
          <input
            type="url"
            id="githubLink"
            placeholder="https://github.com/..."
            {...register('githubLink')}
            className="form__input"
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
            className="form__input dark:bg-gray-800"
          />
        </FormRow>

        {/* Start Date */}
        <FormRow label="Start Date" error={errors?.startDate?.message}>
          <input
            type="date"
            id="startDate"
            placeholder="Select data start"
            {...register('startDate')}
            className="form__input dark:bg-gray-800"
          />
        </FormRow>

        {/* End Date */}
        <FormRow label="End Date" error={errors?.endDate?.message}>
          <input
            type="date"
            id="endDate"
            placeholder="Select data end"
            {...register('endDate')}
            className="form__input dark:bg-gray-800"
          />
        </FormRow>

        {/* Notes */}
        <FormRow label="Notes" error={errors?.notes?.message}>
          <textarea
            id="notes"
            {...register('notes')}
            className="form__input"
          ></textarea>
        </FormRow>

        {/* Assignees */}
        <FormRow label="Assignees" error={errors?.assignees?.message}>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <select
                  {...register(`assignees.${index}.memberId`, {
                    required: 'Please select a member',
                  })}
                  onChange={(e) => {
                    const member = members?.find(
                      (m) => m.id === e.target.value,
                    );
                    if (member) {
                      register(`assignees.${index}.name`).onChange({
                        target: { value: member.name },
                      });
                    }
                  }}
                  className="form__input dark:bg-gray-800 flex-1"
                >
                  <option value="">Select member...</option>
                  {members?.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-rose-500 hover:text-rose-700 transition-colors"
                >
                  <HiXMark className="size-5" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => append({ memberId: '', name: '' })}
              className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 transition-colors"
            >
              <HiPlus className="size-4" />
              Add Assignee
            </button>
          </div>
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
                min: {
                  value: 10,
                  message: 'Completion Percentage must be at least 10%',
                },
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
    </div>
  );
}

export default CreateProjectForm;
