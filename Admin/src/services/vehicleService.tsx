import api from './api';

export interface Vehicle {
  id: string;
  plateNumber: string;
  model: string;
  capacity: number;
  routeId: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VehicleFormData {
  plateNumber: string;
  model: string;
  capacity: number;
  routeId: string;
  active: boolean;
}

const vehicleService = {
  getVehicles: async (): Promise<Vehicle[]> => {
    const response = await api.get('/vehicles');
    return response.data;
  },

  getVehicle: async (id: string): Promise<Vehicle> => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },

  createVehicle: async (vehicleData: VehicleFormData): Promise<Vehicle> => {
    const response = await api.post('/vehicles', vehicleData);
    return response.data;
  },

  updateVehicle: async (id: string, vehicleData: VehicleFormData): Promise<Vehicle> => {
    const response = await api.put(`/vehicles/${id}`, vehicleData);
    return response.data;
  },

  deleteVehicle: async (id: string): Promise<void> => {
    await api.delete(`/vehicles/${id}`);
  },

  toggleVehicleStatus: async (id: string, active: boolean): Promise<Vehicle> => {
    const response = await api.patch(`/vehicles/${id}/status`, { active });
    return response.data;
  }
};

export default vehicleService;
