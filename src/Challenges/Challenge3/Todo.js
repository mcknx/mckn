function Todo({ todo, index, markTodo, removeTodo }) {
	return (
		<div className="todo">
			<span className={todo.isDone && "line-through"}>{todo.text}</span>
			<div>
				<button
					className="button gradient-green"
					onClick={() => markTodo(index)}
				>
					✔
				</button>{" "}
				<button
					className="button gradient-red"
					onClick={() => removeTodo(index)}
				>
					❌
				</button>
			</div>
		</div>
	);
}

export default Todo;
