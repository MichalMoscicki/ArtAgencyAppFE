import {API_URL} from "./constans";

export const addEvent = async (contactId , event) => {
    const response = await fetch(`${API_URL}/contacts/${contactId}/events`, {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response)
    if (response.status !== 201) {
        throw new Error("Błąd!");
    }
    const data = await response.json();
    console.log(data)
    return data;
};

export const updateEventById = async (contactId , event) => {
    const response = await fetch(`${API_URL}/contacts/${contactId}/events/${event.id}`, {
        method: "PUT",
        body: JSON.stringify(event),
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

export const deleteEventById = async (contactId , eventId) => {
    try {
    const response = await fetch(`${API_URL}/contacts/${contactId}/events/${eventId}`, {
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
