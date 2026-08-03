import { useForm, type SubmitHandler } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import type { SkillFormInput, SkillType } from './types';
import { useCreateSkill } from './useCreateSkill';
import { useUpdateSkill } from './useUpdateSkill';

type SkillFormProps = {
  skillToEdit?: SkillType;
  onClose?: () => void;
};

function CreateSkillForm({
  skillToEdit = {} as SkillType,
  onClose,
}: SkillFormProps) {
  const { createSkill, isCreating } = useCreateSkill();
  const { editSkill, isEditing } = useUpdateSkill();
  const isWorking = isCreating || isEditing;

  const { id: skillId, ...editValues } = skillToEdit;
  const isEditSession = !!skillId;

  const formattedEditValues = isEditSession
    ? {
        ...editValues,
        tags: editValues?.tags?.join(','),
        proficiency: String(editValues.proficiency || 0),
      }
    : { proficiency: '0' };

  const { register, handleSubmit, reset, formState, watch } =
    useForm<SkillFormInput>({
      defaultValues: formattedEditValues,
    });

  const { errors } = formState;

  //
  const proficiencyValue = watch('proficiency');

  const onSubmit: SubmitHandler<SkillFormInput> = (data) => {
    if (!isEditSession) {
      createSkill(data, {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      });
    } else {
      editSkill(
        { newSkillData: data, skillId },
        {
          onSuccess: () => {
            onClose?.();
          },
        },
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      {/* Name */}
      <FormRow label="Skill Name" error={errors?.name?.message}>
        <input
          id="name"
          type="text"
          className="form__input"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      {/* Category Name */}
      <FormRow label="Category Name" error={errors?.category?.message}>
        <input
          id="categoryName"
          type="text"
          className="form__input"
          disabled={isWorking}
          {...register('category', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      {/* Icon type */}
      <FormRow label="Icon Type" error={errors?.iconType?.message}>
        <select
          id="iconType"
          disabled={isWorking}
          {...register('iconType', {
            required: 'This field is requried',
          })}
          className="form__input dark:bg-gray-800"
        >
          <option value="">Select Icon Type</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="language">Language</option>
          <option value="database">Database</option>
          <option value="style">Style</option>
        </select>
      </FormRow>

      {/* Category Filter */}
      <FormRow label="Category Filter" error={errors?.categoryFilter?.message}>
        <select
          id="categoryFilter"
          disabled={isWorking}
          {...register('categoryFilter', {
            required: 'This field is requried',
          })}
          className="form__input dark:bg-gray-800"
        >
          <option value="">Select Category Filter</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="database">Database</option>
          <option value="other">Other</option>
        </select>
      </FormRow>

      {/* Proficiency */}
      <FormRow label="Proficiency" error={errors?.proficiency?.message}>
        <div className="flex items-center gap-2">
          <input
            type="range"
            id="proficiency"
            min={0}
            max={100}
            disabled={isWorking}
            className="flex-1 h-2 bg-gray-300 rounded-full appearance-none cursor-pointer slider dark:bg-gray-700"
            {...register('proficiency', {
              required: 'This field is requried',
              min: {
                value: 10,
                message: 'Proficiency must be at least 10%',
              },
            })}
          />
          <span className="w-12 text-right font-medium text-primary-600">
            {String(proficiencyValue)}%
          </span>
        </div>
      </FormRow>

      {/* Tags */}
      <FormRow label="Tags" error={errors?.tags?.message}>
        <textarea
          id="tags"
          rows={2}
          className="form__input"
          placeholder="Hook, Redux..."
          disabled={isWorking}
          {...register('tags')}
        ></textarea>
      </FormRow>

      <FormRow hasButton={true}>
        <button
          type="button"
          onClick={onClose}
          disabled={isWorking}
          className="px-6 py-2.5 rounded-md border border-gray-300 transition-colors hover:bg-gray-400 dark:border-gray-700 dark:hover:bg-gray-750"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isWorking}
          className="px-6 py-2.5 rounded-md text-white transition-colors bg-primary-700 hover:bg-primary-800"
        >
          {isEditSession ? 'Edit Skill' : 'Create Skill'}
        </button>
      </FormRow>
    </form>
  );
}

export default CreateSkillForm;
