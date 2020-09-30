import React, { useState, useEffect } from 'react';
import AddToFav from '../components/AddToFav.js';
import { Link } from 'react-router-dom';
let endpoint = 'https://whiskey-api.herokuapp.com/whiskeys';
let PORT= 'http://localhost:3000/whiskeys'

export default function Show(props) {
	const [whiskey, showWhiskey] = useState({});


	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(/*`${endpoint}/${props.match.params.id}`*/ `http://localhost:3000/whiskeys/${props.match.params.id}`);
				const data = await response.json();
				await showWhiskey(data);
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
			<div>
			<h3>
				<div>
					{/* { props.isLoggedIn ?  */}
				<AddToFav 
				whiskey = {whiskey}/> 
				</div>
				<Link to={'/'}>Go Back Home</Link>
				<br />
				<Link to={`/${whiskey.id}/edit`}>Go To Edit Page</Link>
			</h3>
			</div>
		</div>
	);
}