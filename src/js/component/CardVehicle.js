import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from "react-router-dom";

export const CardVehicle = ({ uid }) => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!store.vehicleDetails[uid]) {
                await actions.getVehicleDetails(uid);
            }
            setLoading(false);
        };

        fetchData();
    }, [uid, actions, store.vehicleDetails]);

    const vehicle = store.vehicleDetails[uid];

    const isFavorite = store.favorites.some(fav => fav.uid === uid && fav.type === 'vehicle');

    const toggleFavorite = () => {
        if (isFavorite) {
            actions.removeFromFavorites({ uid, type: 'vehicle', name: vehicle.properties.name });
        } else {
            actions.addToFavorites({ uid, type: 'vehicle', name: vehicle.properties.name });
        }
    };

    return (
        <div key={uid}>
            <div className="card-body">
                {loading ? (
                    <p className='bg-secondary'>Loading details...</p>
                ) : vehicle ? (
                    <div className='bg-secondary'>
                        <h5 className="card-title">{vehicle.properties.name}</h5>
                        <p className='card-text'>Passengers: {vehicle.properties.passengers}</p>
                        <p className='card-text'>Crew: {vehicle.properties.crew}</p>
                        <div>
                            <Link to={`/singleVehicle/${uid}`} className='btn btn-warning btn-lg mt-4'>
                                Learn More
                            </Link>
                            <button 
                                className="btn btn-danger" 
                                onClick={toggleFavorite}
                            >
                                <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
                                {isFavorite ? ' Unfavorite' : ' Favorite'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Vehicle details not found.</p>
                )}
            </div>
        </div>
    );
};