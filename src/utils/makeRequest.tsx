import axios from 'axios';

export const makeRequest = axios.create({
    baseURL: process.env.GPA_API_URL,
});


export const fetchData = async (url: RequestInfo | URL, method: string, data = {}) => {
    try {
        const response = await fetch(`${process.env.GPA_API_URL}${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
