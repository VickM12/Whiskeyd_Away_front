import React, { useState, useEffect } from 'react';
import { Route, Link, BrowserRouter as Router } from "react-router-dom"
import '../App.css'

let endpoint =process.env.MY_API;

export default function Show(props) {
	const [whiskey, updateWhiskey] = useState({
		name: '',
		distiller: '',
		origin: '',
		image:''
	});

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`${endpoint}/${props.match.params.id}`);
				const data = await response.json();
				await updateWhiskey(data);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);

	const handleSubmit = async event => {
		event.preventDefault();
		try {
			const submission = { ...whiskey };
						const response = await fetch(`${endpoint}/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(submission)
			});
			const data = await response.json();
			await updateWhiskey([...whiskey, data]);
			await updateWhiskey({
				name: '',
				distiller: '',
				origin: '',
				image: ''
			});
		} catch (e) {
			console.error(e);
			console.log(whiskey);
		}
	};

	return (
		<div className="Page-wrapper">
			{Object.keys(whiskey).length > 0 ? (
				<div>
					<h1>{whiskey.name} Edit Page.</h1>
					<h2>
						{whiskey.name}
					</h2>
					<img src={whiskey.image} alt={whiskey.name}/>
				</div>
			) : (
				<h1>Nothing found on {props.match.params.id}.</h1>
			)}
			<form onSubmit={handleSubmit} className="task-form">
				<h1> Edit Form </h1>
				Name:{' '}
				<input
					type="text"
					name="name"
					id="name"
					value={whiskey.name}
					onChange={updateWhiskey}
				/>
				<br />
				Distiller:{' '}
				<input
					type="text"
					name="distiller"
					id="distiller"
					value={whiskey.distiller}
					onChange={updateWhiskey}
				/>
				<br />
				Origin:{' '}
				<input
					type="text"
					name="origin"
					id="origin"
					value={whiskey.origin}
					onChange={updateWhiskey}
				/>
				<br />
				Image:{' '}
				<input
					type="text"
					name="image"
					id="image"
					value={whiskey.image}
					onChange={updateWhiskey}
				/>
				<br />
				<button type="submit">Submit Whiskey</button>
			</form>
			<h3>
				<Link to={'/'}>Go Back Home</Link>
			</h3>
		</div>
	);
}
