import cloudinary from "../config/cloudinary.js";
import { PassThrough } from "stream";
import CustomError from "../utilities/CustomError.js";

const uploadBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "Aura_uploads",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    const bufferStream = new PassThrough();
    bufferStream.end(buffer);
    bufferStream.pipe(uploadStream);
  });
};

const uploadToCloudinary = async (req, res, next) => {
  try {
    if (req.file) {
      req.uploadedFile = await uploadBuffer(req.file.buffer);
    } else if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      req.uploadedFiles = await Promise.all(
        req.files.map((file) => uploadBuffer(file.buffer))
      );
    }
    next();
  } catch (error) {
    console.log("Error while uploading file to cloudinary", error);
    return next(new CustomError("Error uploading file to cloudinary", 400));
  }
};

export default uploadToCloudinary;
