import {API_URL} from "./constans";

export const addSong = async (song, token) => {
    try {
        const response = await fetch(`${API_URL}/songs`, {
            method: "POST",
            body: JSON.stringify(song),
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

export const getSongsInitialRequest = async (token) => {
    try {
        const response = await fetch(`${API_URL}/songs?pageSize=6`, {
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

export const getSongsSubsequentRequest = async (pageNo, sortBy, sortDir, token) => {
    try {
        const response = await fetch(`${API_URL}/songs?pageSize=6&pageNo=${pageNo}${sortBy}${sortDir}`, {
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


export const getSongById = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/songs/${id}`, {
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

export const deleteSongById = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/songs/${id}`, {
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

export const updateSong = async (musician, token) => {
    try {
        const response = await fetch(`${API_URL}/songs/${musician.id}`, {
            method: "PATCH",
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