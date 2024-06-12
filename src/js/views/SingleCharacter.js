import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/singleCard.css"

export const SingleCaracter = props => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            if (!store.characterDetails[params.theid]) {
                await actions.getCharacterDetails(params.theid);
            }
            setLoading(false);
        };

        fetchCharacterDetails();
    }, [params.theid, actions, store.characterDetails]);

    const character = store.characterDetails[params.theid];
    console.log(`Character details for UID ${params.theid}:`, character);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!character) {
        return <div>Character details not found.</div>;
    }

    const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender} = character.properties;

    return (
        <div className="container-fluid">
            <h1 className="display-4">{name}</h1>
            <div className="row mt-4 details-container">
                <div className="col-6">
                    <img className="img-fluid full-img" src={`https://starwars-visualguide.com/assets/img/characters/${params.theid}.jpg`} alt={name} />
                </div>
                <div className="col-6">
                    <p className="lead m-4">{character.description}</p>
                    <p className="m-4"><strong>Height:</strong> {height}</p>
                    <p className="m-4"><strong>Mass:</strong> {mass}</p>
                    <p className="m-4"><strong>Hair Color:</strong> {hair_color}</p>
                    <p className="m-4"><strong>Skin Color:</strong> {skin_color}</p>
                    <p className="m-4"><strong>Eye Color:</strong> {eye_color}</p>
                    <p className="m-4"><strong>Birth Year:</strong> {birth_year}</p>
                    <p className="m-4"><strong>Gender:</strong> {gender}</p>
                </div>
            </div>
            <Link className="btn btn-warning btn-lg mt-4" to="/" role="button">Back to Home</Link>
            <hr className="my-4 hr-danger" />
        </div>
    );
};

SingleCaracter.propTypes = {
    match: PropTypes.object
};
