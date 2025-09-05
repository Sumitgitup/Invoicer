import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import clientRoutes from "./routes/client.routes";
import authRoutes from "./routes/auth.routes";
import { connectDB } from "./utils/db";
import { errorMiddleware } from "./middleware/error.middleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health-check", (req, res) => {
  res.json({
    message: "API is working fine",
  });
});

// Route all the coming to the authRoute
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/client", clientRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
