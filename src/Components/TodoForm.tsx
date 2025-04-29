import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm: React.FC = () => {
	const [text, setText] = useState<string>("");
	const { addTodo } = useTodo();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (text.trim()) {
			await addTodo(text);
			setText("");
		}
	};
	return (
		<form onSubmit={handleSubmit} className="w-full relative">
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Add your task"
				className="h-12 px-4 pr-28 rounded-full w-full bg-white border border-gray-300 focus:ring-2 focus:ring-red-400 transition-all duration-200"
				aria-label="New task"
			/>
			<button
				type="submit"
				className="h-12 absolute right-[0.03rem] bg-red-400 hover:bg-red-500 text-white font-medium px-6 rounded-full transition-colors duration-200 uppercase tracking-wide"
			>
				Add
			</button>
		</form>
	);
};

export default TodoForm;
