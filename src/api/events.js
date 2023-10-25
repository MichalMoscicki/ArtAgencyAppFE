import {API_URL} from "./constans";

export const addEvent = async (contactId , event, token) => {
    const response = await fetch(`${API_URL}/contacts/${contactId}/events`, {
        method: "POST",
        body: JSON.stringify(event),
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

export const updateEventById = async (contactId , event, token) => {
    const response = await fetch(`${API_URL}/contacts/${contactId}/events/${event.id}`, {
        method: "PUT",
        body: JSON.stringify(event),
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

export const deleteEventById = async (contactId , eventId, token) => {
    try {
    const response = await fetch(`${API_URL}/contacts/${contactId}/events/${eventId}`, {
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
