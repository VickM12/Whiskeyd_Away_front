import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
let endpoint = '/api';

export default function Show(props) {
	const [fruit, updateFruit] = useState({
		name: '',
		color: '',
		readyToEat: ''
	});

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`${endpoint}/${props.match.params.id}`);
				const data = await response.json();
				await updateFruit(data);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);

	const handleSubmit = async event => {
		event.preventDefault();
		try {
			const submission = { ...fruit };
			!submission.readyToEat
				? (submission.readyToEat = false)
				: (submission.readyToEat = true);

			// const response = await fetch('/api', {
			// 	method: 'PUT',
			// 	headers: {
			// 		'Content-Type': 'application/json'
			// 	},
			// 	body: JSON.stringify(submission)
			// });
			const data = await response.json();
			await updateFruit([...fruit, data]);
			await updateFruit({
				name: '',
				color: '',
				readyToEat: ''
			});
		} catch (e) {
			console.error(e);
			console.log(fruit);
		}
	};

	return (
		<div className="Page-wrapper">
			{Object.keys(fruit).length > 0 ? (
				<div>
					<h1>{fruit.name} Edit Page.</h1>
					<h2>
						{fruit.name} is {fruit.color}.
					</h2>
					<h2>
						{fruit.name} is {fruit.readyToEat ? 'ready to eat' : ' not edible'}.
					</h2>
				</div>
			) : (
				<h1>Nothing found on {props.match.params.id}.</h1>
			)}
			<form onSubmit={handleSubmit} className="task-form">
				<h1> Edit Fruit Form </h1>
				Name:{' '}
				<input
					type="text"
					name="name"
					id="name"
					value={fruit.name}
					onChange={updateFruit}
				/>
				<br />
				Color:{' '}
				<input
					type="text"
					name="color"
					id="color"
					value={fruit.color}
					onChange={updateFruit}
				/>
				<br />
				Is Ready To Eat:{' '}
				<input
					type="checkbox"
					name="readyToEat"
					id="readyToEat"
					value={fruit.readyToEat}
					onChange={updateFruit}
				/>
				<br />
				<button type="submit">Submit Fruit</button>
			</form>
			<h3>
				<Link to={'/'}>Go Back Home</Link>
			</h3>
		</div>
	);
}
