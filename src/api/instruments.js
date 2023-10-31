import {API_URL} from "./constans";

export const addInstrument = async (instrument, token) => {
    try {
        const response = await fetch(`${API_URL}/instruments`, {
            method: "POST",
            body: JSON.stringify(instrument),
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

export const getInstrumentsInitialRequest = async (token) => {
    try {
        const response = await fetch(`${API_URL}/instruments`, {
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

export const getInstrumentsSubsequentRequest = async (token) => {
    try {
        const response = await fetch(`${API_URL}/instruments`, {
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

export const getInstrumentById = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/instruments/${id}`, {
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

export const deleteInstrumentById = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/instruments/${id}`, {
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

export const updateInstrumentById = async (id , instrument, token) => {
    try {
        const response = await fetch(`${API_URL}/instruments/${id}`, {
            method: "PUT",
            body: JSON.stringify(instrument),
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