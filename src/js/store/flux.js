const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			character: []
		},
		actions: {
			getCharacters: async (id) => {
				try {
					const resp = await fetch(`https://www.swapi.tech/api/people/${id}`)
					const data = await resp.json()
					setStore({character: data.results})
					
				} catch (err) {
					console.error('Fail fetching characters', err)
				}
			}
		}
	};
};

export default getState;
