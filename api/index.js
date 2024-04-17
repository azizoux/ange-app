import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import provinceRoute from "./routes/province.route.js";
import candidateRoute from "./routes/candidate.route.js";

dotenv.config();
const port = 3000;
const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.log("Error connecting MongoDB!...", err);
  });

app.listen(port, () => {
  console.log("server running on port 3000...");
});

app.use("/api/province", provinceRoute);
app.use("/api/candidate", candidateRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
