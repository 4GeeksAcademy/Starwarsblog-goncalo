import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const SingleCaracter = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	
	useEffect(() => {
        actions.getCharacterDetails(params.theid);
    }, [params.theid]);

    const character = store.characterDetails;

    if (!character) {
        return <div>Loading...</div>;
    }

    const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld } = character.properties;

    return (
        <div className="jumbotron">
            <h1 className="display-4">{name}</h1>
            <img src={`https://starwars-visualguide.com/assets/img/characters/${params.theid}.jpg`} alt={name} />
			<p className="lead">{character.description}</p>
            <hr className="my-4" />
            <ul>
                <li><strong>Height:</strong> {height}</li>
                <li><strong>Mass:</strong> {mass}</li>
                <li><strong>Hair Color:</strong> {hair_color}</li>
                <li><strong>Skin Color:</strong> {skin_color}</li>
                <li><strong>Eye Color:</strong> {eye_color}</li>
                <li><strong>Birth Year:</strong> {birth_year}</li>
                <li><strong>Gender:</strong> {gender}</li>
                <li><strong>Homeworld:</strong> <a href={homeworld}>{homeworld}</a></li>
            </ul>
            <Link className="btn btn-primary btn-lg" to="/" role="button">Back to Home</Link>
        </div>
    );
};

SingleCaracter.propTypes = {
    match: PropTypes.object
};
