import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import {Link} from "react-router-dom"


export const CardCaracter = ({ uid }) => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!store.characterDetails[uid]) {
                await actions.getCharacterDetails(uid);
            }
            setLoading(false);
        };

        fetchData();
    }, [uid, actions, store.characterDetails]);

    const character = store.characterDetails[uid];
   
    return (
        <div key={uid}>
            <div className="card-body">
                {loading ? (
                    <p>Loading details...</p>
                ) : character ? (
                    <div>
                        <h5 className="card-title">{character.properties.name}</h5>
                        <p className='card-text'>Gender: {character.properties.gender}</p>
                        <p className='card-text'>Hair Color: {character.properties.hair_color}</p>
                        <p className='card-text'>Eye Color: {character.properties.eye_color}</p>
                        <div>
                            <Link to={`/singleCharacter/${uid}`} className='btn btn-warning btn-lg mt-4'>
                                Learn More
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p>Character details not found.</p>
                )}
            </div>
        </div>
    );
};