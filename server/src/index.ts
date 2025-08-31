import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./utils/db";
import authRoutes from "./api/auth/user";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
};

app.get("/api/health-check", (req, res) => {
  res.json({
    message: "API is working fine",
  });
});

// Route all the coming to the authRoute 
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


startServer();
