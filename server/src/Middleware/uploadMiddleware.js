// middlewares/uploadMiddleware.js
const multer = require("multer");
const path = require("path");

// Usar almacenamiento temporal en disco (se puede mejorar con memoria si querés)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // asegurate de que la carpeta exista
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
