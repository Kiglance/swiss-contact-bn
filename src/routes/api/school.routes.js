import express from "express";
import SchoolController from "../../controllers/school.controller";
import SchoolMiddleware from "../../middlewares/school.middleware";
import MulterMiddleware from "../../middlewares/multer.middleware";

const router = express.Router();

router.post(
  "/",
  async (req, res, next) => {
    await new SchoolMiddleware().checkIsAdmin(req, res, next);
  },
  async (req, res, next) => {
    await new SchoolMiddleware().schoolNameTakenMiddleware(req, res, next);
  },
  async (req, res) => {
    await new SchoolController().addSchool(req, res);
  }
);

router.get("/", async (req, res) => {
  await new SchoolController().getSchools(req, res);
});

router.get("/:id", async (req, res) => {
  await new SchoolController().getOneSchool(req, res);
});

router.post(
  "/login",
  async (req, res, next) => {
    await new SchoolMiddleware().schoolLoginMiddleware(req, res, next);
  },
  async (req, res) => {
    await new SchoolController().schoolLogin(req, res);
  }
);

router.patch(
  "/password/:id",
  async (req, res, next) => {
    await new SchoolMiddleware().schoolExistMiddleware(req, res, next);
  },
  async (req, res) => {
    await new SchoolController().changePassword(req, res);
  }
);

router.patch(
  "/profile/:id",
  async (req, res, next) => {
    await new MulterMiddleware().imageUploader(req, res, next);
  },
  // async (req, res, next) => {
  //   await new SchoolMiddleware().checkIsAdmin(req, res, next);
  // },
  async (req, res, next) => {
    await new SchoolMiddleware().schoolExistMiddleware(req, res, next);
  },
  async (req, res) => {
    await new SchoolController().changeSchoolProfile(req, res);
  }
);

router.patch(
  "/:id",
  async (req, res, next) => {
    await new SchoolMiddleware().checkIsAdmin(req, res, next);
  },
  async (req, res, next) => {
    await new SchoolMiddleware().schoolExistMiddleware(req, res, next);
  },
  async (req, res) => {
    await new SchoolController().updateSchool(req, res);
  }
);

router.delete(
  "/:id",
  async (req, res, next) => {
    await new SchoolMiddleware().checkIsAdmin(req, res, next);
  },
  async (req, res) => {
    await new SchoolController().deleteSchool(req, res);
  }
);

export default router;
