import React from "react";
import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
	const { todos } = useTodo();

	if (todos.length === 0) {
		return (
			<div className="p-8 text-center text-gray-500">
				<p>No tasks yet. Add a task to get started!</p>
			</div>
		);
	}
    return (
        <ul className="divide-y divide-gray-100">
            {todos.map((todo) => (
    <TodoItem key={todo._id} todo={todo}/>
))}
        </ul>
    )
};

export default TodoList;
