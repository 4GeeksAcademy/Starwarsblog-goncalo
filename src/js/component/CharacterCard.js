import React, {useContext, useEffect} from 'react'
import {Context} from "../store/appContext"
import {Link} from 'react-router-dom'

export const CharacterCard = ({uid,name}) => {
    const { store, actions } = useContext(Context);

    useEffect(()=>{
        actions.getCharacterDetails(uid)
    },[uid, actions])

    const character = store.characterDetails;

    return (
        <div className="single-character-container">
            <img src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`} alt={name} />
            <p>{name}</p>
            {character && character.uid === uid ? (
                <>
                    <p>Hair Color: {character.properties.hair_color}</p>
                    <p>Height: {character.properties.height}</p>
                    <p>Gender: {character.properties.gender}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
            <Link className="btn btn-primary" to={`/singleCharacter/${uid}`}>
                Learn More
            </Link>
        </div>
    )
}