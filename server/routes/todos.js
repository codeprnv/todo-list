import express from "express";
import Todo from "../models/todo.js";

const router = express.Router();

// Get all Todos
router.get("/", async (req, res) => {
	try {
		const todos = await Todo.find().sort({ createdAt: -1 });
		res.status(200).json(todos);
	} catch (err) {
		console.error("Couldn't get the Todos from the database");
		res.status(404).json({ message: err.message });
	}
});

// Create a new Todo
router.post("/", async (req, res) => {
	const { text } = req.body;
	if (!text) {
		return res.status(400).json({ message: "Todo text is required" });
	}

	const newTodo = new Todo({
		text,
		completed: false,
		createdAt: new Date(),
		completedAt: null,
	});

	try {
		const savedTodo = await newTodo.save();
		res.status(201).json(savedTodo);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
});

// Toggle todo completion status
router.put("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const todo = await Todo.findById(id);

		if (!todo) {
			return res.status(404).json({ message: "Todo not found" });
		}

		const updatedTodo = await Todo.findByIdAndUpdate(
			id,
			{
				completed: !todo.completed,
				completedAt: todo.completed ? null : new Date(),
			},
			{ new: true }
		);

		res.status(200).json(updatedTodo);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Delete a todo
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		await Todo.findByIdAndDelete(id);
		res.status(200).json({ message: "Todo deleted successfully" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

export default router;