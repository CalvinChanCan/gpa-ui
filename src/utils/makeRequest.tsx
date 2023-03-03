import axios from 'axios';

export const makeRequest = axios.create({
    baseURL: process.env.GPA_API_URL,
});
