import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
let endpoint = 'https://whiskey-api.herokuapp.com/whiskeys';
let PORT= 'http://localhost:3000'
export default function Show(props) {
	const [whiskey, updateWhiskey] = useState({});

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(/*`${endpoint}/${props.match.params.id}`*/ PORT);
				const data = await response.json();
				await updateWhiskey(data);
				console.log(response)
				console.log(whiskey)
				console.log(data)
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);

	return (
		<div className="Page-wrapper">
			{Object.keys(whiskey).length > 0 ? (
				<div>
					<h1>{whiskey.name.toUpperCase()}</h1>
					<img src={whiskey.image} alt={whiskey.name} />
					<h2>
						{whiskey.distiller}
            <br/>
						{whiskey.origin}
					</h2>
				</div>
			) : (
				<h1>Nothing found on {props.match.params.id}.</h1>
			)}
			<h3>
				<Link to={'/'}>Go Back Home</Link>
				<br />
				<Link to={`/${whiskey.id}/edit`}>Go To Edit Page</Link>
			</h3>
		</div>
	);
}