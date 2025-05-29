import axios from 'axios';

const API = 'http://localhost:4000/api';

export const getVehicles = () => axios.get(`${API}/getVehicle`).then(res => res.data);
export const getVehicle = (id: string) => axios.get(`${API}/getVehicle/${id}`).then(res => res.data);
export const createVehicle = (data: any) => axios.post(`${API}/createVehicle`, data).then(res => res.data);
export const updateVehicle = (id: string, data: any) => axios.put(`${API}/update/${id}`, data).then(res => res.data);
export const deleteVehicle = (id: string) => axios.delete(`${API}/delete/${id}`).then(res => res.data);
