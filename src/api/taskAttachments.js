import {API_URL} from "./constans";

export const addAttachment = async (taskId , attachment) => {
    const response = await fetch(`${API_URL}/tasks/${taskId}/attachments`, {
        method: "POST",
        body: JSON.stringify(attachment),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status !== 201) {
        throw new Error("Błąd!");
    }
    const data = await response.json();
    return data;
};

export const updateAttachmentById = async (taskId , attachment) => {
    const response = await fetch(`${API_URL}/tasks/${taskId}/attachments/${attachment.id}`, {
        method: "PUT",
        body: JSON.stringify(attachment),
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

export const deleteAttachmentById = async (taskId , attachmentId) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}/attachments/${attachmentId}`, {
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
