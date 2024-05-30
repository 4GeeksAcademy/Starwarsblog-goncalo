import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const SingleVehicle = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

    useEffect (() => {
        actions.getVehicleDetails(params.theid)
    },[params.theid])

    const vehicle = store.vehicleDetails

    if (!vehicle || !vehicle.properties) {
        return <div>Loading...</div>;
    }

    const {model,vehicle_class,manufacturer,cost_in_credits,length,crew,passengers,max_atmosphering_speed,cargo_capacity,consumables,created,edited,name} = vehicle.properties

    return (
        <div className="jumbotron">
            <h1>{name}</h1>
        </div>
    );
};

SingleVehicle.propTypes = {
    match: PropTypes.object
};