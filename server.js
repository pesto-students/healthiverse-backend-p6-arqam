import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./db.js";
import cors from "cors";
import socketio from "./socket.js";
import userRoutes from "./routes/userRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
dotenv.config();
connectDb();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
const PORT = process.env['PORT'];
const server = app.listen(PORT, () =>
  console.log(`Server is Running on Port ${PORT}`)
);

const io = socketio(server);

app.use("/api/users", userRoutes);
app.use("/api/stripe", stripeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
