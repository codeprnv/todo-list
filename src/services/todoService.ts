import axios from "axios";
import { Todo } from "../context/TodoContext";

const API_URL = "http://localhost:5000/api/todos";

const todoService = {
	getAllTodos: async (): Promise<Todo[]> => {
		try {
			const response = await axios.get(API_URL);
			return response.data;
		} catch (err) {
			console.error("Error fetching todos: ", err);
			throw err;
		}
	},

	createTodo: async (text: string): Promise<Todo> => {
		try {
			const response = await axios.post(API_URL, { text });
			return response.data;
		} catch (err) {
			console.error("Error creating Todo: ", err);
			throw err;
		}
	},

	updateTodo: async (id: string): Promise<Todo> => {
		try {
			const response = await axios.put(`${API_URL}/${id}`);
			return response.data;
		} catch (err) {
			console.error("Error updating Todo: ", err);
			throw err;
		}
	},

	deleteTodo: async (id: string): Promise<void> => {
		try {
			await axios.delete(`${API_URL}/${id}`);
		} catch (error) {
			console.error("Error deleting todo:", error);
			throw error;
		}
	},
};

export default todoService;
