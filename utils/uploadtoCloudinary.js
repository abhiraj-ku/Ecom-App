const cloudinary = require("cloudinary");

module.exports.uploadPhotosToCloudinary = async (photos) => {
  const images = [];

  for (let index = 0; index < photos.length; index++) {
    console.log("UPLOAD START...");

    const result = await cloudinary.v2.uploader.upload(
      photos[index].tempFilePath,
      {
        folder: "Ecom",
      }
    );
    console.log("RESULT", result);
    images.push({
      id: result.public_id,
      secure_url: result.secure_url,
    });
  }

  return images;
};
