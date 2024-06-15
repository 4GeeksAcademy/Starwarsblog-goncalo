import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const SingleVehicle = props => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            await actions.getVehicleDetails(params.theid);
            setLoading(false);
        };

        fetchVehicleDetails();
    }, [params.theid, actions]);

    const vehicle = store.vehicleDetails[params.theid];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!vehicle || !vehicle.properties) {
        return <div>Vehicle details not found.</div>;
    }

    const {
        model,
        vehicle_class,
        manufacturer,
        cost_in_credits,
        length,
        crew,
        passengers,
        max_atmosphering_speed,
        cargo_capacity,
        consumables,
        name
    } = vehicle.properties;

    return (
        <div className="container-fluid">
            <h1 className="display-4">{name}</h1>
            <div className="row mt-4 details-container">
                <div className="col-6">
                    <img 
                        className="img-fluid full-img" 
                        src={`https://starwars-visualguide.com/assets/img/starships/${params.theid}.jpg`} 
                        alt={name} 
                    />
                </div>
                <div className="col-6">
                    <p className="lead m-4">Model: {model}</p>
                    <p className="m-4"><strong>Vehicle Class:</strong> {vehicle_class}</p>
                    <p className="m-4"><strong>Manufacturer:</strong> {manufacturer}</p>
                    <p className="m-4"><strong>Cost:</strong> {cost_in_credits} credits</p>
                    <p className="m-4"><strong>Length:</strong> {length}</p>
                    <p className="m-4"><strong>Crew:</strong> {crew}</p>
                    <p className="m-4"><strong>Passengers:</strong> {passengers}</p>
                    <p className="m-4"><strong>Max Speed:</strong> {max_atmosphering_speed}</p>
                    <p className="m-4"><strong>Cargo Capacity:</strong> {cargo_capacity}</p>
                    <p className="m-4"><strong>Consumables:</strong> {consumables}</p>
                </div>
            </div>
            <Link className="btn btn-warning btn-lg" to="/" role="button">Back to Home</Link>
            <hr className="my-4 hr-danger" />
        </div>
    );
};

SingleVehicle.propTypes = {
    match: PropTypes.object
};
