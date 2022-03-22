import {promises as fsPromises} from "fs";
import imagesize from "image-size";
import sharp from "sharp";

const checkImageInFull =async (filename:string)=>{
    const image = `assets/full/${filename}.jpg`
    try {
        await fsPromises.access(image)
        return true
      } catch (err){
        return false
      }
}

const checkImageInThumb = async (filename:string,width:number,height:number)=>{
  const image = `assets/thumb/${filename}.jpg`
  try {
      const dimensions = imagesize(image);
      if(dimensions.width == width && dimensions.height == height) return false
      return true
    } catch (err){
      return false
    }
}

const saveImage = async (filename:string,width:number,height:number)=>{

  sharp(`assets/full/${filename}.jpg`)
  .resize(width, height)
  .toFile(`assets/thumb/${filename}.jpg`, (err, info) => {});
}


export {
    checkImageInFull,
    checkImageInThumb,
    saveImage
}