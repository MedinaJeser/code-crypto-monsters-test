import axios from "../api/axiosInstance";

export const getMonsters = () => axios.get("/monsters");

export const getMonsterById = (id) => axios.get(`/monsters/${id}`);

export const createMonster = (data) => axios.post("/monsters", data);

export const updateMonster = (id, data) => axios.patch(`/monsters/${id}`, data);

export const deleteMonster = (id) => axios.delete(`/monsters/${id}`);
