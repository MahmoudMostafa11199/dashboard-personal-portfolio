import { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import {
  formatTimestamp,
  getColorFromString,
  getInitials,
} from '../../utils/helpers';
import type { CertificationType } from './types';
import CertificationForm from './CertificationForm';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteCertification } from './useDeleteCertification';

type CertificationCardProps = {
  certification: CertificationType;
};

export default function CertificationCard({
  certification,
}: CertificationCardProps) {
  const [hasError, setHasError] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { removeCertification, isDeleting } = useDeleteCertification();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <div className="bg-white rounded-lg p-4.5 dark:bg-gray-750 flex flex-col h-full">
      {certification.imageURL || !hasError ? (
        <img
          src={`${certification.imageURL}?tr=w-400,h-280,c-at_max`}
          alt={certification.title}
          onError={() => setHasError(true)}
          className="aspect-[16/10] mb-5 rounded-md bg-gray-300 dark:bg-gray-800"
          loading="lazy"
        />
      ) : (
        <div
          className={`aspect-[16/10] w-full flex items-center justify-center bg-gradient-to-br mb-5 rounded-md ${getColorFromString(certification.title)}`}
        >
          <span className="text-4xl font-bold text-white/90">
            {getInitials(certification.title)}
          </span>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          {/* Title */}
          <h3
            className="text-lg font-semibold leading-snug mb-2 line-clamp-2"
            title={certification.title}
          >
            {certification.title}
          </h3>

          {/* Dropdown Menu */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <Modal>
              <button
                onClick={() => setOpenDropdown((prev) => !prev)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="More actions"
              >
                <BsThreeDotsVertical size={16} />
              </button>

              {openDropdown && (
                <div className="absolute right-0 top-full mt-1 w-40 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-20 overflow-hidden">
                  <Modal.Open opens="edit-certification">
                    <button
                      className="w-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                      title="Edit"
                    >
                      <HiPencil
                        size={14}
                        className="text-blue-600 dark:text-blue-400"
                      />{' '}
                      Edit
                    </button>
                  </Modal.Open>

                  <Modal.Open opens="delete-certification">
                    <button
                      className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors"
                      title="Delete"
                    >
                      <HiTrash size={14} /> Delete
                    </button>
                  </Modal.Open>
                </div>
              )}
              <Modal.Window name="edit-certification">
                <CertificationForm certificationToEdit={certification} />
              </Modal.Window>

              <Modal.Window name="delete-certification">
                <ConfirmDelete
                  resourceName="Certification"
                  disabled={isDeleting}
                  onConfirm={() => removeCertification(certification.id)}
                />
              </Modal.Window>
            </Modal>
          </div>
        </div>

        {/* Issuer */}
        <p
          className="mb-3.5 font-medium text-sm text-blue-700 dark:text-blue-400 line-clamp-2"
          title={certification.issuer}
        >
          {certification.issuer}
        </p>

        <div className="flex justify-between items-center gap-2 text-sm mt-auto">
          {/* Issued Date */}
          <p>Issued {formatTimestamp(certification.issueDate)}</p>

          {/* Credential URL */}
          <a
            href={certification.credentialUrl}
            target="_blank"
            className="text-blue-700 font-medium pb-0.5 border-b border-b-transparent transition-colors dark:text-blue-400 hover:border-blue-700 inline-flex items-center gap-1.5"
          >
            <FaExternalLinkAlt size={13} />
            View Credential
          </a>
        </div>
      </div>
    </div>
  );
}
