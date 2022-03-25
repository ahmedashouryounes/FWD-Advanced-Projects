import { Request, Response, Router } from 'express';
import path from 'path';
import {
  checkImageInFull,
  checkImageInThumb,
  saveImage,
} from '../../uititiles/checkImage';
const imageRoute = Router();

imageRoute.get('/images', async (req: Request, res: Response) => {
  const fileName = req.query.filename as string;
  const width = Number(req.query.width) as number;
  const height = Number(req.query.height) as number;

  if (!fileName) {
    return res.status(400).send('Please add filename');
  }
  if (!width) {
    return res.status(400).send('Please add width');
  }
  if (!height) {
    return res.status(400).send('Please add height');
  }
  if (!(await checkImageInFull(fileName))) {
    return res.status(400).send('Image not found');
  }

  if ((await checkImageInThumb(fileName, width, height))) {
    return res.status(400).send('Image Resized before')
  }

  const resize = await saveImage(fileName, width, height);
  if(resize)res.status(200).sendFile(resize);
});

export default imageRoute;
