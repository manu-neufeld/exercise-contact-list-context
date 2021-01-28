const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			myList: [],
			idToEdit: null,
			indexMyList: null,
			idToDelete: null
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			getAgendaInfo: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/my_agenda_manuela")
					.then(response => {
						if (!response.ok) throw new Error(response.status);
						return response.json();
					})
					.then(jsonAgenda => {
						setStore({ myList: jsonAgenda.flat() });
						console.log("info, ", getStore().myList);
					})
					.catch(error => {
						console.error("Can't get agenda information", error);
					});
			},

			createNewContact: object => {
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					body: JSON.stringify(object),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						if (!response.ok) {
							throw new Error(response.status);
						}
						return response.json();
					})
					.catch(error => {
						console.error("Can't add the contact to the agenda, error status: ", error);
					});
			},

			editContact: object => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/" + getStore().idToEdit, {
					method: "PUT",
					body: JSON.stringify(object),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						if (!response.ok) {
							throw new Error(response.status);
						}
						return response.json();
					})
					.catch(error => {
						console.error("Can't edit contact, error status: ", error);
					});
			},
			deleteContact: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + getStore().idToDelete, {
					method: "DELETE"
				})
					.then(response => {
						if (!response.ok) {
							throw new Error(response.status);
						}
						return response.json();
					})
					.catch(error => {
						console.error("Can't delete the contact, error status: ", error);
					});
			}
		}
	};
};

export default getState;
