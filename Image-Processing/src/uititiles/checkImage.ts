import { promises as fsPromises } from 'fs';
import path from 'path';
import sharp from 'sharp';

const checkImageInFull = async (filename: string):Promise<boolean> => {
  const imageInFull = path.resolve('./') + `/assets/full/${filename}.jpg`;
  try {
    await fsPromises.access(imageInFull);
    return true;
  } catch {
    return false;
  }
};

const checkImageInThumb = async (
  filename: string,
  width: number,
  height: number
):Promise<boolean> => {
  const imageInThumb = path.resolve('./') + `/assets/thumb/${filename}_${width}_${height}.jpg`;
  try {
    await fsPromises.access(imageInThumb);
    return true;
  } catch (err) {
    return false;
  }
};

const saveImage = async (filename: string, width: number, height: number):Promise<string> => {
  const imageInFull = path.resolve('./') + `/assets/full/${filename}.jpg`;
  const imageInThumb = path.resolve('./') + `/assets/thumb/${filename}_${width}_${height}.jpg`;
  await sharp(imageInFull).resize(width, height).toFile(imageInThumb);
  await fsPromises.chmod(imageInThumb, 0o666);
  return imageInThumb;
};

export { checkImageInFull, checkImageInThumb, saveImage };
