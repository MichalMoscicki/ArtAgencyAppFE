import {API_URL} from "./constans";

export const addTask = async (task) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            body: JSON.stringify(task),
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

export const getTasksInitialRequest = async () => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: "GET",
            headers: {
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

export const getTasksSubsequentRequest = async (pageNo, sortBy, sortDir) => {
    try {
        const response = await fetch(`${API_URL}/tasks?pageNo=${pageNo}${sortBy}${sortDir}`, {
            method: "GET",
            headers: {
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


export const getTaskById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return await response.json()
    } catch (err) {
        console.log(err);
    }
};

export const deleteTaskById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
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

export const updateTaskById = async (id , task) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
            body: JSON.stringify(task),
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