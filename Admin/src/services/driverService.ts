import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const getDrivers = async () => {
  const res = await axios.get(`${API_URL}/getDriver`);
  return res.data;
};

export const addDriver = async (driver: any) => {
  const res = await axios.post(`${API_URL}/createDriver`, driver);
  return res.data;
};

export const deleteDriver = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

// Add this toggleDriverStatus function:
export const toggleDriverStatus = async (id: string, active: boolean) => {
  const res = await axios.patch(`${API_URL}/${id}/status`, { active });
  return res.data;
};
