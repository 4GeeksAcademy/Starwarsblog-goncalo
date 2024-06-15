import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

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

    const isFavorite = store.favorites.some(fav => fav.uid === uid && fav.type === 'character');

    const toggleFavorite = () => {
        if (isFavorite) {
            actions.removeFromFavorites({ uid, type: 'character', name: character.properties.name });
        } else {
            actions.addToFavorites({ uid, type: 'character', name: character.properties.name });
        }
    };

    return (
        <div key={uid}>
            <div className="card-body">
                {loading ? (
                    <p className='bg-secondary'>Loading details...</p>
                ) : character ? (
                    <div className='bg-secondary'>
                        <h5 className="card-title">{character.properties.name}</h5>
                        <p className='card-text'>Gender: {character.properties.gender}</p>
                        <p className='card-text'>Hair Color: {character.properties.hair_color}</p>
                        <p className='card-text'>Eye Color: {character.properties.eye_color}</p>
                        <div>
                            <Link to={`/singleCharacter/${uid}`} className='btn btn-warning btn-lg mt-4'>
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
                    <p>Character details not found.</p>
                )}
            </div>
        </div>
    );
};
