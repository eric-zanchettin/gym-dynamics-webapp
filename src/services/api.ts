import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export const setupApiService = {
    setupHeaders: (token: string) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
};