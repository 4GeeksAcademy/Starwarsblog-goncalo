import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const SinglePlanet = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

    useEffect(() => {
        actions.getPlanetDetails(params.theid)
    },[params.theid])

  

    const planet = store.planetDetails

    if (!planet || !planet.properties) {
        return <div>Loading...</div>;
    }

    const { diameter, rotation_period, orbital_period,gravity,population, climate,terrain,surface_water,created,edited,name} = planet.properties

    return (
        <div className="jumbotron">
            <h1>{name}</h1>
        </div>
    );
};

SinglePlanet.propTypes = {
    match: PropTypes.object
};