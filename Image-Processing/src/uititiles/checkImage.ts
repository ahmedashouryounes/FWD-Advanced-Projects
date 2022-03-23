import {promises as fsPromises} from "fs";
import imagesize from "image-size";
import path from "path";
import sharp from "sharp";

const checkImageInFull =async (filename:string)=>{
  const imageInFull = path.resolve('./') + `/assets/full/${filename}.jpg`;
  try {
    await fsPromises.access(imageInFull)
    return true
  } catch {
    return false
  }
}

const checkImageInThumb = async (filename:string,width:number,height:number)=>{
  const imageInThumb = path.resolve('./') + `/assets/thumb/${filename}.jpg`;
  try {
    const dimensions = imagesize(imageInThumb);
    if(dimensions.width == width && dimensions.height == height) return false
    return true
  } catch (err){
    return false
  }
}

const saveImage = async (filename:string,width:number,height:number)=>{
  const imageInFull = path.resolve('./') + `/assets/full/${filename}.jpg`;
  const imageInThumb = path.resolve('./') + `/assets/thumb/${filename}.jpg`;
  sharp(imageInFull)
  .resize(width, height)
  .toFile(imageInThumb, (err, info) => {});
  return imageInThumb;
}


export {
    checkImageInFull,
    checkImageInThumb,
    saveImage
}