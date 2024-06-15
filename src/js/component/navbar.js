import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navBar.css"

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	
	return (
		<nav className="navbar navbar-dark bg-dark">
			<Link to="/">
				<img src="https://cdn.worldvectorlogo.com/logos/star-wars-2.svg" alr="logo" className="image-logo"/>
			</Link>
			<div className="favourites-container dropdown">
				<button		
					className="btn btn-warning dropdown-toggle" 
					type="button" 
					id="dropdownMenuButton" 
					data-toggle="dropdown" 
					aria-haspopup="true" 
					aria-expanded="false"
				>
					Favorites 
				</button>
				<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
					{store.favorites.length === 0 ? (
						<a className="dropdown-item" href="#">No favorites added</a>
					) : (
						store.favorites.map((fav, index) => (
							<Link key={index} className="dropdown-item" to={`/${fav.type}/${fav.uid}`}>
								{fav.type === 'character' ? store.character.find(c => c.uid === fav.uid)?.name : 
								 fav.type === 'planet' ? store.planets.find(p => p.uid === fav.uid)?.name : 
								 store.vehicles.find(v => v.uid === fav.uid)?.name}
							</Link>
						))
					)}
				</div>
			</div>
		</nav>
	);
};
