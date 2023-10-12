import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import db from "./database/models";
import "dotenv/config";
import routes from "./routes";
import { errorHandler } from "./helpers/multer.helper";

const app = express();
const port = process.env.PORT;

app.use(morgan("dev"));
app.use(cors());

app.use("/profile", express.static("upload/images"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/v1", routes);
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "❄️❄️❄️ Welcome to Swiss Contact API.❄️❄️❄️" });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Path not found." });
});
app.use(errorHandler);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}`);
  });
});
