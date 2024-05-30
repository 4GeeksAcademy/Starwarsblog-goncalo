import React, {useContext, useEffect} from "react";
import "../../styles/home.css";
import {Context} from "../store/appContext"
import {Link} from "react-router-dom"
import {CharacterCard} from '../component/CharacterCard'

export const Home = () => {

	const {store, actions} = useContext(Context)

	return (
		<div className="container-fluid">
			<div className="characters-container">
				{store.character && store.character.map(el => (
					<CharacterCard key={el.uid} uid={el.uid} name={el.name} />
				))}
			</div>
			<div className="d-flex">
				{store.planets && store.planets.map(el => (
					<div key={el.uid}>
						<img src={`https://starwars-visualguide.com/assets/img/planets/${el.uid}.jpg`}/>
						<p>{el.name}</p>
						<Link className="btn btn-primary" to={`/singlePlanet/${el.uid}`}>
							Learn More
						</Link>
					</div>
				))}
			</div>
			<div className="d-flex">
				{store.vehicles && store.vehicles.map(el => (
					<div key={el.uid}>
						<img src={`https://starwars-visualguide.com/assets/img/vehicles/${el.uid}.jpg`}/>
						<p>{el.name}</p>
						<Link className="btn btn-primary" to={`/singleVehicle/${el.uid}`}>
							Learn More
						</Link>
					</div>
				))}
			</div>
		</div>
	)
};
