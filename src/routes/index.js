import express from "express";
import userRoutes from "./api/user.routes";
import schoolRoutes from "./api/school.routes";
import projectRoutes from "./api/project.routes";

const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/school", schoolRoutes);
routes.use("/project", projectRoutes);

export default routes;
