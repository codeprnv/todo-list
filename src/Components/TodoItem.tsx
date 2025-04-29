import React from "react";
import { useTodo, Todo } from "../context/TodoContext";
import { X } from "lucide-react";
import { format } from "date-fns";

interface TodoItemProps {
	todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
	const { toggleTodo, deleteTodo } = useTodo();

	const formatDate = (dateString: string) => {
		return format(new Date(dateString), "MMM d, yyyy h:mm a");
	};
	return (
		<li className="group relative px-6 py-4 transition-all duration-200 hover:bg-gray-100">
			<div className="flex items-start">
				<div className="flex-shrink-0 mt-1">
					<button
						onClick={() => toggleTodo(todo._id)}
						className={`w-6 h-6 rounded-full border-2 ${
							todo.completed
								? "border-green-500 bg-green-500 flex items-center justify-center"
								: "border-gray-300 hover:border-gray-500"
						} transition-colors duration-200 `}
						aria-label={
							todo.completed ? "Mark as incomplete" : "Mark as complete"
						}
					>
						{todo.completed && <span className="text-white text-xs">✓</span>}
					</button>
				</div>
				<div className="ml-3 flex-1 ">
					<div
						className={`text-gray-800 text-lg ${
							todo.completed ? "line-through text-gray-500" : ""
						}`}
					>
						{todo.text}
					</div>

					<div className="text-xs text-gray-500 mt-1">
						Created: {formatDate(todo.createdAt)}
					</div>

					{todo.completed && todo.completedAt && (
						<div className="text-xs text-green-600 mt-1">
							Completed: {formatDate(todo.completedAt)}
						</div>
					)}
				</div>

				<button
					className="ml-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
					aria-label="Delete task"
					onClick={() => deleteTodo(todo._id)}
				>
					<X size={18} />
				</button>
			</div>
		</li>
	);
};

export default TodoItem;
