import { useState, useRef, useCallback } from 'react';
import ReactCrop, {
  type Crop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { HiPhoto, HiDocument } from 'react-icons/hi2';
import { uploadImageToImageKit } from '../services/imagekit';

type FileUploadModalProps = {
  onClose?: () => void;
  onSave: (file: File | string) => void;
  acceptImages?: boolean;
  acceptFiles?: boolean;
  enableCrop?: boolean;
  cropAspect?: number;
  folder?: 'Profile' | 'Certificates' | 'Members' | 'Projects';
  fileName?: string;
};

const MAX_DIMENSION = 1600;

async function resizeImageFile(
  file: File,
  maxDimension = MAX_DIMENSION,
): Promise<File> {
  if (!file.type.startsWith('image/')) return file;

  const dataUrl: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const img: HTMLImageElement = await new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = dataUrl;
  });

  const { width, height } = img;
  const largestSide = Math.max(width, height);

  if (largestSide <= maxDimension) return file;

  const scale = maxDimension / largestSide;
  const targetWidth = Math.round(width * scale);
  const targetHeight = Math.round(height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return file;

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.85),
  );

  if (!blob) return file;

  const newName = file.name.replace(/\.[^/.]+$/, '') + '.jpg';

  return new File([blob], newName, { type: 'image/jpeg' });
}

function FileUploadModal({
  onClose,
  onSave,
  acceptImages = true,
  acceptFiles = false,
  enableCrop = false,
  cropAspect = 1,
  folder,
  fileName,
}: FileUploadModalProps) {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const acceptString = [
    acceptImages ? 'image/*' : '',
    acceptFiles ? '.pdf,.doc,.docx' : '',
  ]
    .filter(Boolean)
    .join(',');

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    if (file.type.startsWith('image/') && enableCrop) {
      const reader = new FileReader();
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: '%', width: 80 }, cropAspect, width, height),
      width,
      height,
    );
    setCrop(initialCrop);
  };

  const getCroppedFile = useCallback(async (): Promise<File | null> => {
    if (!imgRef.current || !completedCrop || !selectedFile) return null;

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return resolve(null);
        resolve(
          new File([blob], selectedFile.name, { type: selectedFile.type }),
        );
      }, selectedFile.type);
    });
  }, [completedCrop, selectedFile]);

  // Save
  const handleSave = async () => {
    if (enableCrop && imgSrc) {
      const croppedFile = await getCroppedFile();
      if (croppedFile) {
        setIsUploading(true);
        const resized = await resizeImageFile(croppedFile);
        const url = await uploadImageToImageKit(resized, folder, fileName);
        setIsUploading(false);
        onSave(url);
        onClose?.();
      }
    } else if (selectedFile) {
      setIsUploading(true);
      const resized = await resizeImageFile(selectedFile);
      const url = await uploadImageToImageKit(resized, folder, fileName);
      setIsUploading(false);
      onSave(url);
      onClose?.();
    }
  };

  return (
    <div className="w-[500px] space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {enableCrop ? 'Upload & Crop Photo' : 'Upload File'}
      </h2>

      {/* Drop Zone */}
      {!imgSrc && (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-10 flex flex-col items-center gap-3 cursor-pointer hover:border-primary-500 transition"
        >
          {acceptImages && !acceptFiles ? (
            <HiPhoto className="w-10 h-10 text-gray-400" />
          ) : (
            <HiDocument className="w-10 h-10 text-gray-400" />
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click to upload{' '}
            {acceptImages && acceptFiles
              ? 'an image or file'
              : acceptImages
                ? 'an image'
                : 'a file'}
          </p>
          <p className="text-xs text-gray-400">
            {acceptImages && 'PNG, JPG, WEBP'}
            {acceptFiles && ' PDF, DOC, DOCX'}
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={acceptString}
            className="hidden"
            onChange={onSelectFile}
          />
        </div>
      )}

      {/* Crop Area */}
      {imgSrc && enableCrop && (
        <div className="flex flex-col items-center gap-3">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={cropAspect}
            circularCrop={cropAspect === 1}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              onLoad={onImageLoad}
              className="max-h-72 rounded"
            />
          </ReactCrop>

          {/* Button Change photo */}
          <button
            type="button"
            onClick={() => {
              setImgSrc('');
              setSelectedFile(null);
              inputRef.current?.click();
            }}
            className="text-sm text-primary-600 hover:underline"
          >
            Choose different photo
          </button>

          <input
            ref={inputRef}
            type="file"
            accept={acceptString}
            className="hidden"
            onChange={onSelectFile}
          />
        </div>
      )}

      {/* File selected (no crop) */}
      {selectedFile && !enableCrop && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Selected: <span className="font-medium">{selectedFile.name}</span>
        </p>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          disabled={isUploading}
          className="px-5 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!selectedFile || isUploading}
          className="px-5 py-2 rounded bg-primary-700 text-white hover:bg-primary-800 transition text-sm disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : 'Save Photo'}
        </button>
      </div>
    </div>
  );
}

export default FileUploadModal;
