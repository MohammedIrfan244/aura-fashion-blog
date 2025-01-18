import cloudinary from "../config/cloudinary.js";
import { PassThrough } from "stream";
import CustomError from "../utilities/CustomError.js";

const uploadToCloudinary = async (req,res,next) => {
    try {
        if(!req.file) return next()
        const buffer = req.file.buffer;
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
                folder: "Aura_uploads",
            },
            (error, result) => {
                if (error) {
                    console.log("from file upload middleware",error);
                    return next(new CustomError("Error uploading file to cloudinary", 400));
                }
                req.uploadedFile = result;
                next();
            }
        )
        const bufferStream = new PassThrough();
        bufferStream.end(buffer);
        bufferStream.pipe(uploadStream);
    } catch (error) {
        console.log("Error while uploading file to cloudinary", error);
        return next(new CustomError("Error uploading file to cloudinary", 400));
    }
};

export default uploadToCloudinary