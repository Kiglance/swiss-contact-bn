import { uploadImage, uploadPdf } from "../helpers/multer.helper";

export default class MulterMiddleware {
  async imageUploader(req, res, next) {
    try {
      const upload = uploadImage.single("picture");

      upload(req, res, (err) => {
        if (err) {
          return res.status(400).json({
            message: "Multer error",
            error: err.message,
          });
        }
        next();
      });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "You are not authorized to perform this action",
          error: error.message,
        });
    }
  }

  async pdfUploader(req, res, next) {
    try {
      const upload = uploadPdf.single("projectFile");

      upload(req, res, (err) => {
        if (err) {
          return res.status(400).json({
            message: "Multer error",
            error: err.message,
          });
        }
        next();
      });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "You are not authorized to perform this action",
          error: error.message,
        });
    }
  }
}
