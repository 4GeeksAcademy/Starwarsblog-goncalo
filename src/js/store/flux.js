const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			character: [],
			planets: [],
			vehicles: [],
			characterDetails: null,
			planetDetails:null,
			vehicleDetails: null
			
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
			getPlanets: async () => {
				try {
					const resp = await fetch("https://www.swapi.tech/api/planets/")
					const data = await resp.json()
					setStore({planets: data.results})
					
				} catch (error) {
					console.error("Failed to fetch planets: ",error)
				}
			},
			getVehicles: async () => {
				try {
					const resp = await fetch("https://www.swapi.tech/api/vehicles/")
					const data = await resp.json()
					setStore({vehicles: data.results})
				} catch (error) {
					console.error("Fail fetching vehicles", error)
				}
			},
			getCharacterDetails: async (uid) => {
				try {
					const resp = await fetch(`https://www.swapi.tech/api/people/${uid}`)
					const data = await resp.json()
					setStore({characterDetails: data.result})
				} catch (error) {
					console.error("Fail fetching the character details", error)
				}
			},
			getPlanetDetails: async (uid) => {
				try {
					const resp = await fetch(`https://www.swapi.tech/api/planets/${uid}`)
					const data = await resp.json()
					setStore({planetDetails: data.result})
				} catch (error) {
					console.error("Failed fetching the single planet", error)
				}
			},
			getVehicleDetails: async (uid) => {
				try {
					const resp = await fetch(`https://www.swapi.tech/api/vehicles/${uid}`)
					const data = await resp.json()
					setStore({vehicleDetails: data.result})
				} catch (error) {
					console.error("Fail fetching the vehicle details", error)
				}
			}
		}
	};
};

export default getState;
