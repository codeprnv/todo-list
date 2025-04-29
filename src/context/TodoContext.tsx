import react, { useEffect, createContext, useContext, useState } from "react";
import todoService from "../services/todoService";

export interface Todo {
	_id: string;
	text: string;
	completed: string;
	createdAt: string;
	completedAt: string | null;
}

interface TodoContextProps {
	todos: Todo[];
	isLoading: boolean;
	error: string | null;
	addTodo: (text: string) => Promise<void>;
	toggleTodo: (id: string) => Promise<void>;
	deleteTodo: (id: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const useTodo = () => {
	const context = useContext(TodoContext);

	if (!context) {
		throw new Error("useTodo must be used within a TodoProvider");
	}
	return context;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = react.useState<string | null>(null);

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const data = await todoService.getAllTodos();
				setTodos(data);
				setIsLoading(false);
			} catch (err) {
				setError("Failed to fetch Todos" + err);
				setIsLoading(false);
			}
		};

		fetchTodos();
	});

	const addTodo = async (text: string) => {
		try {
			const newTodo = await todoService.createTodo(text);
			setTodos((prevTodos) => [...prevTodos, newTodo]);
		} catch (err) {
			setError("Failed to add Todo" + err);
		}
	};

	const toggleTodo = async (id: string) => {
		try {
			const updatedTodo = await todoService.updateTodo(id);
			setTodos((prevTodos) =>
				prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
			);
		} catch (err) {
			setError("Failed to update Todo" + err);
		}
	};

	const deleteTodo = async (id: string) => {
		try {
			await todoService.deleteTodo(id);
			setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
		} catch (err) {
			setError("Failed to delete Todo" + err);
		}
	};

	return (
		<TodoContext.Provider
			value={{
				todos,
				isLoading,
				error,
				addTodo,
				toggleTodo,
				deleteTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};
