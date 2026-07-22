import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/pastes",
});

export const getAllPastes = () => API.get("/");

export const getPasteById = (id) => API.get(`/${id}`);

export const createPaste = (data) => API.post("/", data);

export const updatePaste = (id, data) => API.put(`/${id}`, data);

export const deletePaste = (id) => API.delete(`/${id}`);