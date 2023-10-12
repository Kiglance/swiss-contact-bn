import express from "express";
import ProjectController from "../../controllers/project.controller";
import ProjectMiddleware from "../../middlewares/project.middleware";
import MulterMiddleware from "../../middlewares/multer.middleware";
import SchoolMiddleware from "../../middlewares/school.middleware";

const router = express.Router();

router.post(
  "/",
  async (req, res, next) => {
    await new MulterMiddleware().pdfUploader(req, res, next);
  },
  async (req, res, next) => {
    await new ProjectMiddleware().checkIsSchoolAction(req, res, next);
  },
  async (req, res, next) => {
    await new ProjectMiddleware().projectNameTaken(req, res, next);
  },
  async (req, res) => {
    await new ProjectController().addProject(req, res);
  }
);

router.get(
  "/admin",
  async (req, res, next) => {
    await new SchoolMiddleware().checkIsAdmin(req, res, next);
  },
  async (req, res) => {
    await new ProjectController().getProjects(req, res);
  }
);

router.get(
  "/",
  async (req, res, next) => {
    await new ProjectMiddleware().checkIsSchoolAction(req, res, next);
  },
  async (req, res) => {
    await new ProjectController().getSchoolProjects(req, res);
  }
);

router.get("/school/:id", async (req, res) => {
  await new ProjectController().getSchoolProjectsById(req, res);
});

router.get("/:id", async (req, res) => {
  await new ProjectController().getOneProject(req, res);
});

router.patch(
  "/:id",
  async (req, res, next) => {
    await new MulterMiddleware().pdfUploader(req, res, next);
  },
  async (req, res, next) => {
    await new ProjectMiddleware().checkIsSchoolAction(req, res, next);
  },
  async (req, res, next) => {
    await new ProjectMiddleware().checkIsOwnerSchool(req, res, next);
  },
  async (req, res) => {
    await new ProjectController().updateProjectData(req, res);
  }
);

router.patch(
  "/status/:id",
  async (req, res, next) => {
    await new SchoolMiddleware().checkIsAdmin(req, res, next);
  },
  async (req, res) => {
    await new ProjectController().changeProjectStatus(req, res);
  }
);

router.delete(
  "/:id",
  async (req, res, next) => {
    await new ProjectMiddleware().projectExistMiddleware(req, res, next);
  },
  async (req, res) => {
    await new ProjectController().deleteProject(req, res);
  }
);

router.delete("/", async (req, res) => {
  await new ProjectController().deleteAllProjects(req, res);
});

export default router;
