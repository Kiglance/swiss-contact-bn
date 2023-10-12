import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb({ message: "unsupported file format" }, false);
  }
};

const pdfFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb({ message: "you can only upload pdf files" }, false);
  }
};

export const uploadImage = multer({
  storage,
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  fileFilter: imageFilter,
});

export const uploadPdf = multer({
  storage,
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  fileFilter: pdfFilter,
});

export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json({
      message: "Multer error",
      error: err.message,
    });
  }
};
