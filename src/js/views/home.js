import React, {useContext, useEffect} from "react";
import "../../styles/home.css";
import {Context} from "../store/appContext"
import {CardCaracter} from '../component/CardCaracter'
import {CardPlanet} from '../component/CardPlanet'
import {CardVehicle} from '../component/CardVehicle'

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">
            <h1 className="mt-4">Characters</h1>
            <hr className="my-4 hr-danger" />
            <div className="cards-container  d-flex ">
                {store.character.map(character => (
                    <div key={character.uid} className="d-inline-block  bg-secondary">
                        <img 
                            src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}     
                            alt={character.name} 
                            className="card-img-top"
                        />
                        <CardCaracter uid={character.uid}/>
                    </div>
                ))}
            </div>
            <h1 className="mt-4">Planets</h1>
            <hr className="my-4 hr-danger" />
                <div className="cards-container d-flex ">
                    {store.planets.slice(1).map(planet => (
                        <div key={planet.uid} className="d-inline-block bg-secondary">
                            <img src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`} alt={planet.name}/>
                            <CardPlanet uid={planet.uid} />
                        </div>
                    ))}
                </div>
        </div>
    );
};