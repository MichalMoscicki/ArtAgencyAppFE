import {API_URL} from "./constans";

export const addContact = async (contact, token) => {
    try {
        const response = await fetch(`${API_URL}/contacts`, {
            method: "POST",
            body: JSON.stringify(contact),
            headers: {
                "Content-Type": "application/json",
                'Authorization': token
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

export const getContactsInitialRequest = async (token) => {
    try {
        const response = await fetch(`${API_URL}/contacts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': token
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

export const getContactsSubsequentRequest = async (pageNo, sortBy, sortDir, token) => {
    try {
        const response = await fetch(`${API_URL}/contacts?pageNo=${pageNo}${sortBy}${sortDir}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': token
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

export const getContactById = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/contacts/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': token
            },
        });

        return await response.json()
    } catch (err) {
        console.log(err);
    }
};

export const deleteContactById = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/contacts/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': token
            }
        });

        const data = await response.json();

        if (data.error ) {
            throw new Error("Błąd!");
        }

    } catch (err) {
        console.log(err);
    }
};

export const updateContactById = async (id , contact, token) => {
    try {
        const response = await fetch(`${API_URL}/contacts/${id}`, {
            method: "PUT",
            body: JSON.stringify(contact),
            headers: {
                "Content-Type": "application/json",
                'Authorization': token
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

export const exportContacts = async (token) => {
    try {
        const response = await fetch(`${API_URL}/contacts/export-json`, {
            method: "GET",
            headers: {
                'Authorization': token
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