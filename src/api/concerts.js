import {API_URL} from "./constans";

export const addConcert = async (concert, token) => {
    try {
        const response = await fetch(`${API_URL}/concerts`, {
            method: "POST",
            body: JSON.stringify(concert),
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

export const getConcertsInitialRequest = async (token) => {
    try {
        const response = await fetch(`${API_URL}/concerts?pageSize=6`, {
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

export const getConcertSubsequentRequest = async (pageNo, sortBy, sortDir, token) => {
    try {
        const response = await fetch(`${API_URL}/concerts?pageSize=6&pageNo=${pageNo}${sortBy}${sortDir}`, {
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


export const getConcertById = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/concerts/${id}`, {
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

export const deleteConcertById = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/concerts/${id}`, {
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

export const updateConcert = async (concert, token) => {
    try {
        const response = await fetch(`${API_URL}/concerts/${concert.id}`, {
            method: "PATCH",
            body: JSON.stringify(concert),
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

export const confirmConcertRequest = async (concert, token) => {
    try {
        const response = await fetch(`${API_URL}/concerts/${concert.id}/confirm`, {
            method: "POST",
            body: JSON.stringify(concert),
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