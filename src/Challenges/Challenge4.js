import React, { useState } from "react";

function Challenge4() {
	const [inputs, setInputs] = useState({});
	const [show, setShow] = useState(false);

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setShow(true);
	};
	return (
		<div className="card w-full">
			<h1 className="mb-14">4. Submit a form</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="userName" className="centralize flex-col">
						Username:
						<input
							className="text-black"
							name="username"
							value={inputs.username || ""}
							onChange={handleChange}
						/>
					</label>
				</div>
				<br />
				<div>
					<label htmlFor="fullName" className="centralize flex-col">
						FullName:
						<input
							name="fullName"
							className="text-black"
							value={inputs.fullName || ""}
							onChange={handleChange}
						/>
					</label>
				</div>
				<br />
				<div>
					<label htmlFor="age" className="centralize flex-col">
						Age:
						<input
							name="age"
							className="text-black"
							value={inputs.age || ""}
							onChange={handleChange}
						/>
					</label>
				</div>
				<br />
				<button type="submit" className="button gradient-blue mb-14">
					Submit
				</button>
				<div className={!show && "hidden"}>
					<h4>Request Sent to DB with below request data</h4>
					<ul className="text-xl">
						<li>UserName: {inputs.username}</li>
						<li>FullName: {inputs.fullName}</li>
						<li>Age: {inputs.age}</li>
					</ul>
				</div>
			</form>
		</div>
	);
}

export default Challenge4;
