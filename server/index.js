import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import mainRoutes from "./routes/main.routes.js";

const allowedOrigins = [
  "http://localhost:8080",
  "https://threejs-ai-shirt-q8bbn50x2-eddyriv3ra.vercel.app",
];

dotenv.config();

const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/dalle", mainRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "lalal" });
});

app.listen(8080, () => console.log("Server has started on port 8080"));
