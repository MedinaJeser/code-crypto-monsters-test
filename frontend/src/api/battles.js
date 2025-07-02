import axios from "../api/axiosInstance";

export const createBattle = (data) => axios.post("/battles", data);

export const getBattles = () => axios.get("/battles");

export const getBattleById = (id) => axios.get(`/battles/${id}`);

export const deleteBattle = (id) => axios.delete(`/battles/${id}`);
