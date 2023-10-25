import {API_URL} from "./constans";

export const addContactPerson = async (contactId , contactPerson, token) => {
    const response = await fetch(`${API_URL}/contacts/${contactId}/contact-people`, {
        method: "POST",
        body: JSON.stringify(contactPerson),
        headers: {
            "Content-Type": "application/json",
            'Authorization': token
        },
    });
    if (response.status !== 201) {
        throw new Error("Błąd!");
    }
    const data = await response.json();
    return data;
};

export const updateContactPersonById = async (contactId , contactPerson, token) => {
    const response = await fetch(`${API_URL}/contacts/${contactId}/contact-people/${contactPerson.id}`, {
        method: "PUT",
        body: JSON.stringify(contactPerson),
        headers: {
            "Content-Type": "application/json",
            'Authorization': token
        },
    });
    if (response.status !== 200) {
        throw new Error("Błąd!");
    }
    const data = await response.json();

    return data;
};

export const deleteContactPersonById = async (contactId , contactPersonId, token) => {
    try {
        const response = await fetch(`${API_URL}/contacts/${contactId}/contact-people/${contactPersonId}`, {
            method: "delete",
            headers: {
                'Authorization': token
            }
        });
        if (response.status !== 200) {
            throw new Error("Błąd!");
        }
        const data = await response.json();

        return data;
    } catch (err) {
        console.log(err);
    }
};