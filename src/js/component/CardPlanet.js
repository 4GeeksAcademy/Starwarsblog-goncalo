import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import {Link} from "react-router-dom"

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
                        <div>
                            <Link to={`/singlePlanet/${uid}`} className='btn btn-warning btn-lg mt-4'>
                                Learn More
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p>Planet details not found.</p>
                )}
            </div>
        </div>
    );
};