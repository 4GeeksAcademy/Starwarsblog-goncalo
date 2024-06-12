import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';

export const CardVehicle = ({ uid }) => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!store.vehicleDetails[uid]) {
                await actions.getPlanetDetails(uid);
            }
            setLoading(false);
        };

        fetchData();
    }, [uid, actions, store.vehicleDetails]);

    const vehicle = store.vehicleDetails[uid];

    return (
        <div className="card" key={uid}>
            <div className="card-body">
                {loading ? (
                    <p>Loading details...</p>
                ) : vehicle ? (
                    <>
                        <h5 className="card-title">{vehicle.name}</h5>
                        <p>Passengers: {vehicle.passengers}</p>
                        <p>Crew: {vehicle.crew}</p>
                    </>
                ) : (
                    <p>Vehicle details not found.</p>
                )}
            </div>
        </div>
    );
};