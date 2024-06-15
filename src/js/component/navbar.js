import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import "../../styles/navBar.css"

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link to="/">
                <img src="https://cdn.worldvectorlogo.com/logos/star-wars-2.svg" alt="logo" className="image-logo" />
            </Link>
			<div className="btn-group">
                <button 
                    type="button" 
                    className="btn btn-warning dropdown-toggle" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                >
                    Favorites
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                    {store.favorites.length > 0 ? (
                        store.favorites.map((item, index) => (
                            <Link key={index} className="dropdown-item" to={`/single${item.type}/${item.uid}`}>
                                {item.name}
                            </Link>
                        ))
                    ) : (
                        <span className="dropdown-item">No favorites added yet</span>
                    )}
                </div>
            </div>
        </nav>
    );
};
