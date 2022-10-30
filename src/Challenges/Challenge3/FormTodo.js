import { useState } from "react";

function FormTodo({ addTodo }) {
	const [value, setValue] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!value) return;
		addTodo(value);
		setValue("");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="centralize flex-col space-y-6 mb-14"
		>
			<p className="mb-14">3. Add to a list</p>
			<input
				className="p-2 rounded-md text-black"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Add new task"
			/>
			<button className="button gradient-blue" type="submit">
				Add Task
			</button>
		</form>
	);
}

export default FormTodo;
