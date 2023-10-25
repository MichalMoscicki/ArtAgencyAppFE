import {API_URL} from "./constans";

export const addMusician = async (musician, token) => {
    try {
        const response = await fetch(`${API_URL}/musicians`, {
            method: "POST",
            body: JSON.stringify(musician),
            headers: {
                'Authorization': token,
                "Content-Type": "application/json"
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

export const getMusiciansInitialRequest = async (token) => {
    try {
        const response = await fetch(`${API_URL}/musicians`, {
            method: "GET",
            headers: {
                'Authorization': token,
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

export const getMusiciansSubsequentRequest = async (pageNo, sortBy, sortDir, token) => {
    try {
        const response = await fetch(`${API_URL}/musicians?pageNo=${pageNo}${sortBy}${sortDir}`, {
            method: "GET",
            headers: {
                'Authorization': token,
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


export const getMusicianById = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/musicians/${id}`, {
            method: "GET",
            headers: {
                'Authorization': token,
                "Content-Type": "application/json",
            },
        });

        return await response.json()
    } catch (err) {
        console.log(err);
    }
};

export const deleteMusicianById = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/musicians/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': token,
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

export const updateMusicianById = async (id , musician, token) => {
    try {
        const response = await fetch(`${API_URL}/musicians/${id}`, {
            method: "PUT",
            body: JSON.stringify(musician),
            headers: {
                "Content-Type": "application/json",
                'Authorization': token,
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