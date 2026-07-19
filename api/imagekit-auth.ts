import type { VercelRequest, VercelResponse } from '@vercel/node';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.VITE_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.VITE_IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.VITE_IMAGEKIT_URL_ENDPOINT!,
});

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const result = imagekit.getAuthenticationParameters();
  res.status(200).json(result);
}
