import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export function setupAuthorization(token: string) {
    api.defaults.headers.common['Authorization'] = token;
};