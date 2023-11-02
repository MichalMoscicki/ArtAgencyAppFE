import {API_URL} from "./constans";

export const addTask = async (task, token) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            body: JSON.stringify(task),
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

export const getTasksInitialRequest = async (token) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
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

export const getTasksSubsequentRequest = async (pageNo, status, token) => {
    try {
        const response = await fetch(`${API_URL}/tasks?pageNo=${pageNo}${status}`, {
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


export const getTaskById = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
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

export const deleteTaskById = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
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

export const updateTaskById = async (id , task, token) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
            body: JSON.stringify(task),
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