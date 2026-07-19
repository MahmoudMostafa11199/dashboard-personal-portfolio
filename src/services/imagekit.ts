import ImageKit from 'imagekit-javascript';

const imagekit = new ImageKit({
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
});

type AuthParams = {
  token: string;
  expire: number;
  signature: string;
};

async function getAuthParams(): Promise<AuthParams> {
  const res = await fetch('/api/imagekit-auth');
  if (!res.ok) throw new Error('Failed to get upload authentication');
  return res.json();
}

export const uploadImageToImageKit = async (
  file: File,
  folder: 'Profile' | 'Certificates' | 'Members' | 'Projects' = 'Profile',
  fileName?: string,
): Promise<string> => {
  const { token, expire, signature } = await getAuthParams();

  const resolvedFileName = fileName
    ? fileName.toLowerCase().replace(/\s+/g, '-')
    : `${Date.now()}-${file.name}`;

  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file,
        fileName: resolvedFileName,
        folder: `/${folder}`,
        useUniqueFileName: !fileName,
        token,
        expire,
        signature,
      },
      (err, result) => {
        if (err) return reject(new Error(err.message));
        if (!result) return reject(new Error('Upload failed'));
        resolve(result.url);
      },
    );
  });
};
