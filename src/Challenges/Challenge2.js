import React, { useEffect, useState } from "react";

function Challenge2() {
	// Challenge 2
	const [isActive, setIsActive] = useState(false);
	const [isPaused, setIsPaused] = useState(true);
	const [time, setTime] = useState(0);

	// UseEffect ->
	useEffect(() => {
		let interval = null;

		if (isActive && isPaused === false) {
			interval = setInterval(() => {
				setTime((time) => time + 10);
			}, 10);
		} else {
			clearInterval(interval);
		}
		return () => {
			clearInterval(interval);
		};
	}, [isActive, isPaused]);
	// UseEffect -/>

	// Functions ->
	const handleStart = () => {
		setIsActive(true);
		setIsPaused(false);
	};

	const handlePauseResume = () => {
		setIsPaused(!isPaused);
	};

	const handleReset = () => {
		setIsActive(false);
		setTime(0);
		setIsPaused(false);
	};
	// Functions -/>

	return (
		<section className="card w-full ">
			<h1 className="mb-14">2. Create a Basic Timer 👈</h1>
			<div>
				<div>
					<span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
					<span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
					<span className="text-red-600">
						{("0" + ((time / 10) % 100)).slice(-2)}
					</span>
				</div>
				<div className="text-base centralize space-x-4">
					<p>min</p>
					<p>sec</p>
					<p className="text-red-600">ms</p>
				</div>
			</div>
			<div className="button2 space-x-4 space-y-4">
				<button onClick={() => handleStart()} className="button gradient-green">
					Start
				</button>
				<button
					onClick={() => handlePauseResume()}
					className="button gradient-red"
				>
					{isPaused && isActive ? "Resume" : "Stop"}
				</button>
				<button
					onClick={() => handleReset()}
					className="button gradient-yellow"
				>
					Reset
				</button>
			</div>
		</section>
	);
}

export default Challenge2;
