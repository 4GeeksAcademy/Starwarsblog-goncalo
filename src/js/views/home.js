import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { CardCaracter } from "../component/CardCaracter";
import { CardPlanet } from "../component/CardPlanet";
import { CardVehicle } from "../component/CardVehicle";

export const Home = () => {
    const { store, actions } = useContext(Context);

    const renderCarouselItems = (items, type) => {
        const chunkSize = 4;
        const chunks = [];

        const filteredItems = items.filter(item => {
            const imgUrl = `https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`;
            return imgUrl !== "https://starwars-visualguide.com/assets/img/starships/2.jpg" && 
                   imgUrl !== "https://starwars-visualguide.com/assets/img/starships/3.jpg" &&
                   imgUrl !== "https://starwars-visualguide.com/assets/img/starships/17.jpg";
        });

        for (let i = 0; i < filteredItems.length; i += chunkSize) {
            chunks.push(filteredItems.slice(i, i + chunkSize));
        }

        return chunks.map((chunk, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                <div className="row">
                    {chunk.map(item => {
                        const imgUrl = `https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`;                     
                        return (
                            <div className="col-md-3" key={item.uid}>
                                <div className="card bg-secondary">
                                    <img
                                        src={imgUrl}
                                        className="card-img-top"
                                        alt={item.name}
                                        onError={(e) => e.target.src = "https://via.placeholder.com/400x200"} // Handle missing images
                                    />
                                    {type === "characters" && <CardCaracter uid={item.uid} />}
                                    {type === "planets" && <CardPlanet uid={item.uid} />}
                                    {type === "starships" && <CardVehicle uid={item.uid} />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        ));
    };

    return (
        <div className="container-fluid">
            <h1 className="mt-4">Characters</h1>
            <hr className="my-4 hr-danger" />
            <div id="characterCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {renderCarouselItems(store.character, "characters")}
                </div>
                <a className="carousel-control-prev" href="#characterCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#characterCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

            <h1 className="mt-4">Planets</h1>
            <hr className="my-4 hr-danger" />
            <div id="planetCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {renderCarouselItems(store.planets.slice(1), "planets")}
                </div>
                <a className="carousel-control-prev" href="#planetCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#planetCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

            <h1 className="mt-4">Vehicles</h1>
            <hr className="my-4 hr-danger" />
            <div id="vehicleCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {renderCarouselItems(store.vehicles.slice(2), "starships")}
                </div>
                <a className="carousel-control-prev" href="#vehicleCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#vehicleCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    );
};
