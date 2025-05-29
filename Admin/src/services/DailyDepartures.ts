import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const getSchedules = async () => {
  const res = await axios.get(`${API_URL}/getDailyDepartures`);
  return res.data;
};

export const getScheduleById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createSchedule = async (data: any) => {
  const res = await axios.post(`${API_URL}/createDailyDeparture`, data);
  return res.data;
};

export const updateSchedule = async (id: string, data: any) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteSchedule = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
