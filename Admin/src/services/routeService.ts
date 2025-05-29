import axios from 'axios';

// Updated interface for Transport Route
export interface TransportRoute {
  _id: string;
  routeNumber: string;
  origin: string;
  destination: string;
  description?: string;
  imageUrl?: string;
  distance?: string;
  duration?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Form data interface for creating/updating a route
export interface TransportRouteFormData {
  routeNumber: string;
  origin: string;
  destination: string;
  description?: string;
  imageUrl?: string;
  distance?: string;
  duration?: string;
}

const API_BASE = 'http://localhost:4000/api';

// Get a single route by ID
const getRoute = async (id: string): Promise<TransportRoute> => {
  const response = await axios.get(`${API_BASE}/getRoutes/${id}`);
  return response.data;
};

// Get all routes
const getAllRoutes = async (): Promise<TransportRoute[]> => {
  const response = await axios.get(`${API_BASE}/getRoutes`);
  return response.data;
};

// Create a new route
const createRoute = async (data: TransportRouteFormData): Promise<TransportRoute> => {
  const response = await axios.post(`${API_BASE}/createRoutes`, data);
  return response.data;
};

// Update a route by ID
const updateRoute = async (id: string, data: TransportRouteFormData): Promise<TransportRoute> => {
  const response = await axios.put(`${API_BASE}/update/${id}`, data);
  return response.data;
};

// Delete a route by ID
const deleteRoute = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/delete/${id}`);
};

// Exporting the service object
const routeService = {
  getRoute,
  getAllRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
};

export default routeService;
