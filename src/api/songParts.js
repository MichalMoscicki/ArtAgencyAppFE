import {API_URL} from "./constans";

export const addPart = async (songId, file, instrument, token) => {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('instrument',  JSON.stringify(instrument))

    try {
        const response = await fetch(`${API_URL}/songs/${songId}/parts`, {
            method: "POST",
            body: formData,
            headers: {
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


export const deletePartById = async (songId, partId, token) => {
    try {
        const response = await fetch(`${API_URL}/songs/${songId}/parts/${partId}`, {
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
