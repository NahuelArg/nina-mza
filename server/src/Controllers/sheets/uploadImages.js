const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No se enviaron imágenes" });
    }

    const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path)
    );

    const results = await Promise.all(uploadPromises);
    const imageUrls = results.map((result) => result.secure_url);

    res.status(200).json({ imageUrl: imageUrls }); // el front espera `imageUrl` como array
  } catch (error) {
    console.error("Error al subir imágenes a Cloudinary:", error.message);
    res.status(500).send("Error al subir imágenes");
  }
};

module.exports = {
  uploadImages,
};
