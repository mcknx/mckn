import React, { useEffect, useState } from "react";
import FormTodo from "./FormTodo";
import Todo from "./Todo";

function Challenge3() {
	// Challenge 3
	const [todos, setTodos] = useState([
		{
			text: "This is a sample task",
			isDone: false,
		},
	]);

	// Functions ->
	const addTodo = (text) => {
		const newTodos = [...todos, { text }];
		setTodos(newTodos);
	};

	const markTodo = (index) => {
		const newTodos = [...todos];
		newTodos[index].isDone = true;
		setTodos(newTodos);
	};

	const removeTodo = (index) => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	// Functions -/>

	return (
		<div className="card w-full centralize flex-col">
			<FormTodo addTodo={addTodo} />
			<div>
				{todos.map((todo, index) => (
					<div>
						<Todo
							key={index}
							index={index}
							todo={todo}
							markTodo={markTodo}
							removeTodo={removeTodo}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default Challenge3;
