import { MdSecurity } from 'react-icons/md';
import FormRowVertical from '../../ui/FormRowVertical';
import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import type { User } from 'firebase/auth';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ChangePasswordProps = {
  user: User;
};

export default function ChangePassword({ user }: ChangePasswordProps) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, formState, getValues, setError, reset } =
    useForm<ChangePasswordFormData>();

  const { errors } = formState;

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const credential = EmailAuthProvider.credential(
        user.email!,
        data.currentPassword,
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, data.newPassword);

      toast.success('Password updated successfully');
      reset();

      //
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('invalid-credential')) {
          setError('currentPassword', {
            message: 'Current password is incorrect',
          });
        } else {
          toast.error(err.message);
        }
      }
    }
  };

  return (
    <div className="bg-white shadow-xs py-5 px-4 sm:py-7 sm:px-6 rounded-md dark:bg-gray-700">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-red-800 rounded-md bg-red-400/10 p-2 shrink-0">
          <MdSecurity size={28} />
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-semibold">
            Security & Access
          </h3>
          <p className="text-sm">Update your login credentials</p>
        </div>
      </div>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="md:col-span-2">
          <FormRowVertical
            label="CURRENT PASSWORD"
            error={errors.currentPassword?.message}
          >
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                id="currentPassword"
                placeholder="************"
                className="form__input  w-full bg-gray-300 dark:bg-gray-600 disabled:opacity-50"
                {...register('currentPassword', {
                  required: 'Current password is required',
                })}
              />
              <button
                type="button"
                onClick={() => setShowCurrent((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showCurrent ? <HiEyeSlash size={18} /> : <HiEye size={18} />}
              </button>
            </div>
          </FormRowVertical>
        </div>

        <FormRowVertical
          label="NEW PASSWORD"
          error={errors.newPassword?.message}
        >
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              id="newPassword"
              placeholder="************"
              className="form__input w-full bg-gray-300 dark:bg-gray-600 disabled:opacity-50"
              {...register('newPassword', {
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                validate: (value) =>
                  value !== getValues('currentPassword') ||
                  'New password must be different from current password',
              })}
            />
            <button
              type="button"
              onClick={() => setShowNew((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {showNew ? <HiEyeSlash size={18} /> : <HiEye size={18} />}
            </button>
          </div>
        </FormRowVertical>
        <FormRowVertical
          label="CONFIRM NEW PASSWORD"
          error={errors.confirmPassword?.message}
        >
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="************"
              className="form__input w-full bg-gray-300 dark:bg-gray-600 disabled:opacity-50"
              {...register('confirmPassword', {
                required: 'Please confirm your new password',
                validate: (value) =>
                  value === getValues('newPassword') ||
                  'Passwords do not match',
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {showConfirm ? <HiEyeSlash size={18} /> : <HiEye size={18} />}
            </button>
          </div>
        </FormRowVertical>

        <div className="md:col-span-2">
          <Button type="submit" className='w-full lg:w-auto'>Update Password</Button>
        </div>
      </form>
    </div>
  );
}
