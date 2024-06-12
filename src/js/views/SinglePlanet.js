import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const SinglePlanet = props => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            if (!store.planetDetails[params.theid]) {
                await actions.getPlanetDetails(params.theid);
            }
            setLoading(false);
        };

        fetchCharacterDetails();
    }, [params.theid, actions, store.planetDetails]);

    const planet = store.planetDetails[params.theid];
    console.log(`Character details for UID ${params.theid}:`, planet);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!planet) {
        return <div>Planet details not found.</div>;
    }

    const { diameter, rotation_period, orbital_period, gravity, population, climate, terrain, surface_water, name} = planet.properties;

    return (
        <div className="container-fluid">
            <h1 className="display-4">{name}</h1>
            <div className="row mt-4 details-container">
                <div className="col-6">
                    <img className="img-fluid full-img" src={`https://starwars-visualguide.com/assets/img/planets/${params.theid}.jpg`} alt={name} />
                </div>
                <div className="col-6">
                    <p className="lead m-4">{planet.description}</p>
                    <p className="m-4"><strong>Diameter:</strong> {diameter}</p>
                    <p className="m-4"><strong>Rotation:</strong> {rotation_period}</p>
                    <p className="m-4"><strong>Orbital:</strong> {orbital_period}</p>
                    <p className="m-4"><strong>Gravity:</strong> {gravity}</p>
                    <p className="m-4"><strong>Population:</strong> {population}</p>
                    <p className="m-4"><strong>Climate:</strong> {climate}</p>
                    <p className="m-4"><strong>Terrain:</strong> {terrain}</p>
                    <p className="m-4"><strong>Surface Water:</strong> {surface_water}</p>
                </div>
            </div>
            <Link className="btn btn-warning btn-lg mt-4" to="/" role="button">Back to Home</Link>
            <hr className="my-4 hr-danger" />
        </div>
    );
};

SinglePlanet.propTypes = {
    match: PropTypes.object
};
