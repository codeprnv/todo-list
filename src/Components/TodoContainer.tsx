import React from "react";
import TodoHeader from "./TodoHeader";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";
import LoadingSpinner from "./LoadingSpinner";

const TodoContainer: React.FC = () => {
	const { isLoading, error } = useTodo();
	return (
		<div className="w-full max-w-md flex flex-col items-center my-10  p-8 select-none">
			<TodoHeader />
			<TodoForm />

			<div className="w-full mt-4 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out">
				{isLoading ? (
					<div className="p-8 flex justify-center">
						<LoadingSpinner />
					</div>
				) : error ? (
					<div className="p-6 text-red-500 text-center">{error}</div>
				) : (
					<TodoList />
				)}
			</div>
		</div>
	);
};

export default TodoContainer;
