import {API_URL} from "./constans";

export const logIn = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/auth/authenticate`, {
            method: "POST",
            body: JSON.stringify(credentials),
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

export const register = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            body: JSON.stringify(credentials),
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