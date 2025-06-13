import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadInCloudinary = async (filelocalpath) => {
  try {
    if (!filelocalpath) return null;
    const response = await cloudinary.uploader.upload(filelocalpath, {
      resource_type: auto,
    });
    console.log(
      `file has been sucessfully uploaded in cloudinary ${response.url}`
    );
    return response;
  } catch (error) {
    fs.unlinkSync(filelocalpath);
    return null;
  }
};
export { uploadInCloudinary };
