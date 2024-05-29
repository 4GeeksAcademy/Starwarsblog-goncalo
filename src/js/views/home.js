import React, {useContext} from "react";
import "../../styles/home.css";
import {Context} from "../store/appContext"
import {Link} from "react-router-dom"

export const Home = () => {

	const {store, actions} = useContext(Context)
	console.log(store.character)

	return (
		<div className="text-center mt-5">
			{store.character && store.character.map(el => (
				<div key={el.uid} className="card">
					<h2>{el.name}</h2>
					<img src={`https://starwars-visualguide.com/assets/img/characters/${el.uid}.jpg`}/>
					<Link className="btn btn-primary" to={`/single/${el.uid}`}>
						Learn More
					</Link>
				</div>
			))}
		</div>
	)
};
