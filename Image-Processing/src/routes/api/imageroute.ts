import express from 'express';
import {Request,Response} from 'express';
import {checkImageInFull,checkImageInThumb,saveImage} from '../../uititiles/checkImage';
const imageRoute = express.Router();

imageRoute.get("/images", async (req:Request, res:Response)=> {
  const fileName = req.query.filename as string;
  const width = Number(req.query.width) as number;
  const height = Number(req.query.height) as number;

  if (!fileName) {
    return res.status(400).send("Please add filename");
  }
  if (!width) {
    return res.status(400).send("Please add width");
  }
  if (!height) {
    return res.status(400).send("Please add height");
  }
  if (!await checkImageInFull(fileName)) {
    return res.status(400).send("Image not found");
  }

    if(await checkImageInThumb(fileName, width, height)) {
    return res.status(400).send("Image Resized before");
  }

  await saveImage(fileName,width,height);

  res.status(200).sendFile(`assets/thumb/${fileName}.jpg`);

})


export default imageRoute;