import express from "express";
import UserController from "../../controllers/user.controller";
import UserMiddleware from "../../middlewares/user.middleware";
import { upload, uploadImage } from "../../helpers/multer.helper";
import MulterMiddleware from "../../middlewares/multer.middleware";

const router = express.Router();

router.post("/", async (req, res) => {
  await new UserController().createUser(req, res);
});

router.post(
  "/login",
  async (req, res, next) => {
    await new UserMiddleware().userLoginMiddleware(req, res, next);
  },
  async (req, res) => {
    await new UserController().userLogin(req, res);
  }
);

router.get("/", async (req, res) => {
  await new UserController().getUsers(req, res);
});

router.get("/:id", async (req, res) => {
  await new UserController().getUser(req, res);
});

router.patch(
  "/profile/:id",
  async (req, res, next) => {
    await new MulterMiddleware().imageUploader(req, res, next);
  },
  async (req, res, next) => {
    await new UserMiddleware().userExistMiddleware(req, res, next);
  },
  async (req, res) => {
    await new UserController().changeUserProfile(req, res);
  }
);

router.patch(
  "/password/:id",
  async (req, res, next) => {
    await new UserMiddleware().userExistMiddleware(req, res, next);
  },
  async (req, res) => {
    await new UserController().changePassword(req, res);
  }
);

router.patch(
  "/user_name/:id",
  async (req, res, next) => {
    await new UserMiddleware().userExistMiddleware(req, res, next);
  },
  async (req, res) => {
    await new UserController().changeUserName(req, res);
  }
);

router.patch(
  "/:id",
  async (req, res, next) => {
    await new MulterMiddleware().imageUploader(req, res, next);
  },
  async (req, res, next) => {
    await new UserMiddleware().userExistMiddleware(req, res, next);
  },
  async (req, res, next) => {
    await new UserMiddleware().checkIsAdmin(req, res, next);
  },
  async (req, res) => {
    await new UserController().updateUser(req, res);
  }
);

export default router;
