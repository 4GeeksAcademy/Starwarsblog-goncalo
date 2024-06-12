const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			character: [],
			planets: [],
			vehicles: [],
			characterDetails: {},
			planetDetails:{},
			vehicleDetails: {}
			
		},
		actions: {
			getCharacters: async () => {
				try {
					const resp = await fetch(`https://www.swapi.tech/api/people/`)
					const data = await resp.json()
					setStore({character: data.results})
				} catch (err) {
					console.error('Fail fetching characters', err)
				}
			},
			getCharacterDetails: async (uid) => {
                try {
                    const resp = await fetch(`https://www.swapi.tech/api/people/${uid}`);
                    const data = await resp.json();
                    const characterDetails = getStore().characterDetails;
                    characterDetails[uid] = data.result;
                    setStore({ characterDetails: { ...characterDetails } });
					console.log("Updated store with character details:", getStore().characterDetails);
                } catch (error) {
                    console.error("Failed fetching the character details", error);
                }
            },
			getPlanets: async () => {
				try {
					const resp = await fetch("https://www.swapi.tech/api/planets/")
					const data = await resp.json()
					setStore({planets: data.results})
					
				} catch (error) {
					console.error("Failed to fetch planets: ",error)
				}
			},
			getPlanetDetails: async (uid) => {
				try {
					const resp = await fetch(`https://www.swapi.tech/api/planets/${uid}`)
					const data = await resp.json()
					const planetDetails = getStore().planetDetails
					planetDetails[uid] = data.result;
                    setStore({ planetDetails: { ...planetDetails } });
			
				} catch (error) {
					console.error("Error Fetching the planet details", error)
				}
			},
			getVehicles: async () => {
				try {
					const resp = await fetch("https://www.swapi.tech/api/starships/")
					const data = await resp.json()
					setStore({vehicles: data.results})
				} catch (error) {
					console.error("Fail fetching vehicles", error)
				}
			},
			getVehicleDetails: async (uid) => {
				try {
					const resp = await fetch(`https://www.swapi.tech/api/starships/${uid}`)
					const data = await resp.json()
					const vehicleDetails = getStore().vehicleDetails
					vehicleDetails[uid] = data.result.properties;
                    setStore({ vehicleDetails: { ...vehicleDetails } });
					console.log("Updated store with vehicle details:", getStore().vehicleDetails);
				} catch (error) {
					console.error("Fail fetching the vehicle details", error)
				}
			}
		}
	};
};

export default getState;
