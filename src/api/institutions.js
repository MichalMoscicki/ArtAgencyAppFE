import {API_URL} from "./constans";

export const addInstitution = async (institution, contactId) => {
    try {
        const response = await fetch(`${API_URL}/contacts/${contactId}/institutions`, {
            method: "POST",
            body: JSON.stringify(institution),
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

export const updateInstitutionById = async (contactId , institution) => {
        const response = await fetch(`${API_URL}/contacts/${contactId}/institutions/${institution.id}`, {
            method: "PUT",
            body: JSON.stringify(institution),
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


export const deleteInstitutionById = async (contactId, institutionId) => {
    try {
        const response = await fetch(`${API_URL}/contacts/${contactId}/institutions/${institutionId}`, {
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