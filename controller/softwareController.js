import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import { Software } from "../model/softwareSchema.js";

export const postSoftware = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new ErrorHandler("Software Application Icon/SVG are Required!", 400)
    );
  }
  const { svg } = req.files;
  const { name } = req.body;
  if (!name) {
    return next(new ErrorHandler("Software Application Name is Required"));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "PORTFOLIO_SOFTWARE_APPLICATION" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary Error"
    );
    return next(
      new ErrorHandler("Failed to upload Icon/SVG to Cloudinary", 500)
    );
  }
  const softwareApplication = await Software.create({
    name,
    svg: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Software Application Added!",
    softwareApplication,
  });
});
export const deleteSoftware = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const softwareApplication = await Software.findById(id);
  if (!softwareApplication) {
    return next(new ErrorHandler("Software Application is not Found!", 400));
  }
  const softwareApplicationSvgId = softwareApplication.svg.public_id;
  await cloudinary.uploader.destroy(softwareApplicationSvgId);
  await softwareApplication.deleteOne();
  res.status(200).json({
    success: true,
    message: "Software Application Deleted!",
  });
});
export const getallSoftware = catchAsyncErrors(async (req, res, next) => {
  const softwareApplication = await Software.find();
  res.status(200).json({
    success: true,
    softwareApplication,
  });
});
