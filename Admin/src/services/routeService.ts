import axios from 'axios';

export interface Route {
  _id: string;
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description?: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RouteFormData {
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description?: string;
  active: boolean;
}

const API_BASE = '/api/routes';

const getRoute = async (id: string): Promise<Route> => {
  const response = await axios.get(`http://localhost:4000/api/getRoutes/${id}`);
  return response.data;
};

const getAllRoutes = async (): Promise<Route[]> => {
  const response = await axios.get('http://localhost:4000/api/getRoutes');
  return response.data;
};

const createRoute = async (data: RouteFormData): Promise<Route> => {
  const response = await axios.post(API_BASE, data);
  return response.data;
};

const updateRoute = async (id: string, data: RouteFormData): Promise<Route> => {
  const response = await axios.put(`http://localhost:4000/api/update/${id}`, data);
  return response.data;
};

const deleteRoute = async (id: string): Promise<void> => {
  await axios.delete(`http://localhost:4000/api/delete/${id}`);
};

const routeService = {
  getRoute,
  getAllRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
};

export default routeService;
