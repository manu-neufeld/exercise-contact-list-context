const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			myContactList: [],
			idToDelete: null,
			idToEdit: null,
			indexToEdit: null
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			getContacts: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/my_agenda_manuela")
					.then(response => {
						if (!response.ok) {
							throw new Error(response.status);
						}
						return response.json();
					})
					.then(jsonContacts => {
						setStore({ myContactList: jsonContacts });
					})
					.catch(error => {
						console.error("Error status: ", error);
					});
			},
			addContact: object => {
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
					.then(() => {
						getActions().getContacts();
					})
					.catch(error => {
						console.error("Creating contact, error status: ", error);
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
					.then(() => {
						getActions().getContacts();
					})
					.catch(error => {
						console.error("Deleting contact, error status: ", error);
					});
			},
			editContact: object => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + getStore().idToEdit, {
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
					.then(() => {
						getActions().getContacts();
					})
					.catch(error => {
						console.error("Editing contact, error status: ", error);
					});
			}
		}
	};
};

export default getState;
