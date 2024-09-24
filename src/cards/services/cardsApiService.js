import axios from "axios";



// const apiUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";
const apiUrl = "http://127.0.0.1:8181/cards";

export const handleGetAllCards = async () => {
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const handleGetCardById = async (id) => {
    try {
        const response = await axios.get(`${apiUrl}/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const handleDeleteCard = async (id, token) => {
    try {
        const response = await axios.delete(
            `${apiUrl}/${id}`,
            {
                headers: {
                    'x-auth-token': token,
                }
            });
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const handleLikeCard = async (id, token) => {
    try {
        const response = await axios.patch(
            `${apiUrl}/${id}`, {},
            {
                headers: {
                    'x-auth-token': token,
                }
            });
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const handleCreate = async (card, token) => {
    try {
        const response = await axios.post(
            `${apiUrl}`,
            card,
            {
                headers: {
                    'x-auth-token': token,
                }
            });
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const handleUpdateCard = async (id, card, token) => {
    try {
        const response = await axios.put(
            `${apiUrl}/${id}`, card,
            {
                headers: {
                    'x-auth-token': token,
                }
            });
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
