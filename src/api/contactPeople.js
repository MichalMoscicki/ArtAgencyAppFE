import {API_URL} from "./constans";

export const addContactPerson = async (contactId , contactPerson) => {
    const response = await fetch(`${API_URL}/contacts/${contactId}/contact-people`, {
        method: "POST",
        body: JSON.stringify(contactPerson),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status !== 201) {
        throw new Error("Błąd!");
    }
    const data = await response.json();
    return data;
};

export const updateContactPersonById = async (contactId , contactPerson) => {
    const response = await fetch(`${API_URL}/contacts/${contactId}/contact-people/${contactPerson.id}`, {
        method: "PUT",
        body: JSON.stringify(contactPerson),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status !== 200) {
        throw new Error("Błąd!");
    }
    const data = await response.json();

    return data;
};

export const deleteContactPersonById = async (contactId , contactPersonId) => {
    try {
        const response = await fetch(`${API_URL}/contacts/${contactId}/contact-people/${contactPersonId}`, {
            method: "delete"
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