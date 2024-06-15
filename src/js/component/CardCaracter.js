import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import {Link} from "react-router-dom"
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
    const isFavorite = (uid, type) => {
		return store.favorites.some(fav => fav.uid === uid && fav.type === type);
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
                                onClick={() => actions.toggleFavorite(character.uid, 'character')}
                            >
                                {isFavorite(character.uid, 'character') ? (
                                    <FontAwesomeIcon icon={solidHeart} />
                                ) : (
                                    <FontAwesomeIcon icon={regularHeart} />
                                )}
                                {isFavorite(character.uid, 'character') ? ' Unfavorite' : ' Favorite'}
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