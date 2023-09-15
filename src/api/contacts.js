import {API_URL} from "./constans";

export const addContact = async (contact) => {
    try {
        const response = await fetch(`${API_URL}/contacts`, {
            method: "POST",
            body: JSON.stringify(contact),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        if (data.error) {
            throw new Error("Błąd!");
        }
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getContactsInitialRequest = async () => {
    try {
        const response = await fetch(`${API_URL}/contacts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.error) {
            throw new Error("Błąd!");
        }

        return(data);
    } catch (err) {
        console.log(err);
    }
};

export const getContactsSubsequentRequest = async (pageNo) => {
    try {
        const response = await fetch(`${API_URL}/contacts?pageNo=${pageNo}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.error) {
            throw new Error("Błąd!");
        }

        return(data);
    } catch (err) {
        console.log(err);
    }
};


export const getContactById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/contacts/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return await response.json()
    } catch (err) {
        console.log(err);
    }
};

export const deleteContactById = async (id ) => {
    try {
        const response = await fetch(`${API_URL}/contacts/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        if (data.error ) {
            throw new Error("Błąd!");
        }

    } catch (err) {
        console.log(err);
    }
};

export const updateContactById = async (id , contact) => {
    try {
        const response = await fetch(`${API_URL}/contacts/${id}`, {
            method: "PUT",
            body: JSON.stringify(contact),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.error) {
            throw new Error("Błąd!");
        }
        return data;

    } catch (err) {
        console.log(err);
    }
};