import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import "../../styles/singleCard.css"

export const CardPlanet = ({ uid }) => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!store.planetDetails[uid]) {
                await actions.getPlanetDetails(uid);
            }
            setLoading(false);
        };

        fetchData();
    }, [uid, actions, store.planetDetails]);

    const planet = store.planetDetails[uid];

    const isFavorite = store.favorites.some(fav => fav.uid === uid && fav.type === 'planet');

    const toggleFavorite = () => {
        if (isFavorite) {
            actions.removeFromFavorites({ uid, type: 'planet', name: planet.properties.name });
        } else {
            actions.addToFavorites({ uid, type: 'planet', name: planet.properties.name });
        }
    };

    return (
        <div key={uid}>
            <div className="card-body">
                {loading ? (
                    <p>Loading details...</p>
                ) : planet ? (
                    <div>
                        <h5 className="card-title">{planet.properties.name}</h5>
                        <p className='card-text'>Population: {planet.properties.population}</p>
                        <p className='card-text'>Terrain: {planet.properties.terrain}</p>
                        <div className="button-group">
                            <Link to={`/singlePlanet/${uid}`} className='btn btn-warning btn-lg mt-4'>
                                Learn More
                            </Link>
                            <button 
                                className="btn btn-danger fav-button" 
                                onClick={toggleFavorite}
                            >
                                <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
                                {isFavorite ? ' Unfavorite' : ' Favorite'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Planet details not found.</p>
                )}
            </div>
        </div>
    );
};