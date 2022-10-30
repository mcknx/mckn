import React, { useState } from "react";

function Challenge1() {
	// Challenge 1
	const [vanish, setVanish] = useState(true);
	return (
		<section className="card w-full grid grid-rows-2 min-h-[275px]">
			<h1 className="centralize mb-14">
				{" "}
				<span className={!vanish && "hidden"}>1. Make this vanish 👈</span>
			</h1>
			<div className="centralize ">
				<button
					className="button gradient-blue"
					onClick={() => setVanish(!vanish)}
				>
					Click me!👋
				</button>
			</div>
		</section>
	);
}

export default Challenge1;
