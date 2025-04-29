import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todos.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/todo-list";

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB: ", err.message);
	});

app.use((err, res) => {
	console.error(err.stack);
	res.status(500).json({ message: "Something went wrong on the server" });
});
