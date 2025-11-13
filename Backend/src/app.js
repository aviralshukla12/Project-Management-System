import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://project-task-management12.netlify.app",
  "https://project-management-system-iul8.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

import { errorHandler } from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import noteRouter from "./routes/note.routes.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";

// * healthcheck
app.get("/", (req, res) => {
  res.send("Hello, welcome to Project Mang!");
})
app.use("/api/v1/healthcheck", healthcheckRouter);

// * app routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/tasks", taskRouter); // each task must have projectId to it for permission check
app.use("/api/v1/notes", noteRouter);

app.use(errorHandler);

export default app;
